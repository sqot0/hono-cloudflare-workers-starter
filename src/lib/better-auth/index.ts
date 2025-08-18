import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { Bindings } from '@/types'
import { createDatabase } from '@/db'
import { betterAuthOptions } from './options'

export const createAuth = (env: Bindings, db?: ReturnType<typeof createDatabase>): ReturnType<typeof betterAuth> => {
  if (!db) db = createDatabase(env)
  return betterAuth({
    basePath: '/auth',
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: 'sqlite',
    }),
    ...betterAuthOptions,
  })
}
