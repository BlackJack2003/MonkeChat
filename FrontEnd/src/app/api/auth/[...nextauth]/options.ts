import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import  CredentialsProvider  from "next-auth/providers/credentials";
const crypto = require('crypto');
export function hashString(str:String) {
	// Create a hash object
	const hash = crypto.createHash('sha256');

	// Update the hash object with the string
	hash.update(str);

	// Generate the hash digest in hexadecimal format
	return hash.digest('hex');
}

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
		if(credentials==undefined)
			return null;
        const response = await fetch("http://127.0.0.1:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...credentials,password:hashString(credentials?.password)}),
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