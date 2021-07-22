import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Resident {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;
}
