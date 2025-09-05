import { BetterAuthOptions } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { hash, verify } from './utils'

export const betterAuthOptions: BetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    password: {
      hash,
      verify,
    },
  },
  plugins: [
    openAPI({
      path: '/scalar',
    }),
  ],
}
