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
    // debug: true,
  };
});
