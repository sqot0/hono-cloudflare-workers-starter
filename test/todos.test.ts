import app from '@/index'
import { describe, it, expect } from 'vitest'
import { mockUser } from './mockUser'
import { env } from 'cloudflare:test'

// Helper to get auth token
async function getAuthToken() {
  const res = await app.request(
    '/auth/sign-in/email',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: mockUser.email,
        password: mockUser.password,
        callbackURL: '',
        rememberMe: true,
      }),
    },
    env,
  )
  const data = await res.json()
  return data.token
}

describe.sequential('Todos Endpoints', () => {
  let token: string
  let createdTodoId: string

  it('should authenticate and get token', async () => {
    token = await getAuthToken()
    expect(token).toBeDefined()
  })

  it('should create a new todo', async () => {
    const res = await app.request(
      '/todos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: 'Test Todo',
          completed: false,
        }),
      },
      env,
    )
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.data).toBeDefined()
    expect(data.data.title).toBe('Test Todo')
    createdTodoId = data.data.id
  })

  it('should list todos', async () => {
    const res = await app.request(
      '/todos',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      env,
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('should get a todo by id', async () => {
    const res = await app.request(
      `/todos/${createdTodoId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      env,
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.data.id).toBe(createdTodoId)
  })

  it('should update a todo', async () => {
    const res = await app.request(
      `/todos/${createdTodoId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: true,
        }),
      },
      env,
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.data.completed).toBe(true)
  })

  it('should delete a todo', async () => {
    const res = await app.request(
      `/todos/${createdTodoId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      env,
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.message).toBeDefined()
  })
})
