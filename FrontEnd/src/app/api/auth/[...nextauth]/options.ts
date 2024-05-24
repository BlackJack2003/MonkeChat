import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (credentials == undefined) return null;
        const response = await fetch(`${process.env.BACKEND_API_URL}/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const user = await response.json();
          console.log("User:", user.name);
          return user;
        } else {
          const val = await response.text();
          console.error("Got val:", val);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
    // Update the session token only if the session is half expired
    updateAge: 20 * 60, // 15 minutes
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (profile == undefined || profile.email == undefined) return true;
      else {
        var response = await fetch(
          `${process.env.BACKEND_API_URL}/login/getMail`,
          {
            //send email in json
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: profile.email }),
          }
        );
        var isExist = response.json().then((x) => x.isExist) || false;
        return isExist;
      }
    },
    async session({ session }) {
      try {
        var resp = await fetch(
          `${process.env.BACKEND_API_URL}/login/sessionUserData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              serverPassword: process.env.BACKEND_KEY,
              email: session.user?.email,
            }),
          }
        );
        var user: User = await resp.json();
        session.user = user;
        return session;
      } catch (e: any) {
        console.error(e.message);
        return session;
      }
    },
  },
};

export default options;

// interface mySessionUser {
//   name: string;
//   email: string;
//   image?: string;
//   public_key?: string;
//   private_key?: string;
// }
