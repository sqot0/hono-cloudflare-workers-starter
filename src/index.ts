import { createRouter } from '@/lib/router'

import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

import configureOpenAPI from '@/lib/openapi'
import { dbMiddleware, authMiddleware } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'
import { loadRoutes } from '@/routes'

const app = createRouter()

app.use('*', cors())
app.use('*', logger())
app.use('*', prettyJSON())

configureOpenAPI(app)
app.use('*', dbMiddleware)
app.use('*', authMiddleware)

app.onError((err, c) => {
  console.error('Error occurred:', err)
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }

  return c.json({ error: 'Internal Server Error' }, 500)
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

loadRoutes(app)

export default app
