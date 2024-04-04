import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import Character, { GenderEnum } from "../schema/character.schema";
import StarWarsService from "../services/star-wars.service";

@Resolver((type) => Character)
class CharacterResolver implements ResolverInterface<Character> {
  @Query(() => [Character])
  characters() {
    const starWarsService = new StarWarsService();
    return starWarsService.getCharacters();
  }

  @Query(() => Character)
  character(@Arg("id") id: number) {
    const starWarsService = new StarWarsService();
    return starWarsService.getCharacter(id);
  }

  @FieldResolver()
  films(@Root() character: Character) {
    const starWarsService = new StarWarsService();
    return starWarsService.getFilmsByIds(character.filmsIds);
  }
}

export default CharacterResolver;
