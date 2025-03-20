import NextAuth from "next-auth"
<<<<<<< HEAD
=======
import GoogleProvider from "next-auth/providers/google"
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
<<<<<<< HEAD
=======
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
>>>>>>> 53fdfb42e21bb902f8308ca68c3b9abf095e991d
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Admin credentials check
        if (
          credentials?.email === "admin@heepl.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "1",
            email: credentials.email,
            name: "Admin User",
          }
        }
        return null
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }