import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";

import { flatById } from "../services/flat.service";
import { Flat } from "./flat.entity";

@ObjectType()
export class User {
  constructor(user: Partial<User>) {
    this.id = user.id ?? v4();
    this.token = user.token ?? "";
    this.email = user.email ?? "";

    this.firstname = user.firstname ?? "";
    this.lastname = user.lastname ?? "";

    this.flatId = user.flatId;
  }

  @Field()
  id!: string;

  email!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  flatId?: string;

  @Field(() => Flat, { nullable: true })
  flat() {
    return this.flatId ? flatById(this.flatId) : undefined;
  }

  token?: string;

  type: "User" = "User";
}
