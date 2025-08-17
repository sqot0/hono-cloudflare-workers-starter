import { createRouter } from '@/lib/router'
import { createAuth } from '@/lib/better-auth'

const router = createRouter()

router.all('/**', (c) => {
  return createAuth(c.env).handler(c.req.raw)
})

export default router
