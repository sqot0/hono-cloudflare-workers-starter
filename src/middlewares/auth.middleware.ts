import { Context, Next } from 'hono'
import { createAuth } from '@/lib/better-auth'

export const authMiddleware = async (c: Context, next: Next) => {
  const auth = createAuth(c.env, c.get("db"))
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)

  return next()
}

export default authMiddleware
