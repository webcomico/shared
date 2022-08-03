import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Bookmark')
@Directive('@key(fields: "id")')
export class BookmarkFragments {
  @Field(() => ID)
  id: string;
}
