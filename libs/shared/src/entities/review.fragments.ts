import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Review')
@Directive('@key(fields: "id")')
export class ReviewFragments {
  @Field(() => ID)
  id: string;
}
