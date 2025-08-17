import { OpenAPIHono } from '@hono/zod-openapi'
import type { AppBindings } from '@/types'

import auth from './auth/auth.routes'
import todos from './todos/todos.routes'

export function loadRoutes(app: OpenAPIHono<AppBindings>) {
  app.route('/auth', auth)
  app.route('/todos', todos)
}
