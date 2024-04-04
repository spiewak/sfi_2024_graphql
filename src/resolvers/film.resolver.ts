import { Query, Resolver } from "type-graphql";
import Film from "../schema/film.schema";

@Resolver()
class FilmResolver {
  @Query(() => [Film])
  films() {
    return [
      {
        title: "Inception",
        director: "Christopher Nolan",
        producer: "Emma Thomas",
        releaseDate: "2010-07-16",
      },
      {
        title: "Interstellar",
        director: "Christopher Nolan",
        producer: "Emma Thomas",
        releaseDate: "2014-11-07",
      },
    ];
  }
}

export default FilmResolver;
