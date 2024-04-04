import {
  Arg,
  Ctx,
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
  async films(@Ctx() context) {
    return await context.dataSources.starWarsService.getFilms();
  }

  @Query(() => Film)
  async film(@Arg("id") id: number, @Ctx() context) {
    return await context.dataSources.starWarsService.getFilm(id);
  }

  @FieldResolver()
  async characters(@Root() film: Film, @Ctx() context) {
    return await context.dataSources.starWarsService.getCharactersByIds(
      film.charactersIds
    );
  }
}

export default FilmResolver;
