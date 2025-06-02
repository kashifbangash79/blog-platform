import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()  // <-- Add this decorator
@Entity()
export class Post {
  @Field(() => ID)  // <-- Add this decorator
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()  // <-- Add this decorator
  @Column()
  title: string;

  @Field()  // <-- Add this decorator
  @Column('text')
  content: string;

  @Field({ defaultValue: false })  // <-- Add this decorator
  @Column({ default: false })
  published: boolean;

  @Field()  // <-- Add this decorator
  @CreateDateColumn()
  createdAt: Date;

  @Field()  // <-- Add this decorator
  @UpdateDateColumn()
  updatedAt: Date;
}