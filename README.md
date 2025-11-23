# OWTV.gg Monorepo

This is the monorepo for the **OWTV.gg** project, serving as the home of Overwatch Esports.

## 📂 Monorepo Structure

[description of a monorepo, and how it's setup]

```text
├── .github/          # CI/CD workflows
├── apps/
│   └── web/          # Main application (Next.js 16 + Payload CMS)
├── packages/
│   └── faceit/       # Shared internal package for FACEIT API integration
└── ...
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)

### Database

Run the following command to spin up a local Postgres instance with Docker

```bash
docker run --name owtv-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=owtv -p 5432:5432 -d postgres
```

### 3. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/owtvgg.git
cd owtvgg

# Install dependencies:
bun install

# Make a copy of the environment file and set the relevant values
# Generate and set secrets for Payload CMS & Better Auth
cp ./apps/web/.env.example ./apps/web/.env

```

## 📜 Global Scripts

These scripts run commands across the entire monorepo or target specific workspaces.

| Command                 | Description                                                 |
| :---------------------- | :---------------------------------------------------------- |
| `bun run web:dev`       | Starts the Next.js development server for `@owtvgg/web`     |
| `bun run web:db`        | Runs the Payload CMS CLI for database operations            |
| `bun run ci:test`       | Runs unit tests across all packages/apps                    |
| `bun run ci:check:lint` | Runs Biome linting/formatting checks                        |
| `bun run ci:check:fsd`  | Runs Steiger to validate Feature-Sliced Design architecture |
| `bun run ci:check:tsc`  | Runs TypeScript type checking                               |
