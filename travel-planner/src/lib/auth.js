import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      // Redirect to /complete-the-signup after sign-in
      // if (url.startsWith("/")) return `${baseUrl}/complete-the-signup`;
      // // Allows callback URLs on the same origin
      // if (new URL(url).origin === baseUrl) return url;

      return `${baseUrl}/home`;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.googleImage = token.picture;
      }
      return session;
    },
  },
};
