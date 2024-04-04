import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { Request, Response } from "express";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import FilmResolver from "./resolvers/film.resolver";
import CharacterResolver from "./resolvers/character.resolver";
import StarWarsService from "./services/star-wars.service";
import { MAX_COMPLEXITY } from "./constants/graphql";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from "graphql-query-complexity";
import { createSchema } from "./utils/createSchema";

export interface ContextValue {
  req: Request;
  res: Response;
  dataSources: {
    starWarsService: StarWarsService;
  };
}

export const listen = async (port: number) => {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        requestDidStart: async () => ({
          async didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              // GraphQL schema
              schema,
              // To calculate query complexity properly,
              // check only the requested operation
              // not the whole document that may contains multiple operations
              operationName: request.operationName,
              // GraphQL query document
              query: document,
              // GraphQL query variables
              variables: request.variables,
              // Add any number of estimators. The estimators are invoked in order, the first
              // numeric value that is being returned by an estimator is used as the field complexity
              // If no estimator returns a value, an exception is raised
              estimators: [
                // Using fieldExtensionsEstimator is mandatory to make it work with type-graphql
                fieldExtensionsEstimator(),
                // Add more estimators here...
                // This will assign each field a complexity of 1
                // if no other estimator returned a value
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });

            if (complexity > MAX_COMPLEXITY) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over ${MAX_COMPLEXITY} that is the max allowed complexity.`
              );
            }
            console.log("Used query complexity points:", complexity);
          },
        }),
      },
    ],
  });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: port,
    },
    context: async ({ req, res }) => {
      return {
        req,
        res,
        dataSources: {
          starWarsService: new StarWarsService(),
        },
      };
    },
  });

  console.log(`Server ready at ${url}`);
};
