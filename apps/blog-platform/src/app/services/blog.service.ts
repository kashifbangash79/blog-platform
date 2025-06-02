import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find();
    } catch (error) {
      this.logger.error(`Failed to fetch posts: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({ where: { id } });
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      this.logger.error(`Failed to fetch post ${id}: ${error.message}`);
      throw error;
    }
  }

  async create(postData: Partial<Post>): Promise<Post> {
    try {
      const post = this.postRepository.create(postData);
      return await this.postRepository.save(post);
    } catch (error) {
      this.logger.error(`Failed to create post: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, postData: Partial<Post>): Promise<Post> {
    try {
      await this.postRepository.update(id, {...postData});
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to update post ${id}: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.postRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      this.logger.error(`Failed to delete post ${id}: ${error.message}`);
      throw error;
    }
  }
}