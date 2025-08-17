import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    poolOptions: {
      workers: {
        wrangler: {
          configPath: './wrangler.jsonc',
        },
      },
    },
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
