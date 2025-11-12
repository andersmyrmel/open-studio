# Architecture

This document describes the technical architecture of Open-Studio, a lightweight PostgreSQL UI based on Supabase Studio.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Project Structure](#project-structure)
5. [Components](#components)
6. [Data Flow](#data-flow)
7. [Security](#security)
8. [Docker Setup](#docker-setup)

## Overview

Open-Studio is a standalone web application that provides a user interface for managing and querying PostgreSQL databases. It's built by extracting and refactoring the database editor components from Supabase Studio, removing all cloud-dependent features to create a lightweight, local-first tool.

### Design Goals

- **Local-First**: Run entirely on the user's machine without cloud dependencies
- **Simple**: Easy setup with Docker or local development
- **Secure**: Use parameterized queries and secure connection handling
- **Lightweight**: Minimal dependencies, focused feature set
- **Extensible**: Clear architecture for future enhancements

## Tech Stack

### Frontend

- **Next.js 14+** (App Router): React framework with server-side rendering
- **TypeScript**: Type-safe development
- **React**: UI library
- **TailwindCSS**: Utility-first styling (from Supabase Studio)
- **Radix UI**: Accessible component primitives (from Supabase Studio)

### Backend

- **Next.js API Routes**: Serverless API endpoints
- **Node.js**: JavaScript runtime
- **pg (node-postgres)**: PostgreSQL client for Node.js
- **Environment Variables**: Configuration management

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript Compiler**: Type checking

### Deployment

- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│                   (http://localhost:3000)                │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ HTTP/HTTPS
                  │
┌─────────────────▼───────────────────────────────────────┐
│                  Open-Studio Container                   │
│                                                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │           Next.js Frontend (React)                 │ │
│  │  • Table List Component                            │ │
│  │  • Query Editor Component                          │ │
│  │  • Results View Component                          │ │
│  └──────────────────┬─────────────────────────────────┘ │
│                     │                                    │
│                     │ API Calls                          │
│                     │                                    │
│  ┌──────────────────▼─────────────────────────────────┐ │
│  │           Next.js API Routes                       │ │
│  │  • /api/query     - Execute SQL queries            │ │
│  │  • /api/tables    - List tables (future)           │ │
│  │  • /api/schema    - Get schema info (future)       │ │
│  └──────────────────┬─────────────────────────────────┘ │
│                     │                                    │
│                     │ pg client                          │
│                     │                                    │
│  ┌──────────────────▼─────────────────────────────────┐ │
│  │          Database Connection Layer                 │ │
│  │  • Connection pooling                              │ │
│  │  • Query parameterization                          │ │
│  │  • Error handling                                  │ │
│  └──────────────────┬─────────────────────────────────┘ │
│                     │                                    │
└─────────────────────┼────────────────────────────────────┘
                      │
                      │ PostgreSQL Protocol
                      │ (DATABASE_URL)
                      │
┌─────────────────────▼────────────────────────────────────┐
│              PostgreSQL Database                         │
│  • Any PostgreSQL instance (local or remote)             │
│  • Version 12+ recommended                               │
└──────────────────────────────────────────────────────────┘
```

## Project Structure

Open-Studio follows the Next.js 13+ App Router convention with a clear separation:
- **`/app/`** - Next.js App Router (pages, layouts, API routes)
- **`/src/`** - Application code (components, data, hooks, utilities)

```
open-studio/
├── app/                          # Next.js App Router (80KB, 13 files)
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Landing page
│   ├── sql/
│   │   └── page.tsx              # SQL Editor page
│   ├── tables/
│   │   └── page.tsx              # Table Editor page
│   └── api/                      # API routes
│       └── pg-meta/              # PostgreSQL metadata APIs
│           ├── schemas/          # Database schemas
│           ├── tables/           # Table metadata
│           ├── functions/        # Stored procedures
│           ├── triggers/         # Database triggers
│           ├── extensions/       # PostgreSQL extensions
│           ├── roles/            # Database roles
│           ├── policies/         # RLS policies
│           └── query/            # SQL execution
│
├── src/                          # Application code (3.5MB, 784 files)
│   ├── components/               # React components
│   │   ├── interfaces/           # Feature interfaces (SQLEditor, TableGridEditor)
│   │   ├── ui/                   # Reusable UI components
│   │   ├── grid/                 # Data grid components
│   │   └── providers.tsx         # React Query & toast providers
│   │
│   ├── data/                     # Data fetching & queries
│   │   ├── database/             # Database metadata queries
│   │   ├── sql/                  # SQL execution queries
│   │   ├── tables/               # Table queries
│   │   ├── database-functions/   # Functions queries
│   │   ├── database-triggers/    # Triggers queries
│   │   ├── database-extensions/  # Extensions queries
│   │   ├── database-roles/       # Roles queries
│   │   ├── database-policies/    # Policies queries
│   │   ├── fetchers.ts           # API fetch utilities
│   │   └── query-client.ts       # React Query client
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── ui/                   # UI-related hooks
│   │
│   ├── lib/                      # Utilities & helpers
│   │   ├── common/               # Common utilities
│   │   ├── constants/            # Constants & enums
│   │   └── db.ts                 # Database connection
│   │
│   └── state/                    # State management
│       ├── sql-editor-v2.ts      # SQL editor state
│       ├── table-editor.tsx      # Table editor state
│       └── tabs.tsx              # Tab management
│
├── public/                       # Static assets (empty)
├── .env.example                  # Environment template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
├── Dockerfile                    # Docker image
├── docker-compose.yml            # Docker Compose setup
└── README.md                     # Project documentation
```

### Directory Purposes

#### `/app/` Directory (Next.js App Router)
Contains the **routing structure** and **API endpoints** following Next.js 13+ conventions:
- **Pages**: File-based routing (`page.tsx` files)
- **Layouts**: Shared layouts (`layout.tsx` files)
- **API Routes**: RESTful endpoints (`route.ts` files in `/api/`)
- **Styles**: Global CSS

#### `/src/` Directory (Application Code)
Contains all the **extracted Supabase Studio code** and custom logic:
- **Components**: All React UI components
- **Data Layer**: TanStack Query hooks for data fetching
- **Hooks**: Custom React hooks for reusable logic
- **Lib**: Utilities, constants, and helper functions
- **State**: Client-side state management (Valtio)

This structure keeps routing concerns (`/app/`) separate from business logic (`/src/`), making the codebase easier to navigate and maintain.

## Components

### Frontend Components

#### 1. TableList Component
**Location:** `src/app/components/TableList.tsx`

Displays a list of tables in the connected database.

**Features:**
- Lists all tables in the public schema
- Shows table row counts
- Clickable to view table details
- Search/filter functionality

#### 2. QueryEditor Component
**Location:** `src/app/components/QueryEditor.tsx`

Provides an interface for writing and executing SQL queries.

**Features:**
- Syntax highlighting for SQL
- Execute button
- Query history (future)
- Keyboard shortcuts (Cmd/Ctrl + Enter to execute)

#### 3. ResultsView Component
**Location:** `src/app/components/ResultsView.tsx`

Displays query results in a table format.

**Features:**
- Paginated results
- Column sorting
- Export to CSV (future)
- Error display

### Backend API

#### 1. Query Execution Endpoint
**Endpoint:** `POST /api/query`

Executes SQL queries against the connected database.

**Request:**
```typescript
{
  query: string;
  params?: any[];
}
```

**Response:**
```typescript
{
  success: boolean;
  data?: any[];
  rowCount?: number;
  error?: string;
}
```

**Security:**
- Uses parameterized queries
- Validates input
- Rate limiting (future)

### Database Layer

#### Connection Helper
**Location:** `src/lib/db.ts`

Manages PostgreSQL connections and provides query helpers.

**Features:**
- Connection pooling
- Automatic reconnection
- Error handling
- Query logging (development)

**Example:**
```typescript
import { query } from '@/lib/db';

const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
```

## Data Flow

### Query Execution Flow

1. **User Action**: User types SQL query in QueryEditor component
2. **Frontend Validation**: Basic validation on the frontend
3. **API Request**: POST request to `/api/query` with query text
4. **Server Processing**:
   - API route receives request
   - Validates and sanitizes input
   - Calls database connection helper
5. **Database Query**:
   - Connection helper executes parameterized query
   - PostgreSQL processes query
6. **Response**:
   - Results returned to API route
   - API route formats response
   - Response sent to frontend
7. **Display**: ResultsView component renders results

### Connection Flow

1. **Application Start**: Next.js server initializes
2. **Environment Loading**: Load `DATABASE_URL` from environment
3. **Pool Creation**: Create PostgreSQL connection pool
4. **Health Check**: Verify database connectivity
5. **Ready**: Application ready to accept requests

## Security

### Query Security

1. **Parameterized Queries**: All queries use parameterized statements
   ```typescript
   // ✅ Good
   await query('SELECT * FROM users WHERE id = $1', [userId]);

   // ❌ Bad (SQL injection risk)
   await query(`SELECT * FROM users WHERE id = ${userId}`);
   ```

2. **Input Validation**: Validate all user input before processing

3. **Error Handling**: Don't expose sensitive information in error messages

### Connection Security

1. **Environment Variables**: Store credentials in `.env` file (never commit)
2. **SSL/TLS**: Support SSL connections to PostgreSQL
3. **Connection Pooling**: Limit concurrent connections

### Future Security Enhancements

- Rate limiting on API endpoints
- Query timeout enforcement
- Query complexity analysis
- Read-only mode option
- IP whitelisting

## Docker Setup

### Dockerfile

**Purpose:** Create a production-ready Docker image for Open-Studio.

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

### docker-compose.yml

**Purpose:** Orchestrate Open-Studio container with configuration.

```yaml
version: '3.8'

services:
  open-studio:
    build: .
    ports:
      - "8080:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3000
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PORT` | Port for web server | `3000` |
| `NODE_ENV` | Node environment | `production` |

## Development vs Production

### Development Mode
- Hot reloading enabled
- Detailed error messages
- Source maps included
- Query logging enabled

### Production Mode
- Optimized bundle
- Minimal error messages
- No source maps
- Query logging disabled

## Future Architecture Considerations

### Planned Features

1. **Multi-Database Support**: Connect to multiple databases
2. **Query History**: Store and retrieve past queries
3. **Schema Visualization**: Graphical schema browser
4. **Export Functionality**: Export results to CSV/JSON
5. **User Preferences**: Dark mode, editor settings

### Scalability

Current architecture supports:
- Single user / small team usage
- Local network deployment
- Connection pooling for concurrent queries

Not designed for:
- Multi-tenant cloud deployment
- High-concurrency scenarios (100+ concurrent users)
- Geographic distribution

---

For implementation details, see [PLAN.md](./PLAN.md).
For feature roadmap, see [ROADMAP.md](./ROADMAP.md).
