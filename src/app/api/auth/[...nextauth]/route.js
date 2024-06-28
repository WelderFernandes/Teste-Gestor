import { Authenticate } from '@/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

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
           cookies().set('token-access', user.result.access_token)
          return  user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // session.user = {
      //   ...session.user,
      //   access_token: token.user.result.access_token
      // }
      console.log("🚀 ~ session ~ token:", token)
      session.user = token.user.user;
      session.user.access_token = token.user.result.access_token
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

