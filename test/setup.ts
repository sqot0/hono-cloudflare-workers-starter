import { afterAll, beforeAll } from 'vitest'
import { env } from 'cloudflare:test'
import { createDatabase } from '@/db'
import { mockUser } from './mockUser'
import { eq } from 'drizzle-orm'
import app from '@/index'
import * as schema from '@/db/schema'

beforeAll(async () => {
  const db = createDatabase(env)

  await new Promise((r) => setTimeout(r, 500))

  await db.delete(schema.user).where(eq(schema.user.email, mockUser.email))

  // Sign up the mock user before tests
  const res = await app.request(
    '/auth/sign-up/email',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
        image: '',
        callbackURL: '',
        rememberMe: true,
      }),
    },
    env,
  )

  if (res.status !== 200) {
    throw new Error(`Failed to sign up mock user: ${res.status}`)
  }
})

afterAll(async () => {
  const db = createDatabase(env)

  await new Promise((r) => setTimeout(r, 500))

  await db.delete(schema.user).where(eq(schema.user.email, mockUser.email))
})
