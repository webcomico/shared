import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Comment')
@Directive('@key(fields: "id")')
export class CommentFragments {
  @Field(() => ID)
  id: string;
}
