import { Arg, Query, Resolver } from "type-graphql";
import Film from "../schema/film.schema";
import StarWarsService from "../services/star-wars.service";

@Resolver()
class FilmResolver {
  @Query(() => [Film])
  films() {
    const starWarsService = new StarWarsService();
    return starWarsService.getFilms();
  }

  @Query(() => Film)
  film(@Arg("id") id: number) {
    const starWarsService = new StarWarsService();
    return starWarsService.getFilm(id);
  }
}

export default FilmResolver;
