import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  adapter: PrismaAdapter(prisma),
});
