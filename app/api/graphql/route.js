import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import merge from "lodash.merge";
import {
  Query as BloomreachQueries,
  BloomreachTypes,
  BloomreachInputTypes,
  resolvers as BloomreachResolvers,
} from "./schema/bloomreach";
import {
  HybrisTypes,
  HybrisInputTypes,
  Query as HybrisOCCQueries,
  Mutation as HybrisOCCMutations,
  resolvers as HybrisOCCResolvers,
} from "./schema/hybrisOCC";
import { typeDefs as SharedTypes } from "./schema/sharedTypes";
import BloomreachSuggestAPI from "./datasources/bloomreach/suggestAPI";
import BloomreachCoreAPI from "./datasources/bloomreach/coreAPI";
import BloomreachPathwaysAPI from "./datasources/bloomreach/pathwaysAPI";
import BloomreachRelatedAPI from "./datasources/bloomreach/relatedAPI";
import HybrisAPI from "./datasources/hybrisOCC/hybrisAPI";

const formatError = (formattedError, error) => {
  console.group(`*******${formattedError.extensions.code} ERROR*******`);
  console.log(`> error message: ${formattedError.message}`);
  console.log(
    `> stacktrace: ${formattedError.extensions.stacktrace.join("\n")}`
  );
  console.groupEnd();
  return formattedError;
};
const server = new ApolloServer({
  typeDefs: [
    SharedTypes,
    BloomreachQueries,
    BloomreachTypes,
    BloomreachInputTypes,
    HybrisTypes,
    HybrisInputTypes,
    HybrisOCCQueries,
    HybrisOCCMutations,
  ],
  resolvers: merge({}, BloomreachResolvers, HybrisOCCResolvers),
  formatError,
  introspection: process.env.VERCEL_ENV !== "production",
  plugins: [
    process.env.VERCEL_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => {
    return {
      req,
      dataSources: {
        bloomreachSuggestAPI: new BloomreachSuggestAPI(),
        bloomreachCoreAPI: new BloomreachCoreAPI(),
        bloomreachPathwaysAPI: new BloomreachPathwaysAPI(),
        bloomreachRelatedAPI: new BloomreachRelatedAPI(),
        hybrisAPI: new HybrisAPI(),
      },
    };
  },
});

export { handler as GET, handler as POST };
