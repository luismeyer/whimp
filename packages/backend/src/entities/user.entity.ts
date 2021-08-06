import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
export class User {
  constructor(user: Partial<User>) {
    this.id = user.id ?? v4();
    this.token = user.token ?? "";
    this.email = user.email ?? "";

    this.firstname = user.firstname ?? "";
    this.lastname = user.lastname ?? "";

    this.floor = user.floor;
    this.street = user.street ?? "";
    this.houseNumber = user.houseNumber ?? "";
    this.postalCode = user.postalCode ?? "";
  }

  @Field()
  id!: string;

  email!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field({ nullable: true })
  floor?: number;

  token?: string;

  street!: string;

  houseNumber!: string;

  postalCode!: string;
}
