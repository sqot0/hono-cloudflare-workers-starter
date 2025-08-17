import { HTTPException } from 'hono/http-exception'
import { eq, and, desc } from 'drizzle-orm'
import { Context } from 'hono'
import type { Bindings, Variables } from '@/types'
import { todo } from '@/db/schema'

export class TodosService {
  constructor(private c: Context<{ Bindings: Bindings; Variables: Variables }>) {}

  async getTodos() {
    const user = this.c.get('user')
    if (!user) throw new HTTPException(401, { message: 'Unauthorized' })
    const db = this.c.get('db')
    const todos = await db.select().from(todo).where(eq(todo.userId, user.id)).orderBy(desc(todo.createdAt))
    return todos
  }

  async getTodo(id: string) {
    const user = this.c.get('user')
    if (!user) throw new HTTPException(401, { message: 'Unauthorized' })
    const db = this.c.get('db')
    const todoRecord = (
      await db
        .select()
        .from(todo)
        .where(and(eq(todo.id, id), eq(todo.userId, user.id)))
    ).at(0)
    if (!todoRecord) throw new HTTPException(404, { message: 'Todo not found' })
    return todoRecord
  }

  async createTodo(data: { title: string; completed?: boolean }) {
    const user = this.c.get('user')
    if (!user) throw new HTTPException(401, { message: 'Unauthorized' })
    const db = this.c.get('db')
    const insertedTodo = await db
      .insert(todo)
      .values({ ...data, userId: user.id, completed: !!data.completed })
      .returning()
      .then(([todo]) => todo)
    return insertedTodo
  }

  async updateTodo(id: string, data: Partial<{ title: string; completed: boolean }>) {
    const user = this.c.get('user')
    if (!user) throw new HTTPException(401, { message: 'Unauthorized' })
    const db = this.c.get('db')
    const existingTodo = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, user.id)))
    if (existingTodo.length === 0) throw new HTTPException(404, { message: 'Todo not found' })
    const [updatedTodo] = await db.update(todo).set(data).where(eq(todo.id, id)).returning()
    return updatedTodo
  }

  async deleteTodo(id: string) {
    const user = this.c.get('user')
    if (!user) throw new HTTPException(401, { message: 'Unauthorized' })
    const db = this.c.get('db')
    const existingTodo = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, user.id)))
    if (existingTodo.length === 0) throw new HTTPException(404, { message: 'Todo not found' })
    await db.delete(todo).where(eq(todo.id, id))
  }
}
