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
        console.log('credential', credentials)
        // credentails: csrfToken, email, password, callbackUrl
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const authUrl = BACKEND_URL.concat('auth')

        const res = await fetch(authUrl, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          }
        })

        const result = await res.json()
        return { ...result.data }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('callback jwt', user)
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      console.log('callback session', token)
      session.user = token.user as any
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions)
