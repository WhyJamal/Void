import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { slugifyText } from "@/lib/slug";

async function createDefaultWorkspace(email: string, name?: string | null, userId?: string) {
  if (userId) {
    const existing = await prisma.organization.findFirst({
      where: { ownerId: userId },
      select: { id: true },
    });

    if (existing) return existing.id;
  }

  const slugBase = slugifyText(name || email.split("@")[0]);
  let slug = slugBase;
  let counter = 2;

  while (await prisma.organization.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${counter}`;
    counter += 1;
  }

  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : await prisma.user.findUnique({ where: { email } });

  if (!user) return null;

  const org = await prisma.organization.create({
    data: {
      name: `${name || email.split("@")[0]} workspace`,
      slug,
      ownerId: user.id,
      members: {
        create: {
          user: { connect: { id: user.id } },
          role: "OWNER",
        },
      },
    },
  });

  return org.id;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          const createdUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email!,
              password: "",
            },
          });

          await createDefaultWorkspace(createdUser.email, createdUser.name, createdUser.id);
        } else {
          await createDefaultWorkspace(existingUser.email, existingUser.name, existingUser.id);
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user && account?.provider === "credentials") {
        token.id = user.id;
      }

      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
