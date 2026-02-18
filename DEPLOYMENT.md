# 🚀 Complete Deployment Guide

## Table of Contents
1. [Local Development](#local-development)
2. [Production Deployment](#production-deployment)
3. [Cloud Platforms](#cloud-platforms)
4. [Docker Deployment](#docker-deployment)
5. [Environment Variables](#environment-variables)
6. [Database Migration](#database-migration)
7. [File Storage Configuration](#file-storage-configuration)
8. [SSL/HTTPS Setup](#sslhttps-setup)
9. [Performance Optimization](#performance-optimization)
10. [Monitoring & Logging](#monitoring--logging)

---

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Setup Steps

1. **Install Dependencies**
```bash
cd online-exam-tracker
npm install
```

2. **Database Setup**
```bash
# Create database
createdb exam_tracker

# Or using psql
psql -U postgres
CREATE DATABASE exam_tracker;
```

3. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Initialize Database**
```bash
npm run db:push
npm run db:seed
```

5. **Start Development Server**
```bash
npm run dev
```

---

## Production Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm start
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@host:5432/exam_tracker?schema=public"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="long-random-string-for-production"
JWT_SECRET="another-long-random-string"
```

---

## Cloud Platforms

### 1. Vercel (Recommended)

**Pros:** Zero config, automatic deployments, great Next.js support
**Cons:** Need external database

**Steps:**
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

**Database Options:**
- Vercel Postgres
- Neon (free tier)
- Supabase
- Railway PostgreSQL

**Configuration:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
```

### 2. Railway

**Pros:** Built-in PostgreSQL, simple deployment
**Cons:** Limited free tier

**Steps:**
1. Connect GitHub repository
2. Add PostgreSQL plugin
3. Configure environment variables
4. Deploy

**Railway Configuration:**
```yaml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
```

### 3. AWS (EC2 + RDS)

**Pros:** Full control, scalable
**Cons:** More complex setup

**Steps:**

1. **Launch EC2 Instance**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL client
sudo apt-get install postgresql-client

# Clone repository
git clone your-repo-url
cd online-exam-tracker
npm install
npm run build
```

2. **Setup RDS PostgreSQL**
- Create RDS instance
- Configure security groups
- Note connection string

3. **Configure Environment**
```bash
# Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://user:pass@rds-endpoint:5432/examdb"
NEXTAUTH_URL="http://your-ec2-ip:3000"
NEXTAUTH_SECRET="your-secret"
JWT_SECRET="your-jwt-secret"
EOF
```

4. **Run Database Migrations**
```bash
npm run db:push
npm run db:seed
```

5. **Start Application with PM2**
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "exam-tracker" -- start

# Auto-restart on reboot
pm2 startup
pm2 save
```

6. **Setup Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. DigitalOcean

**Using App Platform:**
1. Connect GitHub
2. Detect Next.js automatically
3. Add PostgreSQL database
4. Deploy

**Using Droplet:**
Similar to AWS EC2 setup above.

### 5. Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create exam-tracker-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NEXTAUTH_SECRET=your-secret
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main

# Run migrations
heroku run npm run db:push
```

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/exam_tracker
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=exam_tracker
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Run migrations
docker-compose exec app npm run db:push

# Seed database
docker-compose exec app npm run db:seed

# Stop
docker-compose down
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host:5432/db |
| NEXTAUTH_URL | Application URL | https://yourdomain.com |
| NEXTAUTH_SECRET | NextAuth secret key | random-32-char-string |
| JWT_SECRET | JWT signing secret | another-random-string |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| AWS_ACCESS_KEY_ID | AWS S3 access key | - |
| AWS_SECRET_ACCESS_KEY | AWS S3 secret | - |
| AWS_REGION | AWS region | us-east-1 |
| AWS_S3_BUCKET | S3 bucket name | - |
| UPLOAD_DIR | Local upload directory | ./public/uploads |
| NODE_ENV | Environment | development |

---

## Database Migration

### Production Migration Strategy

1. **Backup Current Database**
```bash
pg_dump -U user -d exam_tracker > backup.sql
```

2. **Apply Migrations**
```bash
# Using Prisma migrate
npm run db:migrate

# Or push schema (for prototyping)
npm run db:push
```

3. **Verify Migration**
```bash
# Open Prisma Studio
npm run db:studio
```

4. **Rollback if Needed**
```bash
# Restore from backup
psql -U user -d exam_tracker < backup.sql
```

---

## File Storage Configuration

### Local Storage (Development)

```env
UPLOAD_DIR=./public/uploads
```

### AWS S3 (Production)

1. **Create S3 Bucket**
```bash
aws s3 mb s3://exam-tracker-files
```

2. **Configure CORS**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```

3. **Set Environment Variables**
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=exam-tracker-files
AWS_REGION=us-east-1
```

---

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

### Nginx with SSL

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Performance Optimization

### 1. Next.js Optimizations

```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  images: {
    domains: ['yourdomain.com', 's3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  experimental: {
    optimizeCss: true,
  },
};
```

### 2. Database Optimization

```typescript
// Add database indexes
// In schema.prisma
@@index([studentId, examId])
@@index([createdAt])
```

### 3. Caching Strategy

```typescript
// Redis caching (optional)
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache dashboard data
const cacheKey = `dashboard:${userId}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Set cache with expiry
await redis.setex(cacheKey, 300, JSON.stringify(data));
```

---

## Monitoring & Logging

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 2. Application Monitoring

```bash
# Install PM2
npm install -g pm2

# Start with monitoring
pm2 start npm --name "exam-tracker" -- start
pm2 monit
```

### 3. Database Monitoring

```sql
-- PostgreSQL slow query log
ALTER DATABASE exam_tracker SET log_min_duration_statement = 1000;

-- Check active connections
SELECT count(*) FROM pg_stat_activity;
```

### 4. Health Check Endpoint

```typescript
// src/app/api/health/route.ts
export async function GET() {
  const dbCheck = await prisma.$queryRaw`SELECT 1`;
  
  return Response.json({
    status: 'healthy',
    database: dbCheck ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
}
```

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET and NEXTAUTH_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Implement proper input validation
- [ ] Use environment variables for secrets
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Configure firewall rules
- [ ] Use prepared statements (Prisma does this)

---

## Backup Strategy

### Automated Database Backups

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="exam_tracker"

pg_dump -U postgres $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

### Cron Job

```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```

---

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Check firewall/security groups

2. **Build Errors**
   - Clear .next folder: `rm -rf .next`
   - Reinstall dependencies: `npm ci`
   - Check Node.js version

3. **File Upload Issues**
   - Check UPLOAD_DIR permissions
   - Verify AWS credentials
   - Check file size limits

---

## Support

For deployment issues:
1. Check logs: `pm2 logs` or `docker-compose logs`
2. Verify environment variables
3. Check database connectivity
4. Review Next.js documentation

**Successfully deployed! 🎉**
