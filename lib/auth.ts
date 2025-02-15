import dbConnect from "@/db/db";
import { UserModel } from "@/model/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
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
        //@ts-expect-error  des

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
      //@ts-expect-error  des

      session.user.googleAccessToken = token.googleAccessToken;
      //@ts-expect-error  des

      session.user.uid = token.uid;
      return session;
    },
    async jwt({ token, account, user }) {
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

export default authOptions;
