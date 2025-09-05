import { createRoute } from '@hono/zod-openapi'
import { Z } from 'node_modules/better-auth/dist/shared/better-auth.DOq11zLi'
import { zoom } from 'node_modules/better-auth/dist/social-providers/index.cjs'
import * as z from 'zod'

const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
})

const createTodoSchema = todoSchema.omit({ id: true, createdAt: true, updatedAt: true })
const updateTodoSchema = createTodoSchema.partial()

export interface TodoTypes {
  createTodo: z.infer<typeof createTodoSchema>
  updateTodo: z.infer<typeof updateTodoSchema>
}

export const todosRoutes = {
  list: createRoute({
    method: 'get',
    path: '/',
    tags: ['Todos'],
    security: [{ Bearer: [] }],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({ data: z.array(todoSchema) }),
          },
        },
        description: "List of user's todos",
      },
    },
  }),
  get: createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Todos'],
    security: [{ Bearer: [] }],
    request: {
      params: z.object({ id: z.uuid() }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({ data: todoSchema }),
          },
        },
        description: 'Todo details',
      },
    },
  }),
  create: createRoute({
    method: 'post',
    path: '/',
    tags: ['Todos'],
    security: [{ Bearer: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createTodoSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: z.object({ data: todoSchema }),
          },
        },
        description: 'Todo created successfully',
      },
    },
  }),
  update: createRoute({
    method: 'patch',
    path: '/{id}',
    tags: ['Todos'],
    security: [{ Bearer: [] }],
    request: {
      params: z.object({ id: z.uuid() }),
      body: {
        content: {
          'application/json': {
            schema: updateTodoSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({ data: todoSchema }),
          },
        },
        description: 'Todo updated successfully',
      },
    },
  }),
  delete: createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Todos'],
    security: [{ Bearer: [] }],
    request: {
      params: z.object({ id: z.uuid() }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({ message: z.string() }),
          },
        },
        description: 'Todo deleted successfully',
      },
    },
  }),
}
