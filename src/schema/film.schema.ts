import { Field, ObjectType } from "type-graphql";

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
}

export default Film;
