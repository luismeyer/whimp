import { Field, InputType } from 'type-graphql';

import { User } from '../entities/user.entity';

@InputType()
export class RegisterUserInput implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  street!: string;

  @Field()
  houseNumber!: string;

  @Field()
  postalCode!: string;

  @Field()
  floor!: number;
}
