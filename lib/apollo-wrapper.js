"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// if (process.env?.NEXT_SITE_URL.includes("localhost")) {
//   loadDevMessages();
//   loadErrorMessages();
// }

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.group("****apollo-wrapper.js*****");
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

function makeClient() {
  const baseUri =
    typeof window === "undefined"
      ? `${process.env.SITE_URL}/api/graphql`
      : "/api/graphql";
  const corsPolicy = typeof window === "undefined" ? "cors" : "same-origin";
  const httpLink = new HttpLink({
    uri: baseUri,
    fetchOptions: {
      mode: corsPolicy,
    },
  });
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            errorLink,
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : ApolloLink.from([errorLink, httpLink]),
    connectToDevTools: true,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
