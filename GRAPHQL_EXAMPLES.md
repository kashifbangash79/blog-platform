# GraphQL API Examples

This document provides examples of GraphQL queries, mutations, and subscriptions available in the Blog Platform API.

## Queries

### Fetch All Posts

```graphql
query {
  posts {
    id
    title
    content
    published
    createdAt
    updatedAt
  }
}
```

### Fetch Single Post

```graphql
query {
  post(id: "post-id-here") {
    id
    title
    content
    published
    createdAt
    updatedAt
  }
}
```

## Mutations

### Create Post

```graphql
mutation {
  createPost(input: {
    title: "My First Blog Post"
    content: "This is the content of my first blog post."
    published: true
  }) {
    id
    title
    content
    published
    createdAt
    updatedAt
  }
}
```

### Update Post

```graphql
mutation {
  updatePost(
    id: "post-id-here"
    input: {
      title: "Updated Title"
      content: "Updated content"
      published: false
    }
  ) {
    id
    title
    content
    published
    updatedAt
  }
}
```

### Delete Post

```graphql
mutation {
  deletePost(id: "post-id-here")
}
```

## Subscriptions

### Subscribe to New Posts

```graphql
subscription {
  postCreated {
    id
    title
    content
    published
    createdAt
  }
}
```

### Subscribe to Post Updates

```graphql
subscription {
  postUpdated {
    id
    title
    content
    published
    updatedAt
  }
}
```

### Subscribe to Post Deletions

```graphql
subscription {
  postDeleted
}
```

## Error Handling

The API returns custom error types with the following structure:

```json
{
  "errors": [
    {
      "message": "Post with id 123 not found",
      "extensions": {
        "code": "POST_NOT_FOUND",
        "timestamp": "2024-03-14T12:00:00.000Z"
      }
    }
  ]
}
```

Common error codes:
- `POST_NOT_FOUND`: When a post is not found
- `POST_CREATION_ERROR`: When post creation fails
- `POST_UPDATE_ERROR`: When post update fails
- `POST_DELETION_ERROR`: When post deletion fails

## Using with Apollo Client

Here's an example of how to use these operations with Apollo Client:

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

// Query example
const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;

// Mutation example
const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
    }
  }
`;

// Subscription example
const POST_CREATED = gql`
  subscription {
    postCreated {
      id
      title
      content
    }
  }
`;
```

## Testing in GraphQL Playground

1. Open `http://localhost:3000/graphql` in your browser
2. Use the examples above in the playground
3. For subscriptions, make sure to use the WebSocket endpoint
4. Test different scenarios by modifying the input data 