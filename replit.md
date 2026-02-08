# The GOOD Meow

## Overview

The GOOD Meow is a satirical newsroom-style publication website designed to look like a serious 1960s–1970s news outlet. The humor is subtle and comes from perspective rather than visuals or jokes. The site presents cat-authored journalism observing human behavior, styled as a legitimate, respected news organization.

The application syncs articles from a Substack publication and displays them in a newspaper-inspired layout with archival, print-inspired aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style variant) with Radix UI primitives
- **Typography**: Google Fonts - Playfair Display (headlines), Merriweather (body), Oswald (labels)

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js
- **API Pattern**: RESTful API endpoints under `/api/*`
- **Development**: Hot module replacement via Vite middleware in development mode
- **Production**: Static file serving from built assets

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Managed via `drizzle-kit push` command
- **Tables**:
  - `users`: Basic user authentication (id, username, password)
  - `articles`: News articles synced from Substack (id, substackId, title, excerpt, content, author, publishedDate, substackUrl, category, imageUrl, readTime, featured)

### Content Sync System
- Articles are fetched from Substack RSS feed (`thegoodmeow.substack.com/feed`)
- RSS parsing extracts title, content, images, and metadata
- Articles are upserted to prevent duplicates using Substack GUID
- Manual sync endpoint available at `POST /api/sync-substack`
- Auto-sync runs every 30 minutes and on server startup

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/  # UI components (layout, ui primitives)
│   │   ├── pages/       # Route page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities, API functions, query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database operations
│   ├── db.ts         # Database connection
│   └── medium-sync.ts # Substack RSS sync logic
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Database migration files
```

### Build System
- **Development**: `npm run dev` runs Express with Vite middleware for HMR
- **Production Build**: `npm run build` bundles client with Vite and server with esbuild
- **Output**: Production builds output to `dist/` directory

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Content Source
- **Substack RSS Feed**: Articles synced from `https://thegoodmeow.substack.com/feed`
- **RSS Parser**: `rss-parser` library for fetching and parsing Substack feed

### Third-Party Services
- **Google Fonts**: Typography (Playfair Display, Merriweather, Oswald)
- **External Links**: 
  - Substack (thegoodmeow.substack.com) for full article content
  - CoolCatStuff.com (advertiser integration)
  - Social media links (Instagram, YouTube, Twitter, LinkedIn, Snapchat, Google Maps)

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `express`: Web server framework
- `wouter`: Client-side routing
- `rss-parser`: Substack feed parsing
- `node-html-parser`: HTML content extraction
- Radix UI primitives: Accessible UI components
