import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ defaultValue: false })
  published: boolean;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  published?: boolean;
}