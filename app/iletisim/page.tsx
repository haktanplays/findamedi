'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">İletişim Formu</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Ad Soyad *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-posta *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Konu *
                  </label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mesajınız..."
                    rows={6}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {submitStatus.type === 'success' && (
                <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg">
                  {submitStatus.message}
                </div>
              )}

              {submitStatus.type === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg">
                  {submitStatus.message}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">E-posta</div>
                  <a
                    href="mailto:info@findamedi.com"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    info@findamedi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Telefon</div>
                  <a
                    href="tel:+902125555555"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    +90 212 555 5555
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Adres</div>
                  <div className="text-sm text-muted-foreground">
                    İstanbul, Türkiye
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Klinik Misiniz?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Find a Medi'ye katılmak ve görünürlüğünüzü artırmak ister misiniz?
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/klinik-panel/kayit">
                    Klinik Olun
                  </a>
                </Button>
                <Button className="w-full" asChild>
                  <a href="/klinik-panel/giris">
                    Klinik Girişi Yapın
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
