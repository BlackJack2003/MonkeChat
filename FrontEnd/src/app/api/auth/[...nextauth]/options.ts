import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import  CredentialsProvider  from "next-auth/providers/credentials";

const options:NextAuthOptions={
	providers:[
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name:'Credentials',
			credentials:{
				username:{
					label:"Username:",
					type:"text",
					placeholder:"Username"
				},
				password:{
					label:"Password:",
					type:"password",
					placeholder:"password"
				}
			},
      async authorize(credentials) {
        const response = await fetch("http://127.0.0.1:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const user = await response.json();
          return user;
        }

        return null;
      },
		})
	],
	pages: {
		signIn: '/',
	  }
}

export default options;