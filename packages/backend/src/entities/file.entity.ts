import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class File {
  @Field()
  filename!: string;

  @Field()
  mimetype!: string;

  @Field()
  encoding!: string;
}
