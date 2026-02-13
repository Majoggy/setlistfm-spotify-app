import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

// Workaround: NextAuth resolves the callback URL from the request origin,
// which may be "localhost" even when AUTH_URL is "127.0.0.1". Spotify rejects
// localhost redirect URIs, so we rewrite the redirect_uri in the token
// exchange to match AUTH_URL.
const CALLBACK_URL = `${process.env.AUTH_URL}/api/auth/callback/spotify`;
const originalFetch = globalThis.fetch;
globalThis.fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  const urlStr =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : (input as Request).url;
  if (urlStr.includes("accounts.spotify.com/api/token") && init?.body) {
    const params =
      init.body instanceof URLSearchParams
        ? init.body
        : new URLSearchParams(String(init.body));
    params.set("redirect_uri", CALLBACK_URL);
    return originalFetch(input, { ...init, body: params });
  }
  return originalFetch(input, init as RequestInit);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/authorize?scope=playlist-modify-public+playlist-modify-private",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
