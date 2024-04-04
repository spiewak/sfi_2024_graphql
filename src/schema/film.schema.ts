import { Field, ObjectType } from "type-graphql";
import Character from "./character.schema";

@ObjectType()
class Film {
  @Field()
  title: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  releaseDate: string;

  @Field(() => [Character], { nullable: true })
  characters: Character[];

  charactersIds: number[];
}

export default Film;
