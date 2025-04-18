import dbConnect from "@/db/db";
import { UserModel } from "@/model/user";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: JWT) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
      // session.user.googleAccessToken = token.googleAccessToken;
      // session.user.uid = token.uid;
      session.user = token.user as any;
      //@ts-expect-error  des
      session.accessToken = token.accessToken;
      //@ts-expect-error  des
      session.error = token.error;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const { email } = user;

        await dbConnect();

        const userRes = await UserModel.findOne({
          email,
        });

        // token.googleAccessToken = account.access_token;
        // token.uid = userRes._id;
        // token.uid = user;

        //@ts-ignore
        user.uid = userRes._id;
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at || 0) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
