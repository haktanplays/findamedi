import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Phone, ExternalLink, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClinicCardProps {
  clinic: {
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
    isFeatured?: boolean
    categories?: {
      category: {
        name: string
        icon: string
      }
    }[]
  }
  onCompare?: (id: string) => void
  isComparing?: boolean
}

export function ClinicCard({ clinic, onCompare, isComparing }: ClinicCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/klinik/${clinic.slug}`} className="block">
        <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100">
          {clinic.logoUrl ? (
            <Image
              src={clinic.logoUrl}
              alt={clinic.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-300">
              <span className="text-4xl">🏥</span>
            </div>
          )}
          {clinic.isFeatured && (
            <Badge className="absolute top-3 right-3 bg-accent text-white">
              Öne Çıkan
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/klinik/${clinic.slug}`} className="block">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {clinic.name}
          </h3>
        </Link>

        {clinic.shortDescription && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {clinic.shortDescription}
          </p>
        )}

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{clinic.district}, {clinic.city}</span>
          </div>

          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 fill-amber-500 text-amber-500 flex-shrink-0" />
            <span className="font-semibold mr-1">{clinic.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({clinic.reviewCount} değerlendirme)
            </span>
          </div>

          {clinic.priceRangeMin && clinic.priceRangeMax && (
            <div className="text-sm">
              <span className="text-muted-foreground">Fiyat aralığı: </span>
              <span className="font-semibold text-primary">
                ${clinic.priceRangeMin.toLocaleString('tr-TR')} - ${clinic.priceRangeMax.toLocaleString('tr-TR')}
              </span>
            </div>
          )}

          {clinic.categories && clinic.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {clinic.categories.slice(0, 2).map((item) => (
                <Badge key={item.category.name} variant="secondary" className="text-xs">
                  {item.category.name}
                </Badge>
              ))}
              {clinic.categories.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{clinic.categories.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Link href={`/klinik/${clinic.slug}`} className="flex-1">
          <Button variant="outline" className="w-full">
            Detaylar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        {onCompare && (
          <Button
            variant={isComparing ? "default" : "outline"}
            onClick={() => onCompare(clinic.id)}
            className="flex-1"
          >
            {isComparing ? 'Kaldır' : 'Karşılaştır'}
          </Button>
        )}

        <div className="flex gap-2">
          {clinic.whatsapp && (
            <Button
              size="icon"
              variant="ghost"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <Phone className="w-5 h-5" />
              </a>
            </Button>
          )}

          {clinic.website && (
            <Button
              size="icon"
              variant="ghost"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={clinic.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
