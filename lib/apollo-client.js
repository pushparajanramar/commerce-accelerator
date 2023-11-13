import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const errorLink = onError(({ graphQLErrors, networkError, ...rest }) => {
  console.group("--------->apollo-client.js<-------");
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions, ...rest }) =>
      console.log(
        `[GraphQL error]: Message: ${message} Code: ${extensions.code}${
          rest?.path ? `, Path: ${rest.path}` : ""
        }`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
  console.groupEnd();
});
export const { getClient } = registerApolloClient(() => {
  const baseURI = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      new HttpLink({
        uri: `${baseURI}/api/graphql`,
      }),
    ]),
    connectToDevTools: false,
  });
});
