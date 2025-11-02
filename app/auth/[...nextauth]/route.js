// app/api/auth/[...nextauth]/route.js - SIMPLIFIED
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Temporary user data - nanti diganti dengan database
const temporaryUsers = [
  {
    id: '1',
    email: 'admin@vnzcafe.com',
    password: 'admin123',
    name: 'VNZ Admin',
    role: 'admin'
  }
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Login attempt:', credentials.email)
        
        // Simple validation - dalam production gunakan database
        const user = temporaryUsers.find(u => 
          u.email === credentials.email && 
          u.password === credentials.password
        )

        if (user) {
          console.log('Login successful for:', user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }

        console.log('Login failed for:', credentials.email)
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user role to token
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Add role to session
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login
      if (url === `${baseUrl}/admin/login`) {
        return `${baseUrl}/admin/dashboard`
      }
      return url
    }
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug in development
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }