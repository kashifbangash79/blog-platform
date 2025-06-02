import { GraphQLError } from 'graphql';

export class BlogError extends GraphQLError {
  constructor(message: string, code: string) {
    super(message, {
      extensions: {
        code,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

export class PostNotFoundError extends BlogError {
  constructor(id: string) {
    super(`Post with id ${id} not found`, 'POST_NOT_FOUND');
  }
}

export class PostCreationError extends BlogError {
  constructor(message: string) {
    super(message, 'POST_CREATION_ERROR');
  }
}

export class PostUpdateError extends BlogError {
  constructor(message: string) {
    super(message, 'POST_UPDATE_ERROR');
  }
}

export class PostDeletionError extends BlogError {
  constructor(message: string) {
    super(message, 'POST_DELETION_ERROR');
  }
} 