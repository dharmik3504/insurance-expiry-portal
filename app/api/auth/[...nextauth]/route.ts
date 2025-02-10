import dbConnect from "@/db/db";
import { UserModel } from "@/model/user";
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
          access_type: "offline", // Ensures refresh token is provided
          prompt: "consent", // Forces user to approve permissions every time
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
        const { name, email, picture } = profile;
        await dbConnect();
        const user = await UserModel.find({
          email,
        });

        if (user.length == 0) {
          await UserModel.create({
            Name: name,
            email,
            photo: picture,
          });
        }

        return true; // Do different verification for other providers that don't have `email_verified`
      }
      return false;
    },
    async session({ session, token }) {
      session.user.googleAccessToken = token.googleAccessToken;
      session.user.uid = token.uid;
      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account && user) {
        const { email } = user;

        await dbConnect();

        const userRes = await UserModel.findOne({
          email,
        });

        token.googleAccessToken = account.access_token;
        token.uid = userRes._id;
        // token.uid = user;
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
