import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface DoctorCardProps {
  doctor: {
    id: string
    name: string
    specialty: string
    title?: string
    bio?: string
    photoUrl?: string
    experienceYears?: number
  }
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 flex-shrink-0">
            <AvatarImage 
              src={doctor.photoUrl} 
              alt={doctor.name}
              width={80}
              height={80}
            />
            <AvatarFallback className="text-2xl">
              {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-lg">
              {doctor.title} {doctor.name}
            </h4>
            <p className="text-sm text-primary font-medium mb-2">
              {doctor.specialty}
            </p>

            {doctor.experienceYears && (
              <p className="text-sm text-muted-foreground mb-2">
                {doctor.experienceYears} yıllık tecrübe
              </p>
            )}

            {doctor.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {doctor.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
