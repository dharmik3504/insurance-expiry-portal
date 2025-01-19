import NextAuth, { Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export interface session extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    googleAccessToken: string;
  };
}
export interface jwt extends JWT {
  token: {
    googleAccessToken: string;
  };
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account;
      profile: GoogleProfile;
    }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,

          googleAccessToken: token.googleAccessToken,
        },
      };
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.googleAccessToken = account.access_token;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
