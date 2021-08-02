import { Authorized, Ctx, Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";

import { Context } from "../";
import { RegisterUserInput } from "../graphql/register-user.input";
import { flatById } from "../services/flat.service";
import { Flat } from "./flat.entity";

@ObjectType()
export class User {
  constructor(input?: RegisterUserInput, token?: string) {
    this.id = v4();
    this.token = token ?? "";
    this.email = input?.email ?? "";
    this.firstname = input?.firstname ?? "";
    this.lastname = input?.lastname ?? "";
    this.flatId = "";
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

  type = "User";
}
