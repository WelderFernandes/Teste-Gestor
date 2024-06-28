import { Authenticate } from '@/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  strategy: 'jwt',
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if(!credentials) return null
          const user = await Authenticate(credentials);
            console.log("🚀 ~ authorize: ~ 1:", user)
          return  user
      },
      // callbacks: {
      //   async session({ session, user, token }) {
      //     console.log("🚀 ~ session ~ 4:", user)
      //     session.user = {
      //       ...session.user,
      //       id: user.id,
      //       token: token
      //     }
      //     return session
      //   },
      // }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("🚀 ~ session ~ token:", token)
      session.user = token.user.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  }
});

export { handler as GET, handler as POST };

