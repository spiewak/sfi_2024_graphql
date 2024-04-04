import { buildSchema } from "type-graphql";
import CharacterResolver from "../resolvers/character.resolver";
import FilmResolver from "../resolvers/film.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [CharacterResolver, FilmResolver],
  });
