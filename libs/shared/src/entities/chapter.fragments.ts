import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Chapter')
@Directive('@key(fields: "id")')
export class ChapterFragments {
  @Field(() => ID)
  id: string;
}
