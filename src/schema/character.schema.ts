import { registerDecorator } from "class-validator";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import Film from "./film.schema";

export enum GenderEnum {
  FEMALE = "female",
  MALE = "male",
  NA = "n/a",
}

registerEnumType(GenderEnum, { name: "GenderEnum" });

@ObjectType()
class Character {
  @Field()
  name: string;

  @Field()
  height: number;

  @Field({ nullable: true })
  gender?: GenderEnum;

  @Field(() => [Film], { nullable: true })
  films: Film[];

  filmsIds: number[];
}

export default Character;
