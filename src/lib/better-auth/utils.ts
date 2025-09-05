import { scryptSync } from 'crypto'

//faster hashing
export const hash = async (password: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const key = scryptSync(password.normalize('NFKC'), saltHex, 64, {
    N: 16384,
    r: 16,
    p: 1,
    maxmem: 128 * 16384 * 16 * 2,
  })

  const keyHex = Array.from(key)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `${saltHex}:${keyHex}`
}

//faster verifying
export const verify = async (data: { hash: string; password: string }) => {
  const [saltHex, keyHex] = data.hash.split(':')

  const targetKey = scryptSync(data.password.normalize('NFKC'), saltHex, 64, {
    N: 16384,
    r: 16,
    p: 1,
    maxmem: 128 * 16384 * 16 * 2,
  })

  const targetKeyHex = Array.from(targetKey)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return targetKeyHex === keyHex
}
