'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClinicCard } from '@/components/ClinicCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2 } from 'lucide-react'

interface ComparisonClinic {
  id: string
  slug: string
  name: string
  shortDescription?: string
  logoUrl?: string
  city: string
  district: string
  rating: number
  reviewCount: number
  priceRangeMin?: number
  priceRangeMax?: number
  phone: string
  whatsapp?: string
  website?: string
  categories?: {
    category: {
      name: string
    }
  }[]
}

export default function ComparePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [clinics, setClinics] = useState<ComparisonClinic[]>([])
  const [clinicData, setClinicData] = useState<Record<string, ComparisonClinic>>({})

  useEffect(() => {
    const clinicIds = searchParams.get('clinics')
    if (clinicIds) {
      const ids = clinicIds.split(',')
      fetchClinics(ids)
    }
  }, [searchParams])

  const fetchClinics = async (ids: string[]) => {
    try {
      const promises = ids.map(id =>
        fetch(`/api/clinics/${id}`).then(res => res.json())
      )
      const data = await Promise.all(promises)
      setClinics(data.filter((c) => c !== null))
      setClinicData(Object.fromEntries(data.filter((c) => c !== null).map((c) => [c.id, c])))
    } catch (error) {
      console.error('Failed to fetch clinics:', error)
    }
  }

  const handleRemove = (id: string) => {
    const newClinics = clinics.filter(c => c.id !== id)
    setClinics(newClinics)

    if (newClinics.length === 0) {
      router.push('/klinikler')
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.set('clinics', newClinics.map(c => c.id).join(','))
      router.push(`/karsilastir?${params.toString()}`)
    }
  }

  const handleClearAll = () => {
    router.push('/klinikler')
  }

  if (clinics.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-2xl font-bold mb-4">
            Karşılaştırma İçin Klinik Seçilmedi
          </h1>
          <p className="text-muted-foreground mb-6">
            Karşılaştırmak istediğiniz klinikleri seçtikten sonra buraya
            dönebilirsiniz.
          </p>
          <Button onClick={() => router.push('/klinikler')}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kliniklere Dön
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Klinik Karşılaştırma</h1>
          <p className="text-muted-foreground">
            {clinics.length} klinik karşılaştırılıyor
          </p>
        </div>
        <Button variant="outline" onClick={handleClearAll}>
          <Trash2 className="w-5 h-5 mr-2" />
          Tümünü Temizle
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left min-w-[200px]">Özellik</th>
              {clinics.map(clinic => (
                <th key={clinic.id} className="p-4 text-left min-w-[300px]">
                  <div className="flex items-center gap-2">
                    {clinic.logoUrl && (
                      <img
                        src={clinic.logoUrl}
                        alt={clinic.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <span className="font-semibold">{clinic.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Konum</td>
              {clinics.map(clinic => (
                <td key={clinic.id} className="p-4">
                  {clinic.district}, {clinic.city}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">Puan</td>
              {clinics.map(clinic => (
                <td key={clinic.id} className="p-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-lg">{clinic.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">
                      ({clinic.reviewCount} değerlendirme)
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">Fiyat Aralığı</td>
              {clinics.map(clinic => (
                <td key={clinic.id} className="p-4">
                  {clinic.priceRangeMin && clinic.priceRangeMax ? (
                    <span className="font-bold text-primary">
                      ${clinic.priceRangeMin.toLocaleString('tr-TR')} - ${clinic.priceRangeMax.toLocaleString('tr-TR')}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Fiyat bilgisi yok</span>
                  )}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">Kategoriler</td>
              {clinics.map(clinic => (
                <td key={clinic.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {clinic.categories?.slice(0, 3).map((item, i) => (
                      <span key={i} className="text-sm bg-muted px-2 py-1 rounded">
                        {item.category.name}
                      </span>
                    ))}
                    {clinic.categories && clinic.categories.length > 3 && (
                      <span className="text-sm text-muted-foreground">
                        +{clinic.categories.length - 3}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">İletişim</td>
              {clinics.map(clinic => (
                <td key={clinic.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📞</span>
                      <span className="text-sm">{clinic.phone}</span>
                    </div>
                    {clinic.whatsapp && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💬</span>
                        <a
                          href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:underline"
                        >
                          {clinic.whatsapp}
                        </a>
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-medium">İşlemler</td>
              {clinics.map(clinic => (
                <td key={clinic.id} className="p-4">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/klinik/${clinic.slug}`)}
                    >
                      Detaylar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(clinic.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => router.push('/klinikler')} size="lg">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Daha Fazla Klinik Ekle
        </Button>
      </div>
    </div>
  )
}
