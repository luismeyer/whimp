import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class RegisterFlatInput {
  @Field()
  street!: string;

  @Field()
  houseNumber!: string;

  @Field()
  postalCode!: string;

  @Field()
  floor!: number;
}
