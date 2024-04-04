import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import Film from "../schema/film.schema";
import StarWarsService from "../services/star-wars.service";

@Resolver((type) => Film)
class FilmResolver implements ResolverInterface<Film> {
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

  @FieldResolver()
  characters(@Root() film: Film) {
    const starWarsService = new StarWarsService();
    return starWarsService.getCharactersByIds(film.charactersIds);
  }
}

export default FilmResolver;
