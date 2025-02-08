import NextAuth, {
  Account,
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

interface session extends DefaultSession {
  user: DefaultUser & {
    googleAccessToken?: string;
  };
}
interface jwt extends JWT {
  googleAccessToken?: string;
}
export const authOptions: NextAuthOptions = {
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
    async signIn({ account, profile }) {
      if (!account || !profile) {
        return false;
      }
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token }) {
      session.user.googleAccessToken = token.googleAccessToken;
      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.googleAccessToken = account.access_token;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
