## Project Overview

- **Framework:** Hono (Cloudflare Workers)
- **Database:** libSQL (Turso DB) via Drizzle ORM
- **Authentication:** Better Auth
- **Validation:** Zod
- **API Docs:** Scalar (OpenAPI)
- **Testing:** Vitest

---

## Build & Test Commands

- **Install dependencies:**
  - `pnpm install` (preferred)
  - `npm install`
  - `yarn install`
- **Run development server:**
  - `pnpm dev` / `npm run dev` / `yarn dev`
- **Run tests:**
  - `pnpm test` / `npm test` / `yarn test`
- **Format code:**
  - `pnpm format` / `npm run format` / `yarn format`
- **Generate Cloudflare types:**
  - `pnpm cf-typegen` / `npm run cf-typegen` / `yarn cf-typegen`
- **Database migrations:**
  - `pnpm db:m` / `npm run db:m` / `yarn db:m`
- **Generate Drizzle schema:**
  - `pnpm db:g` / `npm run db:g` / `yarn db:g`
- **Push DB schema:**
  - `pnpm db:p` / `npm run db:p` / `yarn db:p`
- **Open Drizzle Studio:**
  - `pnpm db:s` / `npm run db:s` / `yarn db:s`
- **Generate Better Auth schema:**
  - `pnpm ba:g` / `npm run ba:g` / `yarn ba:g`

---

## Code Style Guidelines

- **Formatting:** Use Prettier via `format` script.
- **TypeScript:** All code is TypeScript. Use strict types and prefer type inference where possible.
- **Validation:** Use Zod for all input validation.
- **Environment Variables:** Define in `.env` and `.dev.vars`. Reference `.env.example` for required keys.

---

## Testing Instructions

- All tests are in the `test/` directory.
- Use Vitest for running tests.
- Test setup and mocks are provided in `test/setup.ts` and `test/mockUser.ts`.
- To run all tests: `pnpm test` (or npm/yarn equivalent).

---

## Security Considerations

- **Secrets:** Never commit `.env`, `.dev.vars`, or any real secrets.
- **Auth:** Use Better Auth for authentication. Ensure `BETTER_AUTH_SECRET` is set and kept private.
- **Database:** Use Turso DB credentials from environment variables only.
- **GitHub Actions:** Set secrets in repository settings for CI.

---

## Deployment Steps

- Ensure all environment variables are set in production.
- Run database migrations before deploying new schema changes.
- Use Wrangler for deploying to Cloudflare Workers.

---

## Additional Agent Notes

- **Route Conventions:**
  - All routes are defined in `src/routes/` and loaded via `src/routes/index.ts`.
  - Add new route folders/files as needed and import in `routes/index.ts`.
- **Middleware:**
  - All middleware is in `src/middlewares/` and exported via `src/middlewares/index.ts`.
- **Auth/DB Providers:**
  - To change DB or auth provider, update `src/lib/better-auth/index.ts` and `src/db/index.ts`.
- **Schema Generation:**
  - Use provided scripts to generate/update schemas as needed.
