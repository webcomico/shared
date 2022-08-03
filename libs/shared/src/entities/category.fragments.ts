import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Category')
@Directive('@key(fields: "id")')
export class CategoryFragments {
  @Field(() => ID)
  id: string
}
