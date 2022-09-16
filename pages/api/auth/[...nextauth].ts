import { createNextState } from '@reduxjs/toolkit'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { BACKEND_URL } from '../../../data/constants'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        // credentails: csrfToken, email, password, callbackUrl
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const authUrl = BACKEND_URL.concat('auth')

        try {
          const res = await fetch(authUrl, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-type': 'application/json'
            }
          })

          const result = await res.json()
          return { ...result.data }
        } catch (error) {
          throw new Error(JSON.stringify(error))
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions)
