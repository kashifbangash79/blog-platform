// src/post/post.resolver.ts
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { BlogService } from '../services/blog.service';
import { Post } from '../entities/post.entity';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.blogService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('input') input: CreatePostInput) {
    const post = await this.blogService.create(input);
    pubSub.publish('postCreated', { postCreated: post });
    return post;
  }

  @Mutation(() => Post)
  async updatePost(@Args('id', { type: () => String }) id: string, @Args('input') input: UpdatePostInput) {
    const post = await this.blogService.update(id, input);
    pubSub.publish('postUpdated', { postUpdated: post });
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => String }) id: string) {
    const result = await this.blogService.delete(id);
    if (result) {
      pubSub.publish('postDeleted', { postDeleted: id });
    }
    return result;
  }

  @Subscription(() => Post)
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }

  @Subscription(() => Post)
  postUpdated() {
    return pubSub.asyncIterator('postUpdated');
  }

  @Subscription(() => String)
  postDeleted() {
    return pubSub.asyncIterator('postDeleted');
  }
}
