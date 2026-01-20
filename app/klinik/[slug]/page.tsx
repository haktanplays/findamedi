import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DoctorCard } from '@/components/DoctorCard'
import { BeforeAfterGallery } from '@/components/BeforeAfterGallery'
import { Rating } from '@/components/Rating'
import { Phone, MapPin, Globe, ExternalLink, Star, ArrowRight, Calendar, Clock } from 'lucide-react'

async function getClinic(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/clinics/${slug}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export default async function ClinicDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const clinic = await getClinic(params.slug)

  if (!clinic) {
    notFound()
  }

  return (
    <div className="space-y-8 py-8">
      <section className="container mx-auto px-4">
        <Link href="/klinikler" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Kliniklere Dön
        </Link>
      </section>

      <section className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="relative h-64 bg-gradient-to-r from-slate-100 to-slate-200">
            {clinic.coverImageUrl ? (
              <img
                src={clinic.coverImageUrl}
                alt={clinic.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-300">
                <span className="text-6xl">🏥</span>
              </div>
            )}
            {clinic.isVerified && (
              <Badge className="absolute top-4 right-4 bg-green-600">
                ✓ Doğrulanmış
              </Badge>
            )}
            {clinic.isFeatured && (
              <Badge className="absolute top-4 left-4 bg-accent">
                Öne Çıkan
              </Badge>
            )}
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{clinic.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{clinic.district}, {clinic.city}</span>
                    </div>
                    {clinic.establishedYear && (
                      <div>
                        {clinic.establishedYear} yıllık tecrübe
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground">{clinic.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Rating value={clinic.rating} count={clinic.reviewCount} />
                  </div>
                  {clinic.priceRangeMin && clinic.priceRangeMax && (
                    <Badge variant="secondary" className="text-base px-4 py-2">
                      ${clinic.priceRangeMin.toLocaleString('tr-TR')} - ${clinic.priceRangeMax.toLocaleString('tr-TR')}
                    </Badge>
                  )}
                </div>

                {clinic.categories && clinic.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {clinic.categories.map((item: any) => (
                      <Badge key={item.category.id} variant="outline">
                        {item.category.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  {clinic.phone && (
                    <a
                      href={`tel:${clinic.phone}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Telefon</div>
                        <div className="font-medium">{clinic.phone}</div>
                      </div>
                    </a>
                  )}

                  {clinic.whatsapp && (
                    <a
                      href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">WhatsApp</div>
                        <div className="font-medium">{clinic.whatsapp}</div>
                      </div>
                    </a>
                  )}

                  {clinic.website && (
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Globe className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Web Sitesi</div>
                        <div className="font-medium flex items-center gap-1">
                          {clinic.website.replace(/^https?:\/\//, '')}
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </a>
                  )}

                  {clinic.email && (
                    <a
                      href={`mailto:${clinic.email}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Globe className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">E-posta</div>
                        <div className="font-medium">{clinic.email}</div>
                      </div>
                    </a>
                  )}
                </div>

                <Button size="lg" className="w-full">
                  Hemen İletişime Geç
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {clinic.doctors && clinic.doctors.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Doktorlar ({clinic.doctors.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clinic.doctors.map((doctor: any) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>
      )}

      {clinic.treatments && clinic.treatments.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Tedaviler ve Fiyatlar</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {clinic.treatments.map((treatment: any) => (
                  <div
                    key={treatment.id}
                    className="flex flex-col sm:flex-row justify-between items-start gap-4 p-4 rounded-lg border"
                  >
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-lg">{treatment.name}</h3>
                      {treatment.description && (
                        <p className="text-sm text-muted-foreground">
                          {treatment.description}
                        </p>
                      )}
                      {treatment.category && (
                        <Badge variant="secondary">
                          {treatment.category.name}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right space-y-2">
                      {treatment.priceMin && treatment.priceMax && (
                        <div>
                          <div className="text-sm text-muted-foreground">Fiyat Aralığı</div>
                          <div className="font-bold text-primary">
                            ${treatment.priceMin.toLocaleString('tr-TR')} - ${treatment.priceMax.toLocaleString('tr-TR')}
                          </div>
                        </div>
                      )}
                      {treatment.duration && (
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{treatment.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {clinic.beforeAfterImages && clinic.beforeAfterImages.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            Öncesi / Sonrası Görselleri ({clinic.beforeAfterImages.length})
          </h2>
          <BeforeAfterGallery images={clinic.beforeAfterImages} />
        </section>
      )}

      {clinic.reviews && clinic.reviews.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Kullanıcı Yorumları ({clinic.reviewCount})
            </h2>
            <Button variant="outline">Yorum Ekle</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinic.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold mb-1">{review.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {review.country && <Badge variant="secondary">{review.country}</Badge>}
                        {review.treatment && (
                          <span>Tedavi: {review.treatment}</span>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(review.createdAt).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>
                    <Rating value={review.rating} showCount={false} />
                  </div>
                  <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                  {review.adminResponse && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h5 className="font-semibold text-sm mb-1">Klinik Yanıtı</h5>
                      <p className="text-sm text-muted-foreground">{review.adminResponse}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {clinic.reviewCount > clinic.reviews.length && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Tüm Yorumları Gör
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
