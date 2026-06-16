# PrimeSource

> Premier IT Staffing & Digital Solutions Platform

PrimeSource is a modern, full-stack web application built with Next.js 15, designed for an IT staffing and digital solutions company. It features a sleek dark-themed UI, a comprehensive blog, career portal, case studies showcase, and contact management system.

---

## Tech Stack

| Category          | Technology                                 |
| ----------------- | ------------------------------------------ |
| **Framework**     | Next.js 15 (App Router)                    |
| **Language**      | TypeScript 5                               |
| **Styling**       | Tailwind CSS 3 + Shadcn UI                 |
| **Animations**    | Framer Motion 11                           |
| **Database**      | PostgreSQL 16                              |
| **ORM**           | Prisma 5                                   |
| **Forms**         | React Hook Form + Zod                      |
| **Content**       | MDX (next-mdx-remote)                      |
| **Charts**        | Recharts                                   |
| **Icons**         | Lucide React                               |
| **Containerization** | Docker + Docker Compose                 |

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** 16 (or use Docker)
- **Git**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-org/primesource.git
   cd primesource
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the `DATABASE_URL` and other variables.

4. **Set up the database:**

   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Push schema to database
   npm run prisma:push

   # Seed with sample data
   npm run prisma:seed
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
primesource/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── public/                    # Static assets
│   └── images/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (marketing)/       # Marketing pages group
│   │   ├── (blog)/            # Blog pages
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── layout/            # Header, Footer, etc.
│   │   ├── sections/          # Page sections
│   │   └── shared/            # Reusable components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── utils.ts           # Utility functions
│   │   └── constants.ts       # Site configuration
│   ├── hooks/                 # Custom React hooks
│   └── types/
│       └── index.ts           # Shared TypeScript types
├── .env                       # Environment variables
├── .env.example               # Environment template
├── docker-compose.yml         # Docker Compose config
├── Dockerfile                 # Multi-stage Docker build
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── components.json            # Shadcn UI configuration
└── package.json               # Dependencies & scripts
```

---

## Available Scripts

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start development server             |
| `npm run build`      | Build for production                 |
| `npm run start`      | Start production server              |
| `npm run lint`       | Run ESLint                           |
| `npm run prisma:generate` | Generate Prisma client          |
| `npm run prisma:push`     | Push schema to database         |
| `npm run prisma:studio`   | Open Prisma Studio              |
| `npm run prisma:seed`     | Seed database with sample data  |

---

## Deployment

### Docker (Recommended)

```bash
# Build and start all services
docker-compose up -d --build

# Run database migrations inside the container
docker-compose exec app npx prisma db push

# Seed the database
docker-compose exec app npx tsx prisma/seed.ts
```

### Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Import the project in [Vercel](https://vercel.com).
3. Set the required environment variables in the Vercel dashboard.
4. Vercel will automatically detect Next.js and configure the build.

> **Note:** You will need a managed PostgreSQL database (e.g., [Neon](https://neon.tech), [Supabase](https://supabase.com), or [PlanetScale](https://planetscale.com)).

### Node.js (Standalone)

```bash
# Build the application
npm run build

# Start the production server
npm run start

# Or use the standalone output
node .next/standalone/server.js
```

---

## Environment Variables

| Variable               | Description                 | Required |
| ---------------------- | --------------------------- | -------- |
| `DATABASE_URL`         | PostgreSQL connection string | Yes      |
| `NEXTAUTH_SECRET`      | Auth encryption secret       | Yes      |
| `NEXTAUTH_URL`         | Application base URL         | Yes      |
| `NEXT_PUBLIC_SITE_URL` | Public site URL              | Yes      |
| `SMTP_HOST`            | Email server host            | No       |
| `SMTP_PORT`            | Email server port            | No       |
| `SMTP_USER`            | Email account username       | No       |
| `SMTP_PASS`            | Email account password       | No       |
| `NEXT_PUBLIC_GA_ID`    | Google Analytics ID          | No       |

---

## License

This project is proprietary software. All rights reserved.

---

Built with ❤️ by **PrimeSource**
