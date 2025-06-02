import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { GraphqlModule } from './modules/graphql.module';
import { PostResolver } from './resolvers/post.resolver';
import { BlogService } from './services/blog.service';
import { PostLoader } from './loaders/post.loader';

@Module({
  imports: [DatabaseModule, GraphqlModule],
  providers: [BlogService, PostResolver, PostLoader],
})
export class AppModule {}