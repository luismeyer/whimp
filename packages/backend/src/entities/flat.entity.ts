import { Field, ID, ObjectType } from "type-graphql";

import { Resident } from "./resident.entity";

@ObjectType()
export class Flat {
  @Field(() => ID)
  id!: string;

  @Field(() => [Resident])
  residents!: Resident[];

  @Field(() => Number, { nullable: true })
  floor?: number;
}
