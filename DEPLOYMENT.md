# 🚀 Complete Vercel Deployment Guide (Frontend + Backend + Database All on Vercel)

This project is pre-configured to deploy the **Frontend, Backend (Serverless Express API), and Database** directly to **Vercel** in a single project.

---

## 🏗️ How it Works on Vercel

```
                               ┌─────────────────────────────┐
                               │       VERCEL PLATFORM       │
                               │                             │
    User Visits ──────────────►│  React 18 + Vite (Frontend) │
                               │  /index.html + /assets      │
                               │                             │
    API Requests (/api/*) ────►│  Express Serverless Handler │
                               │  api/index.js               │
                               │             │               │
                               └─────────────┼───────────────┘
                                             ▼
                               ┌─────────────────────────────┐
                               │   VERCEL POSTGRES (NEON)    │
                               │   1-Click Cloud Database    │
                               └─────────────────────────────┘
```

---

## ⚡ Step-by-Step 1-Click Vercel Deployment

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Complete PKEstate with image uploads, luxury cursor and Vercel setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pkestate.git
git push -u origin main
```

---

### Step 2: Import Repository in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
2. Select your `pkestate` repository and click **Import**.
3. Keep default settings:
   - **Root Directory**: `./` (Project root)
   - **Build Command**: Auto-detected from root `vercel.json`
   - **Output Directory**: Auto-detected (`client/dist`)

---

### Step 3: Add Database in Vercel (1-Click)
1. In your Vercel Project Dashboard, navigate to the **"Storage"** tab.
2. Click **"Create Database"** → Select **"Postgres" (powered by Neon)**.
3. Click **Continue** → Name your database (e.g., `pkestate-db`) and choose your region.
4. Click **Create** → Select **"Connect to Project"** and connect it to your PKEstate project.
5. Vercel will automatically inject `DATABASE_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, etc., into your project's Environment Variables!

---

### Step 4: Add Environment Variables in Vercel

Go to **Settings** → **Environment Variables** in Vercel and ensure the following are present:

| Variable | Value | Notes |
|---|---|---|
| `JWT_SECRET` | `your_long_random_secret_key_here` | Any secure random string |
| `DATABASE_URL` | *(Auto-populated by Vercel Postgres)* | Postgres connection string |
| `NODE_ENV` | `production` | Set to production |

---

### Step 5: Push Database Schema & Seed Data
From your local terminal, run:

```bash
# Connect local Prisma to your live Vercel Postgres database URL
$env:DATABASE_URL="YOUR_VERCEL_POSTGRES_CONNECTION_STRING"

# Push schema to live Vercel Postgres
cd server
npx prisma db push

# Seed 10 properties and Pakistani agent profiles
node prisma/seed.js
```

---

## 🔑 Live Admin Credentials

| URL | Default Email | Default Password |
|---|---|---|
| `https://your-domain.vercel.app/admin` | `admin@pkestate.pk` | `pkestate123` |

---

## 📱 Official WhatsApp Number
All inquiries, cards, buttons, and agent contact links are connected to:
- **WhatsApp**: `+92 303 6570074` (`https://wa.me/923036570074`)

---

## ✨ Features Added in this Release

1. **All-on-Vercel Monorepo**: Configured root `vercel.json`, `package.json`, and `api/index.js` for serverless API routing.
2. **Direct Image File Uploads**: Admin property creator now includes drag-and-drop image file uploads with live thumbnail previews and remove buttons (no raw URLs required).
3. **Protected Admin Security**: Added `<ProtectedRoute>` router guard blocking all unauthorized access to `/admin/dashboard`, `/admin/properties`, and `/admin/inquiries`.
4. **Luxury Modern Cursor**: Dynamic magnetic scaling, directional velocity skew, micro-badges ("VIEW"), and smart touch-screen disabling.
5. **Authentic Pakistani Portraits**: Replaced western images with high-resolution South Asian executive and consultant portraits.
