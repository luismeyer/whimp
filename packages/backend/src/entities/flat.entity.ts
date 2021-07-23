import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Flat {
  @Field()
  id!: string;

  @Field({ nullable: true })
  floor?: number;

  type = "Flat";
}
