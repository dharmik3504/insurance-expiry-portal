import authOptions from "@/lib/auth";
import NextAuth from "next-auth";

// interface session extends DefaultSession {
//   user: DefaultUser & {
//     googleAccessToken?: string;
//   };
// }
// interface jwt extends JWT {
//   googleAccessToken?: string;
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
