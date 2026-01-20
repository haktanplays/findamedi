import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Shield, TrendingUp, Users, Globe, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8">
      <section className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Hakkımızda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <p>
              <strong className="text-primary">Find a Medi</strong>, İstanbul\'daki
              klinikleri şeffaf ve güvenilir bir şekilde karşılaştırma platformu
              olarak 2026 yılında kurulmuştur.
            </p>
            <p>
              Medikal turizm alanında yurt dışından gelen hastaların en iyi
              sağlık hizmetlerini bulması için kolay ve erişilebilir bir çözüm
              sunuyoruz.
            </p>
            <p>
              Klinikler için düşük maliyetli reklam ve görünürlük imkanı,
              kullanıcılar için ise ücretsiz ve şeffaf karşılaştırma hizmeti
              sağlıyoruz.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Misyonumuz</h2>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-xl text-muted-foreground">
              Uluslararası hastaların Türkiye\'deki kliniklere ulaşmasını kolaylaştırmak
              ve klinik reklamcılığında adil, şeffaf ve erişilebilir bir alternatif
              sunmak.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Vizyonumuz</h2>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-xl text-muted-foreground">
              Türkiye\'nin ve ardından Avrupa\'nın en güvenilir medikal karşılaştırma
              ve klinik reklam platformu olmak.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-8 h-8" />,
              title: 'Şeffaflık',
              description: 'Fiyatlar, özellikler ve yorumlar açıkça belirtilmiştir.',
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Tarafsızlık',
              description: 'Tüm klinikler eşit koşullarda değerlendirilir.',
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: 'Güven',
              description: 'Kullanıcılarımızın güveni en önemli önceliğimizdir.',
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Kullanıcı Odaklı',
              description: 'Gerçek deneyimler ve değerlendirmeler temel alınır.',
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Sürdürülebilir Büyüme',
              description: 'Tüm paydaşlar için sürdürülebilir bir iş modeli.',
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: 'Global Erişim',
              description: 'Herkes için erişilebilir bir platform.',
            },
          ].map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-primary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bize Katılın</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Klinik misiniz? Find a Medi ile görünürlüğünüzü artırın ve
            daha fazla hasta ulaşın.
          </p>
          <a
            href="mailto:info@findamedi.com"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Bize Ulaşın
          </a>
        </div>
      </section>
    </div>
  )
}
