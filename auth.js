import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import Google from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";
import { post } from "@/lib/api";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID,
        client_secret: process.env.AUTH_GOOGLE_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }
    token.error = "";
    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: error,
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
  callbacks: {
    async jwt({ token, account, user }) {
      console.log(token);
      if (account && user) {
        token.user = user;
        token.access_token = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.refresh_token = account.refresh_token;

        try {
          const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.image,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/first_login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token.access_token,
              },
              body: JSON.stringify(data),
            }
          );
          if (!response.ok) {
            throw Error("First login failed");
          }
          return token;
        } catch (error) {
          throw Error(`API POST request failed: ${error.message}`);
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        token.error = "";
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.access_token = token.access_token;
        session.error = token.error;
      }
      return session;
    },
  },
  debug: true,
});
