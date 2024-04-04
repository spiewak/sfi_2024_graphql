import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
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
  async films(@Ctx() context) {
    return await context.dataSources.starWarsService.getFilms();
  }

  @Query(() => Film)
  async film(@Arg("id", () => Int) id: number, @Ctx() context) {
    return await context.dataSources.starWarsService.getFilm(id);
  }

  @FieldResolver({ complexity: 10 })
  async characters(@Root() film: Film, @Ctx() context) {
    return await context.dataSources.starWarsService.getCharactersByIds(
      film.charactersIds
    );
  }
}

export default FilmResolver;
