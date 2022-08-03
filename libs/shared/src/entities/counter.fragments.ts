import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Counter')
@Directive('@key(fields: "id")')
export class CounterFragments {
  @Field(() => ID)
  id: string;
}
