import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Search, CheckCircle, Quote } from 'lucide-react'
import { Star, Smile, Sparkles, Scissors } from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Diş Hekimliği',
    icon: <Star className="w-6 h-6" />,
    slug: 'dis-hekimligi',
    description: 'Diş estetiği, implant ve gülüş tasarımı',
    color: 'bg-blue-500',
  },
  {
    name: 'Estetik Cerrahi',
    icon: <Sparkles className="w-6 h-6" />,
    slug: 'estetik-cerrahi',
    description: 'Burun estetiği, meme estetiği ve yüz germe',
    color: 'bg-pink-500',
  },
  {
    name: 'Saç Ekimi',
    icon: <Scissors className="w-6 h-6" />,
    slug: 'sac-ekimi',
    description: 'FUE ve DHI saç ekimi yöntemleri',
    color: 'bg-teal-500',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Klinikleri Ara',
    description: 'Kategorilere göre filtreleyerek İstanbul\'daki klinikleri keşfedin.',
  },
  {
    step: '2',
    title: 'Karşılaştır',
    description: 'Fiyatlar, özellikler ve kullanıcı yorumlarını karşılaştırın.',
  },
  {
    step: '3',
    title: 'İletişime Geç',
    description: 'Doğrudan klinikle iletişime geçip detaylı bilgi alın.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    country: 'İngiltere',
    rating: 5,
    comment: 'Burun estetiği için İstanbul\'a geldim. Mükemmel sonuç, profesyonel ekip!',
  },
  {
    name: 'Ahmet K.',
    country: 'Almanya',
    rating: 5,
    comment: 'Diş implantı tedavisi çok başarılıydı. Kesinlikle tavsiye ederim.',
  },
  {
    name: 'Maria G.',
    country: 'Fransa',
    rating: 5,
    comment: 'Saç ekimi sonrası doğal görünüyor. Harika bir deneyimdi.',
  },
]

export default async function Home() {
  return (
    <div className="space-y-16 py-8">
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4">Türkiye'nin En Güvenilir Medikal Platformu</Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          İstanbul'da En İyi<br />
          <span className="text-primary">Klinikleri Bulun</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Diş, estetik ve saç ekimi tedavilerinde İstanbul\'un önde gelen
          kliniklerini karşılaştırın. Fiyatları, özellikleri ve gerçek
          kullanıcı yorumlarını tek platformda görün.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/klinikler">
            <Button size="lg" className="text-base px-8 py-6">
              Klinikleri Keşfet
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/karsilastir">
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              Karşılaştırma Başlat
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/klinikler?category=${category.slug}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`${category.color} w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nasıl Çalışır?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item) => (
            <Card key={item.step} className="relative">
              <CardContent className="p-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Neden Find a Medi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <CheckCircle className="w-6 h-6" />, title: 'Güvenilir', description: 'Tüm klinikler doğrulanmış ve değerlendirilmiştir.' },
            { icon: <Search className="w-6 h-6" />, title: 'Şeffaf', description: 'Fiyatlar ve özellikler açıkça belirtilmiştir.' },
            { icon: <Smile className="w-6 h-6" />, title: 'Kullanıcı Odaklı', description: 'Gerçek kullanıcı yorumları ve deneyimleri.' },
            { icon: <ArrowRight className="w-6 h-6" />, title: 'Kolay', description: 'Tek tıkla kliniklerle iletişime geçin.' },
          ].map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-primary mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Kullanıcı Yorumları</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.country}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? 'fill-amber-500 text-amber-500' : 'text-amber-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary flex-shrink-0" />
                </div>
                <p className="text-muted-foreground">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/klinikler">
            <Button variant="outline" size="lg">
              Daha Fazla Yorum Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klinik Müşterisi Misiniz?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Find a Medi ile görünürlüğünüzü artırın, daha fazla hasta ulaşın
            ve gelirlerinizi büyütün.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/klinik-panel/giris">
              <Button size="lg" variant="secondary" className="text-base px-8 py-6">
                Klinik Girişi Yap
              </Button>
            </Link>
            <Link href="/klinik-panel/kayit">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent text-white border-white hover:bg-white/10">
                Klinik Olun
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
