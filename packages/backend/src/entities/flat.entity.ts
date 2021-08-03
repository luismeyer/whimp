import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Flat {
  @Field()
  id!: string;

  @Field({ nullable: true })
  floor?: number;

  street!: string;

  houseNumber!: string;

  postalCode!: string;

  type: "Flat" = "Flat";
}
