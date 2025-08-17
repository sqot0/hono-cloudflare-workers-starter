import { TodosService } from './todos.service'
import { todosRoutes } from './todos.schema'
import { createRouter } from '@/lib/router'

const todos = createRouter()

todos.openapi(todosRoutes.list, async (c) => {
  const service = new TodosService(c)
  const data = await service.getTodos()
  return c.json({ data })
})

todos.openapi(todosRoutes.get, async (c) => {
  const service = new TodosService(c)
  const data = await service.getTodo(c.req.param('id'))
  return c.json({ data })
})

todos.openapi(todosRoutes.create, async (c) => {
  const service = new TodosService(c)
  const data = await c.req.json()
  const createdTodo = await service.createTodo(data)
  return c.json({ data: createdTodo }, 201)
})

todos.openapi(todosRoutes.update, async (c) => {
  const service = new TodosService(c)
  const data = await c.req.json()
  const result = await service.updateTodo(c.req.param('id'), data)
  return c.json({ data: result }, 200)
})

todos.openapi(todosRoutes.delete, async (c) => {
  const service = new TodosService(c)
  await service.deleteTodo(c.req.param('id'))
  return c.json({ message: 'Todo deleted successfully' }, 200)
})

export default todos
