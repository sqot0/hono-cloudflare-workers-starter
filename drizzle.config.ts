import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'turso',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
})