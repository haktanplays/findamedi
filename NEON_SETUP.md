# Neon Database Kurulum Adımları

## 1. Neon Hesabı Oluştur
- https://neon.tech/signup adresine git
- Ücretsiz hesap oluştur

## 2. Yeni Project Oluştur
- "Create a project" butonuna tıkla
- Project name: find-a-medi
- Region: Europe-West (önerilir)
- Create project

## 3. Connection String Al
- Dashboard'da "Connection Details" bölümüne git
- "Connection string" kopyala
- Format: postgresql://user:password@host/dbname?sslmode=require

## 4. .env.local Güncelle
- Connection string'i .env.local dosyasına yapıştır:
  DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

## 5. Prisma Migrate Çalıştır
```bash
npx prisma db push
```

Bu komut database'i oluşturup schema'yı uygulayacak.
