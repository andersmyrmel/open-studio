# Contributing to Open-Studio

Thank you for your interest in contributing to Open-Studio! We welcome contributions from the community to help make this lightweight PostgreSQL UI even better.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Code Standards](#code-standards)
4. [Branching Strategy](#branching-strategy)
5. [Pull Request Process](#pull-request-process)
6. [Architecture](#architecture)

## Getting Started

Before contributing, please:

1. Read our [Code of Conduct](https://github.com/supabase/.github/blob/main/CODE_OF_CONDUCT.md)
2. Review the [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
3. Check existing [Issues](https://github.com/andersmyrmel/open-studio/issues) and [Pull Requests](https://github.com/andersmyrmel/open-studio/pulls)

## Development Setup

### Prerequisites

- Node.js >= 18
- npm or pnpm
- Docker (optional, for containerized development)
- PostgreSQL instance (for testing)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/andersmyrmel/open-studio.git
   cd open-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/testdb
   PORT=3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Development

```bash
docker-compose up --build
```

## Code Standards

We use the following tools to maintain code quality:

- **TypeScript**: All new code should be written in TypeScript
- **ESLint**: For code linting
- **Prettier**: For code formatting

### Before Submitting

Run these checks before creating a PR:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format

# Build
npm run build
```

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing code style and patterns
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use parameterized queries for all database operations (security)

## Branching Strategy

- **`main`**: Stable, production-ready code
- **`develop`**: Integration branch for features
- **`feature/*`**: New features (e.g., `feature/query-history`)
- **`fix/*`**: Bug fixes (e.g., `fix/connection-timeout`)
- **`docs/*`**: Documentation updates

### Creating a Branch

```bash
git checkout -b feature/your-feature-name
```

## Pull Request Process

1. **Create an Issue First** (for significant changes)
   - Describe the problem or feature
   - Discuss the approach with maintainers

2. **Fork and Create a Branch**
   - Fork the repository
   - Create a feature branch from `main`

3. **Make Your Changes**
   - Write clean, tested code
   - Follow the code standards
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

5. **Commit Your Changes**
   - Use clear, descriptive commit messages
   - Follow conventional commits format:
     ```
     feat: add query history feature
     fix: resolve connection timeout issue
     docs: update installation instructions
     ```

6. **Push and Create a PR**
   - Push your branch to your fork
   - Create a Pull Request against `main`
   - Fill out the PR template completely
   - Link any related issues

7. **Code Review**
   - Address reviewer feedback
   - Keep the PR focused and manageable
   - Be responsive to comments

### PR Title Format

```
<type>: <description>

Examples:
feat: add table schema viewer
fix: correct SQL query escaping
docs: update docker setup instructions
chore: update dependencies
```

## Architecture

Please review [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information about:

- Tech stack (Next.js, Node.js, PostgreSQL)
- Project structure
- Component organization
- Data flow
- Security considerations

## Security

- **Always use parameterized queries** for database operations
- Never expose credentials in code or logs
- Report security vulnerabilities privately to the maintainers
- Do not commit sensitive data (`.env`, keys, etc.)

## Questions?

- Check existing [Issues](https://github.com/andersmyrmel/open-studio/issues)
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) and [PLAN.md](./PLAN.md)
- Open a [Discussion](https://github.com/andersmyrmel/open-studio/discussions) for questions

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.

---

Thank you for contributing to Open-Studio!
