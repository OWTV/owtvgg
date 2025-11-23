# OWTV Web & CMS

The main web application for OWTV.gg.

## 🏗 Architecture (FSD)

This project follows [Feature-Sliced Design](https://feature-sliced.design/) methodology to ensure scalability.

> **Note:** The architecture is enforced by `steiger`. Run `bun run check:fsd` to validate your structure.

## 🗄️ Database & Migrations

Payload CMS manages the database schema via migrations found in `db/migrations`.

To generate a migration after changing a Collection in `src/entities/*/model/collection.ts`:

```bash
bun run payload migrate:create
```

To apply pending migrations:

```bash
bun run payload migrate
```
