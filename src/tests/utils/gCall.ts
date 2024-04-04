import { GraphQLSchema, graphql } from "graphql";
import { Maybe } from "type-graphql";
import { createSchema } from "../../utils/createSchema";
import StarWarsService from "../../services/star-wars.service";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

export const gCall = async ({ source, variableValues }: Options) => {
  let schema: GraphQLSchema;
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      dataSources: {
        starWarsService: new StarWarsService(),
      },
    },
  });
};
