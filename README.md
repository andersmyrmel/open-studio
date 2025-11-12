# Open-Studio

A lightweight, self-hosted PostgreSQL UI inspired by [Supabase Studio](https://github.com/supabase/supabase).

Open-Studio extracts and refactors Supabase Studio's powerful database editor and query interface into a standalone local web application that connects directly to any PostgreSQL instance—no authentication, storage, or cloud dependencies required.

## Inspiration

This project was inspired by [Simon Høiberg's tweet](https://x.com/SimonHoiberg/status/1988153954560340453) about the need for a local-first PostgreSQL UI tool.

## Features

- **Database Editor**: Browse tables, schemas, and run queries directly
- **Query Interface**: Execute SQL queries with a clean, intuitive interface
- **Local-First**: Runs entirely on your machine, no cloud required
- **Docker-Ready**: Simple deployment with `docker-compose up`
- **Direct PostgreSQL Connection**: Connect to any PostgreSQL instance via standard connection string

## About This Extraction

Open-Studio is a **standalone implementation** inspired by Supabase Studio's database editor. Due to Studio's tight integration with Supabase's cloud infrastructure, internal monorepo packages, and authentication systems, we've created a standalone app using Studio's core libraries:

- **Monaco Editor** - Professional SQL editing experience
- **TanStack Query & Table** - Efficient data management
- **Direct PostgreSQL** - Using node-postgres (pg) for database connectivity
- **No Cloud Dependencies** - Fully self-contained

For detailed information about the extraction approach, see [SETUP.md](./SETUP.md).

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/andersmyrmel/open-studio.git
cd open-studio
```

2. Create a `.env` file with your PostgreSQL connection:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
PORT=3000
```

3. Start the application:
```bash
docker-compose up
```

4. Open your browser to `http://localhost:8080`

### Local Development

⚠️ **Important:** Use the standalone package.json:

```bash
cp package-open-studio.json package.json
npm install
# or
pnpm install
```

2. Set up your `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Docker Compose Example

```yaml
version: '3.8'

services:
  open-studio:
    build: .
    ports:
      - "8080:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@host.docker.internal:5432/mydb
      - PORT=3000
    restart: unless-stopped
```

## Configuration

Open-Studio uses environment variables for configuration:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Port for the web server | `3000` |

## Architecture

For detailed information about the technical architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Development Roadmap

See [ROADMAP.md](./ROADMAP.md) for the project's development roadmap and planned features.

## Implementation Plan

See [PLAN.md](./PLAN.md) for the detailed implementation plan.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Open-Studio is licensed under the Apache 2.0 License. See [LICENSE](./LICENSE) for details.

## Credits

- **Based on:** [Supabase Studio](https://github.com/supabase/supabase) - The open-source PostgreSQL UI that powers Supabase
- **Inspired by:** [Simon Høiberg](https://x.com/SimonHoiberg) ([tweet](https://x.com/SimonHoiberg/status/1988153954560340453))
- **License:** Apache 2.0

## Differences from Supabase

Open-Studio is a focused extraction of Supabase Studio's database UI. We've removed:
- Authentication and user management
- Storage and file management
- Realtime subscriptions
- Cloud hosting dependencies
- Multi-project management
- API key management

What remains is a clean, local-first PostgreSQL UI perfect for local development and self-hosted deployments.
