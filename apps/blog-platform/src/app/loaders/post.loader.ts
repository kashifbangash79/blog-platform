import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostLoader {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  createLoader() {
    return new DataLoader<string, Post>(async (ids: string[]) => {
      const posts = await this.postRepository.findByIds(ids);
      const postMap = new Map(posts.map(post => [post.id, post]));
      return ids.map(id => postMap.get(id) || null);
    });
  }
} 