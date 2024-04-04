import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { Request, Response } from "express";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import FilmResolver from "./resolvers/film.resolver";
import CharacterResolver from "./resolvers/character.resolver";
import StarWarsService from "./services/star-wars.service";

export interface ContextValue {
  req: Request;
  res: Response;
  dataSources: {
    starWarsService: StarWarsService;
  };
}

export const listen = async (port: number) => {
  const schema = await buildSchema({
    resolvers: [FilmResolver, CharacterResolver],
  });

  const server = new ApolloServer({ schema });

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
