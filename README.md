# OWTV.gg

A web application for tracking OWCS players and teams, built with Next.js and Payload CMS.

## 🚀 Getting Started

### 1. Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)

### 2. Database

**Option A: Local Docker**  
Run the following command to spin up a local Postgres instance with Docker

```bash
docker run --name owtv-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=owtv -p 5432:5432 -d postgres
```

**Option A: Hosted**  
Alternatively, you can provision a free database on cloud providers (e.g. [Neon](https://neon.com/)).

### 3. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/owtvgg.git
cd owtvgg

# Install dependencies:
bun install

# Make a copy of the environment file and set the relevant values
cp .env.example .env

# Generate and set secrets for Payload CMS & Better Auth
```

### 4. Development

```bash
# Start the app for local development
bun dev
```

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **CMS:** [Payload CMS](https://payloadcms.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/), [Payload Auth](https://github.com/payload-auth/payload-auth)
- **UI:** [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Code Quality:** [Biome](https://biomejs.dev/)
- **Git Hooks:** [Lefthook](https://github.com/evilmartians/lefthook)
- **Package Manager:** [Bun](https://bun.sh/)
- **Architecture:** [Feature-Sliced Design](https://feature-sliced.design/), [Steiger](https://github.com/feature-sliced/steiger)
