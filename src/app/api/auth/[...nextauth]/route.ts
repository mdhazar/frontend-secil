import NextAuth from "next-auth";
import type { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;

        try {
          const res = await fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: (credentials as { username: string; password: string })
                .username,
              password: (credentials as { username: string; password: string })
                .password,
            }),
          });

          if (!res.ok) return null;
          const data = (await res.json()) as { token?: string };
          if (data && typeof data.token === "string" && data.token.length > 0) {
            return {
              id: data.token,
              accessToken: data.token,
            } as User;
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (
        user &&
        "accessToken" in user &&
        typeof (user as User).accessToken === "string"
      ) {
        token.accessToken = (user as User).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
