import { ClinicCard } from '@/components/ClinicCard'
import { FilterSidebar, FilterState } from '@/components/FilterSidebar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

async function getClinics(searchParams: { [key: string]: string | string[] | undefined }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const params = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v))
    } else if (value) {
      params.append(key, value)
    }
  })

  const response = await fetch(`${baseUrl}/api/clinics?${params.toString()}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return { clinics: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } }
  }

  return response.json()
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/categories`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

export default async function ClinicsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const initialFilters: FilterState = {
    category: (searchParams.category as string) || '',
    location: (searchParams.location as string) || '',
    priceRange: [
      parseInt(searchParams.priceMin as string) || 0,
      parseInt(searchParams.priceMax as string) || 200000,
    ],
    rating: parseFloat(searchParams.rating as string) || 0,
    sort: (searchParams.sort as string) || 'featured',
  }

  const data = await getClinics(searchParams)
  const categories = await getCategories()
  const { clinics, pagination } = data

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-80 flex-shrink-0">
          <FilterSidebar
            categories={categories}
            initialFilters={initialFilters}
            onFiltersChange={() => {}}
          />
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Klinikler
              <span className="text-muted-foreground text-lg font-normal ml-2">
                ({pagination.total} sonuç)
              </span>
            </h1>
            <p className="text-muted-foreground">
              İstanbul'da diş, estetik ve saç ekimi klinikleri
            </p>
          </div>

          {clinics.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Sonuç Bulunamadı</h3>
              <p className="text-muted-foreground mb-6">
                Filtrelerinizi değiştirerek tekrar deneyin.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {clinics.map((clinic: any) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {Array.from({ length: pagination.totalPages }).map((_, i) => {
                    const page = i + 1
                    const isCurrentPage = page === pagination.page

                    return (
                      <Button
                        key={page}
                        variant={isCurrentPage ? 'default' : 'outline'}
                        size="icon"
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={pagination.page === pagination.totalPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
