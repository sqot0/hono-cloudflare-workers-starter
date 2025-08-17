declare module 'cloudflare:test' {
  // ProvidedEnv controls the type of `import("cloudflare:test").env`
  interface ProvidedEnv {
    DATABASE_URL: string
    DATABASE_AUTH_TOKEN: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_SECRET: string
  }
  // ...or if you have an existing `Env` type...
  interface ProvidedEnv extends Env {}
}
