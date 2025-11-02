// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Simple in-memory user store untuk development
const users = [
  {
    id: "1",
    email: "admin@vnzcafe.com",
    password: "admin123",
    name: "VNZ Admin",
    role: "admin"
  }
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Cari user berdasarkan email
        const user = users.find(user => user.email === credentials.email);
        
        // Check jika user ada dan password cocok
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        }
        
        // Return null jika user tidak ditemukan
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
    signOut: '/',
    error: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      // Tambahkan user data ke token
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan user data ke session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  debug: true, // Enable debug di development
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };