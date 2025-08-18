import { BetterAuthOptions } from 'better-auth'
import { openAPI, bearer } from 'better-auth/plugins'
import { hash, verify } from './utils'

export const betterAuthOptions: BetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    password: {
      hash,
      verify
    }
  },
  /*
        socialProviders: {
            google: {
                clientId: env.GOOGLE_CLIENT_ID!,
                clientSecret: env.GOOGLE_CLIENT_SECRET!,
            },
        },
    */
  plugins: [
    openAPI({
      path: '/scalar',
    }),
    bearer(),
  ],
}
