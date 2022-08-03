import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Story')
@Directive('@key(fields: "id")')
export class StoryFragments {
  @Field(() => ID)
  id: string;
}
