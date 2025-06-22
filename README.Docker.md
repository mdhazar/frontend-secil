# Docker Setup

Bu doküman, uygulamanın Docker ile nasıl çalıştırılacağını açıklar.

## Gereksinimler

- Docker
- Docker Compose

## Hızlı Başlangıç

### 1. Environment Dosyası Oluşturma

Öncelikle environment dosyanızı oluşturun:

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyerek gerekli ortam değişkenlerini ayarlayın:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-very-secure-secret-key-here-change-this
NODE_ENV=production
```

### 2. Uygulamayı Başlatma

Tek komutla uygulamayı başlatın:

```bash
docker-compose up
```

Arka planda çalıştırmak için:

```bash
docker-compose up -d
```

### 3. Uygulamaya Erişim

Uygulama şu adreste erişilebilir olacak:

- http://localhost:3000

## Docker Komutları

### Build ve Başlatma

```bash
# İlk kez çalıştırma veya değişiklik sonrası
docker-compose up --build

# Sadece başlatma
docker-compose up

# Arka planda çalıştırma
docker-compose up -d
```

### Durdurma

```bash
# Servisleri durdur
docker-compose down

# Servisleri durdur ve volume'ları temizle
docker-compose down -v

# Servisleri durdur ve image'ları da sil
docker-compose down --rmi all
```

### Logları Görüntüleme

```bash
# Tüm servislerin logları
docker-compose logs

# Sadece frontend servisinin logları
docker-compose logs frontend-secil

# Logları takip etme
docker-compose logs -f
```

### Container İçine Girme

```bash
docker-compose exec frontend-secil sh
```

## Docker Image Detayları

- **Base Image**: Node.js 18 Alpine
- **Multi-stage Build**: Evet (deps, builder, runner)
- **Production Optimized**: Evet
- **Security**: Non-root user (nextjs)
- **Port**: 3000

## Environment Variables

Uygulama şu environment variable'ları kullanır:

- `NEXTAUTH_URL`: NextAuth için URL (örn: http://localhost:3000)
- `NEXTAUTH_SECRET`: NextAuth için gizli anahtar
- `NODE_ENV`: Node.js ortamı (production/development)

## Troubleshooting

### Port Çakışması

Eğer 3000 portu kullanımda ise, docker-compose.yml dosyasında portu değiştirebilirsiniz:

```yaml
ports:
  - "3001:3000" # Sol taraf host port, sağ taraf container port
```

### Build Hatası

Eğer build sırasında hata alırsanız:

```bash
# Cache'i temizleyerek tekrar build et
docker-compose build --no-cache

# Docker builder cache'ini temizle
docker builder prune
```

### Memory Hatası

Büyük uygulamalarda build sırasında memory hatası alabilirsiniz:

```bash
# Docker Desktop'ta memory limit'ini artırın
# Veya build sırasında memory limit belirleyin
docker-compose build --build-arg NODE_OPTIONS="--max-old-space-size=4096"
```

## Production Deployment

Production ortamında deploy ederken:

1. `.env.local` dosyasını güvenli bir şekilde oluşturun
2. `NEXTAUTH_SECRET` için güçlü bir anahtar kullanın
3. `NEXTAUTH_URL` değerini production domain'inize ayarlayın
4. HTTPS kullanmayı unutmayın

```bash
# Production build
docker-compose -f docker-compose.yml up --build -d
```
