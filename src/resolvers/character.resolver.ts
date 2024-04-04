import { Arg, Query, Resolver } from "type-graphql";
import Character, { GenderEnum } from "../schema/character.schema";
import StarWarsService from "../services/star-wars.service";

@Resolver()
class CharacterResolver {
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
}

export default CharacterResolver;
