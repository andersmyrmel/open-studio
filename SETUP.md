# Open-Studio Setup Guide

This guide will help you set up and run Open-Studio, a lightweight PostgreSQL UI extracted from Supabase Studio.

## About the Extraction

Open-Studio is inspired by Supabase Studio's database editor but built as a standalone application. Due to Studio's tight coupling with Supabase's cloud infrastructure, internal workspace packages, and authentication systems, we've created a **standalone implementation** that captures the essence of Studio's UI using its core libraries:

- **Monaco Editor** - The same SQL editor used in Studio
- **TanStack Query** - For data fetching and caching
- **TanStack Table** - For displaying query results
- **Lucide Icons** - Modern icon library
- **Node-Postgres (pg)** - Direct PostgreSQL connection

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **pnpm** >= 8.0.0)
- **PostgreSQL** database instance (local or remote)
- **Docker** (optional, for containerized deployment)

## Installation

### Step 1: Set Up Dependencies

Since this is a standalone app extracted from the Supabase monorepo, you need to use the standalone `package-open-studio.json`:

```bash
# Copy the standalone package.json
cp package-open-studio.json package.json

# Install dependencies
npm install
# or
pnpm install
```

### Step 2: Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
PORT=3000
NODE_ENV=development
```

**Connection String Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**Examples:**
- Local: `postgresql://postgres:postgres@localhost:5432/mydb`
- Docker: `postgresql://postgres:postgres@host.docker.internal:5432/mydb`
- Remote: `postgresql://user:pass@db.example.com:5432/production`
- With SSL: `postgresql://user:pass@host:5432/db?sslmode=require`

## Running Open-Studio

### Option 1: Local Development (Recommended)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Features:**
- Hot reloading
- Detailed error messages
- Query logging in console

### Option 2: Docker Compose

```bash
docker-compose up --build
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

**Note:** When connecting from Docker to a local PostgreSQL database, use `host.docker.internal` instead of `localhost` in your `DATABASE_URL`.

### Option 3: Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Project Structure

```
open-studio/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── query/route.ts    # Query execution endpoint
│   │   │   └── tables/route.ts   # Table listing endpoint
│   │   ├── components/           # React components
│   │   │   ├── QueryEditor.tsx   # SQL editor interface
│   │   │   ├── TableList.tsx     # Database table browser
│   │   │   └── ResultsView.tsx   # Query results display
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Main page
│   │   └── globals.css           # Global styles
│   └── lib/
│       ├── db.ts                 # PostgreSQL connection pool
│       └── types.ts              # TypeScript definitions
├── public/                       # Static assets
├── package-open-studio.json      # Standalone dependencies
├── .env.example                  # Environment template
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── Dockerfile                    # Docker image definition
└── docker-compose.yml            # Docker Compose config
```

## Usage

### Executing SQL Queries

1. Type your SQL query in the editor
2. Press **Cmd/Ctrl + Enter** or click **Execute**
3. View results in the table below

**Example Queries:**
```sql
-- Select data
SELECT * FROM users LIMIT 10;

-- Join tables
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;

-- Create table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2)
);
```

### Browsing Tables

1. Use the sidebar to view all tables in your database
2. Click on a table name to auto-generate a SELECT query
3. Use the search box to filter tables

### Security Notes

- All queries use **parameterized statements** to prevent SQL injection
- Queries have a **30-second timeout** limit
- Connection pooling prevents resource exhaustion
- Never commit your `.env` file to version control

## Troubleshooting

### Cannot Connect to Database

**Error:** `ECONNREFUSED`

**Solutions:**
1. Verify PostgreSQL is running: `psql -h localhost -U postgres`
2. Check the DATABASE_URL format
3. Ensure PostgreSQL allows connections from your IP (check `pg_hba.conf`)
4. If using Docker, use `host.docker.internal` instead of `localhost`

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Change the port in .env
PORT=3001

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill
```

### Module Not Found Errors

**Error:** `Module not found: Can't resolve '@/lib/db'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

**Solution:**
```bash
# Run type checking
npm run typecheck

# Generate Next.js types
rm -rf .next
npm run dev
```

## Development

### Code Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run typecheck
```

## Differences from Supabase Studio

Open-Studio is a **focused extraction** that removes:

❌ **Removed:**
- Authentication and user management (GoTrue)
- Storage and file management
- Realtime subscriptions
- Cloud hosting dependencies
- Project and organization management
- API key management
- AI features
- Supabase-specific integrations

✅ **Retained:**
- SQL query editor with Monaco Editor
- Table browsing and schema exploration
- Query execution and results display
- Direct PostgreSQL connectivity
- Security best practices

## Next Steps

1. **Read the Documentation:**
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture
   - [PLAN.md](./PLAN.md) - Implementation roadmap
   - [ROADMAP.md](./ROADMAP.md) - Feature roadmap
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

2. **Customize Your Setup:**
   - Add custom SQL templates
   - Modify UI styling in `src/app/globals.css`
   - Extend API routes for custom features

3. **Contribute:**
   - Report bugs and request features on [GitHub Issues](https://github.com/andersmyrmel/open-studio/issues)
   - Submit pull requests for improvements

## Support

- **Issues:** [GitHub Issues](https://github.com/andersmyrmel/open-studio/issues)
- **Discussions:** [GitHub Discussions](https://github.com/andersmyrmel/open-studio/discussions)
- **Original Supabase Studio:** [Supabase Repository](https://github.com/supabase/supabase)

## License

Apache 2.0 License - See [LICENSE](./LICENSE)

---

**Credits:**
- Based on [Supabase Studio](https://github.com/supabase/supabase)
- Inspired by [Simon Høiberg's tweet](https://x.com/SimonHoiberg/status/1988153954560340453)
