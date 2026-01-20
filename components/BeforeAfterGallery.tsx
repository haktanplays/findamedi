'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BeforeAfterImage {
  id: string
  title?: string
  beforeImageUrl: string
  afterImageUrl: string
  treatmentDate?: Date
  patientAge?: number
  patientGender?: string
  doctor?: {
    name: string
  }
  treatment?: {
    name: string
  }
}

interface BeforeAfterGalleryProps {
  images: BeforeAfterImage[]
  className?: string
}

export function BeforeAfterGallery({ images, className }: BeforeAfterGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showAfter, setShowAfter] = useState(true)

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  if (images.length === 0) {
    return null
  }

  const currentImage = images[selectedIndex]

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.slice(0, 6).map((image, index) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer overflow-hidden hover:shadow-lg transition-shadow group">
                <CardContent className="p-0 relative aspect-square">
                  <Image
                    src={image.afterImageUrl}
                    alt={image.title || 'Sonrası'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-green-600">
                    Sonrası
                  </Badge>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="space-y-4">
                {currentImage.title && (
                  <h3 className="text-xl font-semibold">{currentImage.title}</h3>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="secondary">Öncesi</Badge>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={currentImage.beforeImageUrl}
                          alt="Öncesi"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Badge className="bg-green-600">Sonrası</Badge>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={currentImage.afterImageUrl}
                          alt="Sonrası"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {currentImage.treatment && (
                    <span>Tedavi: <strong className="text-foreground">{currentImage.treatment.name}</strong></span>
                  )}
                  {currentImage.treatmentDate && (
                    <span>Tarih: <strong className="text-foreground">
                      {new Date(currentImage.treatmentDate).toLocaleDateString('tr-TR')}
                    </strong></span>
                  )}
                  {currentImage.patientAge && (
                    <span>Yaş: <strong className="text-foreground">{currentImage.patientAge}</strong></span>
                  )}
                  {currentImage.patientGender && (
                    <span>Cinsiyet: <strong className="text-foreground">{currentImage.patientGender}</strong></span>
                  )}
                  {currentImage.doctor && (
                    <span>Doktor: <strong className="text-foreground">{currentImage.doctor.name}</strong></span>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevious}
                      disabled={selectedIndex === 0}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <span className="flex items-center">
                      {selectedIndex + 1} / {images.length}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNext}
                      disabled={selectedIndex === images.length - 1}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {images.length > 6 && (
        <div className="text-center">
          <Badge variant="secondary" className="text-base py-2 px-4">
            +{images.length - 6} sonuç daha
          </Badge>
        </div>
      )}
    </div>
  )
}
