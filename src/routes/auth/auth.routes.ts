import { createRouter } from '@/lib/router'

const router = createRouter()

router.all('/**', (c) => {
  return c.get('auth').handler(c.req.raw)
})

export default router
