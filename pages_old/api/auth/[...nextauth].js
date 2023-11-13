import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

let authData = new Object();

function getObject(theObject) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = getObject(theObject[i]);
    }
  } else {
    for (var prop in theObject) {
      //console.log(prop + ': ' + theObject[prop]);
      if (prop == "user") {
        return theObject;
        // }
      }
      if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
        result = getObject(theObject[prop]);
    }
  }
  return result;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        const data = new URLSearchParams();
        data.append("apiKey", process.env.TM_HYDEV2_API_KEY);
        data.append("loginID", credentials.email);
        data.append("password", credentials.password);

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: data.toString(),
        };

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(
          `https://accounts.eu1.gigya.com/accounts.login`,
          fetchOptions
        );

        // If no error and we have user data, return it
        if (res.ok) {
          let account = await res.json();

          return { account };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      const tokenData = new URLSearchParams();
      //data.append('client_id',process.env.TM_HYDEV2_API_KEY);
      tokenData.append("client_id", "trusted_client");
      tokenData.append("client_secret", "secret");
      tokenData.append("grant_type", "client_credentials");

      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          grant_type: "client_credentials",
        },
        grant_type: "client_credentials",
        body: tokenData.toString(),
      };
      const res = await fetch(
        `${process.env.SERVER_BASE_URL}authorizationserver/oauth/token`,
        fetchOptions
      );

      let tokenResponse = await res.json();

      if (token) {
        session.user = getObject(token);
        authData = getObject(token);
      }
      // Send properties to the client, like an access_token from a provider.
      return {
        session: {
          access_token: tokenResponse ? tokenResponse : "no_access_token",
          user: authData.user.account ? authData.user.account : undefined,
        },
      };
    },
    async jwt(token, account) {
      authData = token?.token?.user?.account;
      return token;
    },
  },
  secret: process.env.SECRET,
};
export default NextAuth(authOptions);
