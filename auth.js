import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { Pool } from "pg";
import PostgresAdapter from "@/lib/adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return {
    adapter: PostgresAdapter(pool),
    // Custom cookie configuration

    providers: [
      Google({
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
          },
        },
      }),
    ],
    cookies: {
      sessionToken: {
        name: "authjs.session-token",
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Disable secure in development
          sameSite: "lax",
        },
      },
    },
    debug: true,
  };
});
