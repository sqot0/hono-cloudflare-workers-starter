import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { User, Session } from 'better-auth'
import * as schema from '@/db/schema'

export type Bindings = {
  DATABASE_URL: string
  DATABASE_AUTH_TOKEN: string

  BETTER_AUTH_URL: string
  BETTER_AUTH_SECRET: string
}

export type Variables = {
  db: LibSQLDatabase<typeof schema>
  user: User | null
  session: Session | null
}

export type AppBindings = {
  Bindings: Bindings
  Variables: Variables
}
