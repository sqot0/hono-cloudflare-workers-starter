import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import { Bindings } from '@/types'

export function createDatabase(env: Bindings) {
  const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  })

  const db = drizzle(client, { schema })
  return db
}
