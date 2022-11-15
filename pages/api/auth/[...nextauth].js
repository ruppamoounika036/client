import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        strategy: "jwt",
      },
  providers: [
    CredentialsProvider({
      name: 'my-project',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
       
      },
      
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        console.log("authorize")
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        })

        const user = await res.json();
        console.log("user",user,res.ok)
        if (!res.ok) {
          throw new Error(user.exception);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user[0];
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/signin',
    signOut:'/signout'
  },
  callbacks: {
    async jwt(params) {
      console.log("jwt",params.user)
        if (params.user?.email) {
            params.token.email = params.user.email;
            params.token.id=params.user._id;
          }
          // return final_token
          return params.token;
    },
  }

//     async session({ session, token }) {
//       session.user.accessToken = token.accessToken;
//       session.user.accessTokenExpires = token.accessTokenExpires;

//       return session;
//     },
//   },
  
});
