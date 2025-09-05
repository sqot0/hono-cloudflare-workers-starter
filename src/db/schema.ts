import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { user } from './auth.schema'

export * from './auth.schema'

export const todo = sqliteTable('todo', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description'),
  completed: integer('completed', { mode: 'boolean' })
    .$defaultFn(() => false)
    .notNull(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
})
