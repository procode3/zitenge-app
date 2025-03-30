import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { comparePassword } from '@/utils/password';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { username } = credentials as {
            username: string;
            password: string;
          };
          const context = await getCloudflareContext();
          const db = context.env.DB as D1Database;

          console.log(context.env.DB); // Debug
          if (!context.env.DB) {
            throw new Error('Database not found in context');
          }

          const user = await db
            .prepare(
              'SELECT id, email, name, password FROM user WHERE email = ?'
            )
            .bind(username)
            .first();

          const isPasswordValid = await comparePassword(
            credentials?.password as string,
            user?.password as string
          );
          console.log('isPasswordValid', isPasswordValid);
          if (!isPasswordValid) {
            console.log('invalid password'); // Debug
            throw new CredentialsSignin('Invalid credentials');
          }

          console.log('Query results:', user); // Debug

          // const isValidPassword = await compare(password, user.password);
          return {
            id: user?.id as string,
            email: user?.email as string,
            name: user?.name as string,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          if (error instanceof CredentialsSignin) {
            throw error;
          }
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) return true;
      return false;
    },
  },
  pages: {
    signIn: '/login',
  },
});
