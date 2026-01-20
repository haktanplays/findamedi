import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed başlatılıyor...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'admin@findamedi.com' },
    update: {},
    create: {
      email: 'admin@findamedi.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user oluşturuldu:', user.email)

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'dis-hekimligi' },
      update: {},
      create: {
        name: 'Diş Hekimliği',
        slug: 'dis-hekimligi',
        description: 'Diş estetiği, implant ve gülüş tasarımı',
        icon: 'tooth',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'estetik-cerrahi' },
      update: {},
      create: {
        name: 'Estetik Cerrahi',
        slug: 'estetik-cerrahi',
        description: 'Burun estetiği, meme estetiği ve yüz germe',
        icon: 'sparkles',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sac-ekimi' },
      update: {},
      create: {
        name: 'Saç Ekimi',
        slug: 'sac-ekimi',
        description: 'FUE ve DHI saç ekimi yöntemleri',
        icon: 'scissors',
        order: 3,
      },
    }),
  ])

  console.log('✅ Kategoriler oluşturuldu:', categories.length)

  const clinics = await Promise.all([
    prisma.clinic.upsert({
      where: { slug: 'istanbul-estetik-merkezi' },
      update: {},
      create: {
        name: 'İstanbul Estetik Merkezi',
        slug: 'istanbul-estetik-merkezi',
        description: '15 yılı aşkın tecrübesiyle İstanbul\'un önde gelen estetik cerrahi kliniği.',
        shortDescription: 'Profesyonel estetik cerrahi hizmetleri',
        email: 'info@istanbulestetik.com',
        phone: '+90 212 555 0101',
        whatsapp: '+90 532 555 0101',
        website: 'https://istanbulestetik.com',
        address: 'Nişantaşı, Abdi İpekçi Cad. No: 15, Şişli/İstanbul',
        city: 'İstanbul',
        district: 'Şişli',
        latitude: 41.0522,
        longitude: 28.9980,
        rating: 4.8,
        reviewCount: 127,
        priceRangeMin: 50000,
        priceRangeMax: 150000,
        establishedYear: 2008,
        isActive: true,
        isVerified: true,
        isFeatured: true,
        subscriptionPlan: 'PREMIUM',
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date('2024-01-01'),
        subscriptionEndDate: new Date('2024-12-31'),
      },
    }),
    prisma.clinic.upsert({
      where: { slug: 'dis-gulumusu-clinics' },
      update: {},
      create: {
        name: 'Diş Gülüşü Clinics',
        slug: 'dis-gulumusu-clinics',
        description: 'Modern diş teknolojileri ve uzman kadrosu ile kusursuz bir gülüş.',
        shortDescription: 'Diş estetiği ve implant uzmanı',
        email: 'info@disgulumusu.com',
        phone: '+90 216 555 0202',
        whatsapp: '+90 533 555 0202',
        website: 'https://disgulumusu.com',
        address: 'Kadıköy, Bağdat Cad. No: 45, Kadıköy/İstanbul',
        city: 'İstanbul',
        district: 'Kadıköy',
        latitude: 40.9894,
        longitude: 29.0293,
        rating: 4.7,
        reviewCount: 89,
        priceRangeMin: 10000,
        priceRangeMax: 80000,
        establishedYear: 2015,
        isActive: true,
        isVerified: true,
        isFeatured: true,
        subscriptionPlan: 'PREMIUM',
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date('2024-01-01'),
        subscriptionEndDate: new Date('2024-12-31'),
      },
    }),
    prisma.clinic.upsert({
      where: { slug: 'turkish-hair-transplant' },
      update: {},
      create: {
        name: 'Turkish Hair Transplant',
        slug: 'turkish-hair-transplant',
        description: 'FUE ve DHI yöntemlerinde uzman, saç ekimi alanında lider.',
        shortDescription: 'Profesyonel saç ekimi hizmetleri',
        email: 'info@turkishhairtransplant.com',
        phone: '+90 212 555 0303',
        whatsapp: '+90 534 555 0303',
        website: 'https://turkishhairtransplant.com',
        address: 'Beşiktaş, Barbaros Bulvarı No: 78, Beşiktaş/İstanbul',
        city: 'İstanbul',
        district: 'Beşiktaş',
        latitude: 41.0422,
        longitude: 29.0067,
        rating: 4.9,
        reviewCount: 203,
        priceRangeMin: 80000,
        priceRangeMax: 150000,
        establishedYear: 2010,
        isActive: true,
        isVerified: true,
        isFeatured: true,
        subscriptionPlan: 'PREMIUM',
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date('2024-01-01'),
        subscriptionEndDate: new Date('2024-12-31'),
      },
    }),
  ])

  console.log('✅ Klinikler oluşturuldu:', clinics.length)

  for (const clinic of clinics) {
    await prisma.clinicCategory.createMany({
      data: categories.map((category) => ({
        clinicId: clinic.id,
        categoryId: category.id,
      })),
      skipDuplicates: true,
    })

    const doctor = await prisma.doctor.create({
      data: {
        clinicId: clinic.id,
        name: 'Dr. Ahmet Yılmaz',
        specialty: clinic.slug.includes('dis') ? 'Diş Hekimi' : clinic.slug.includes('sac') ? 'Saç Ekimi Uzmanı' : 'Estetik Cerrah',
        title: 'Prof. Dr.',
        bio: '15 yılı aşkın tecrübeye sahip uzman doktor.',
        experienceYears: 15,
        education: {
          degree: 'Tıp Fakültesi',
          university: 'İstanbul Üniversitesi',
          year: 2005,
        },
        certifications: ['Türk Estetik Cerrahi Derneği', 'Sağlık Bakanlığı Onaylı'],
        languages: ['Türkçe', 'İngilizce', 'Arapça'],
      },
    })

    console.log(`✅ Doktor oluşturuldu: ${doctor.name} (${clinic.name})`)

    const treatments = await Promise.all([
      prisma.treatment.create({
        data: {
          clinicId: clinic.id,
          categoryId: categories[0].id,
          name: 'Diş İmplantı',
          description: 'Kaliteli diş implantı tedavisi',
          priceMin: 15000,
          priceMax: 30000,
          duration: '1-2 saat',
          isActive: true,
        },
      }),
      prisma.treatment.create({
        data: {
          clinicId: clinic.id,
          categoryId: categories[1].id,
          name: 'Burun Estetiği',
          description: 'Profesyonel burun estetiği operasyonu',
          priceMin: 50000,
          priceMax: 100000,
          duration: '2-3 saat',
          isActive: true,
        },
      }),
      prisma.treatment.create({
        data: {
          clinicId: clinic.id,
          categoryId: categories[2].id,
          name: 'FUE Saç Ekimi',
          description: 'FUE yöntemi ile saç ekimi',
          priceMin: 80000,
          priceMax: 150000,
          duration: '6-8 saat',
          isActive: true,
        },
      }),
    ])

    console.log(`✅ Tedaviler oluşturuldu: ${treatments.length} (${clinic.name})`)

    const beforeAfter = await prisma.beforeAfter.create({
      data: {
        clinicId: clinic.id,
        treatmentId: treatments[0].id,
        doctorId: doctor.id,
        title: 'Başarılı Tedavi Örneği',
        beforeImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500',
        afterImageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500',
        treatmentDate: new Date('2023-12-01'),
        patientAge: 32,
        patientGender: 'Erkek',
        isActive: true,
      },
    })

    console.log(`✅ Öncesi/Sonrası görseli oluşturuldu (${clinic.name})`)

    const review = await prisma.review.create({
      data: {
        clinicId: clinic.id,
        name: 'Mehmet Demir',
        country: 'Almanya',
        rating: 5,
        comment: 'Harika bir deneyimdi. Dr. Ahmet çok profesyonel. Kesinlikle tavsiye ediyorum!',
        treatment: 'Burun Estetiği',
        isVerified: true,
        status: 'APPROVED',
      },
    })

    console.log(`✅ Yorum oluşturuldu: ${review.name} (${clinic.name})`)
  }

  const clinicStats = await prisma.clinicStats.create({
    data: {
      clinicId: clinics[0].id,
      date: new Date(),
      views: 1450,
      clicks: 89,
      uniqueVisitors: 892,
      countryViews: {
        'Germany': 245,
        'UK': 198,
        'Turkey': 167,
        'France': 132,
        'Netherlands': 108,
      },
    },
  })

  console.log('✅ Klinik istatistikleri oluşturuldu')

  console.log('🎉 Seed başarıyla tamamlandı!')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
