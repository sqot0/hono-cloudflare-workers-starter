import { Context, Next } from 'hono'
import { createDatabase } from '@/db'

export const dbMiddleware = async (c: Context, next: Next) => {
  const db = createDatabase(c.env)
  c.set('db', db)

  return next()
}
