import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Klinikler', href: '/klinikler' },
    { label: 'Kategoriler', href: '/klinikler' },
    { label: 'Karşılaştır', href: '/karsilastir' },
    { label: 'Blog', href: '/blog' },
  ],
  Hakkımızda: [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
    { label: 'Gizlilik Politikası', href: '/gizlilik' },
    { label: 'Kullanım Şartları', href: 'kullanim-sartlari' },
  ],
  Klinikler: [
    { label: 'Klinik Girişi', href: '/klinik-panel/giris' },
    { label: 'Klinik Ol', href: '/klinik-panel/kayit' },
    { label: 'Paketler', href: '/pakete-r' },
    { label: 'SSS', href: '/sss' },
  ],
}

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/findamedi', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/findamedi', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/findamedi', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/findamedi', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-primary">🏥</span>
              <span className="text-2xl font-bold">Find a Medi</span>
            </div>
            <p className="text-sm text-muted-foreground">
              İstanbul'da en iyi diş, estetik ve saç ekimi kliniklerini bulun, karşılaştırın ve keşfedin.
            </p>
            <div className="flex space-x-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Find a Medi. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@findamedi.com" className="hover:text-primary">
                info@findamedi.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
