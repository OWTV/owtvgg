# OWTV.gg

A web application for tracking OWCS players and teams, built with Next.js and Payload CMS.

## 🚀 Getting Started

### 1. Prerequisites

- [Bun](https://bun.sh/)

### 2. Database

[instructions to setup a db on linux]
[instructions to provision a free db on Neon]

### 3. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/owtvgg.git
cd owtvgg
```

```bash
# Install dependencies:
bun install
```

```bash
# Make a copy of the environment file and set the relevant values
# Generate and set secrets for Payload CMS & Better Auth
# Set the database connection string for your PostgreSQL database
cp .env.example .env
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

## 📦 CI/CD Pipeline

This project uses a modern CI/CD workflow powered by GitHub Actions and Vercel.


### Pull Requests

Pull Request trigger a series of code quality checks: code formatting, code linting, type check, architecture linting, and unit tests.

### Deployment

Any pushes to the `main` branch are automatically deployed to production.

Any pushes to non-`main` branches trigger a deployment to a preview environment. Vercel will comment a link to the environment on the PR. Vercel will provision a new database branch for each of these preview environments.

Database changes are handled by migration scripts in `db/migrations`. Any new generated migration scripts will be applied on deployment to vercel.
