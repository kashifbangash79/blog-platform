import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'db',
      port:  5432,
      username:  'postgres',
      password:'kashif123',
      database: 'blog',
      entities: [Post],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}