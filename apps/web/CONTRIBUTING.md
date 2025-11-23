# Contributing Guide for OWTV.gg

## 🏗️ Architecture: Feature-Sliced Design

We follow **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** strictly. This architecture helps us keep the codebase loosely coupled and scalable.

### Directory Structure

- **`src/app`**: This acts as the **Pages** layer, due to Next.js App Router restrictions.
- **`src/widgets`**: UI components that combine multiple Features and Entities.
- **`src/features`**: Individual user interactions (naming should follow _subject-verb-object_).
- **`src/entities`**: Business domain models.
- **`src/shared`**: Reusable infrastructure code, UI kit, and libraries.

When deciding where to put new logic, follow this hierarchy:

1.  **/features**: Default to putting logic into a specific feature.
2.  **/entities**: If logic is used by _multiple_ features, move it to the relevant entity.
3.  **/widgets**: If logic requires combining multiple features or entities, put it in a widget.
4.  **/shared**: If logic has no business logic and is used by multiple entities, move it to shared.

---

## 💻 Coding Standards

### 1. UI Components

- Leverage `shadcn/ui` components wherever possible.

### 2. Database Access

- All database interactions must go through a dedicated methods in the relevant entity repository file.
- Never call Payload or DB methods directly inside a Page or Component.

### 3. Mutations

- Use `useOptimistic` for simple success/failure actions (e.g., toggling a checkbox) to provide instant UI feedback.
- Use `useActionState` for complex forms that require server-side validation and handling multiple failure states.

### 4. Validation

- Never trust input data. Validate all data with Zod in any server actions.
- Do not write manual TypeScript interfaces for your forms. Export the type directly from the Zod schema using z.infer.

### 5. Testing

- Each logic file should have an associated `__tests__/*.spec.ts` file with relevant unit tests
- Make use of vitest auto-mocking with `__mocks__` directories to keep tests isolated.

---

## 📦 Database & Migrations

We use Payload CMS with PostgreSQL.

To support Payload CMS, a route group `src/app/(payload)/` is used to group all separate Payload CMS (and Better Auth) code from application code. Any user-facing pages should be created within the `src/app/(frontend)/` route group.

Any change to the data model requires a migration.

1.  **Modify the Config:**
    Update your Payload collections in `src/entities/*/model/collection.ts`.

2.  **Update Payload CMS:**

```bash
# Create a SQL migration file based on your changes
bunx payload migrate:create
# Update the TypeScript interfaces to match the new schema
bunx payload generate:types
```

---

## 🧪 Quality Assurance

- A `lefthook` git hook is configured to automatically format your staged files on commit.
- Type Safety, Linting, Formatting, Architecture, and Unit Tests are automatically checked on each PR.
- We have not enforced any code coverage. However, you should write tests that cover major logic flows.
