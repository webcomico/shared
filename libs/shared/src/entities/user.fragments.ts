import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
@Directive('@key(fields: "id")')
export class UserFragments {
  @Field(() => ID)
  id: string;
}
