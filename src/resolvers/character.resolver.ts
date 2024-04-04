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
import Character, { GenderEnum } from "../schema/character.schema";
import StarWarsService from "../services/star-wars.service";
import { Authorized } from "../decorators/authorized";

@Resolver((type) => Character)
class CharacterResolver implements ResolverInterface<Character> {
  @Query(() => [Character])
  async characters(@Ctx() context) {
    return await context.dataSources.starWarsService.getCharacters();
  }

  @Query(() => Character)
  async character(@Arg("id") id: number, @Ctx() context) {
    return await context.dataSources.starWarsService.getCharacter(id);
  }

  @FieldResolver()
  async films(@Root() character: Character, @Ctx() context) {
    return await context.dataSources.starWarsService.getFilmsByIds(
      character.filmsIds
    );
  }

  @Authorized()
  @FieldResolver((type) => Int)
  salary() {
    return Math.floor(Math.random() * 1000000);
  }
}

export default CharacterResolver;
