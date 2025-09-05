import { createAuth } from './src/lib/better-auth'
import { betterAuth } from 'better-auth'

export const auth: ReturnType<typeof betterAuth> = createAuth(process.env)
