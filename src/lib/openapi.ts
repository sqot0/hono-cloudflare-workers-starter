import { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import type { Bindings, Variables } from '@/types'

export default function configureOpenAPI(app: OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>) {
  app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
      title: 'Hono API',
      version: '1.0.0',
      description: 'API documentation',
    },
  })

  app.get('/scalar', Scalar({ url: '/openapi.json' }))
}
