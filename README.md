# Blog Platform Backend

A modern blog platform backend built with Nx, NestJS, TypeORM, PostgreSQL, and GraphQL. This project demonstrates best practices in building scalable and maintainable backend services.

## Repository Information

- **Repository**: [blog-platform](https://github.com/yourusername/blog-platform)
- **Branch**: main
- **Last Updated**: June 2, 2024

## Features

- CRUD operations for blog posts
- Real-time updates using GraphQL Subscriptions
- Efficient data fetching with DataLoader
- TypeORM integration with PostgreSQL
- GraphQL API with code-first approach
- Comprehensive error handling
- Docker support

## Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Tech Stack

- [Nx](https://nx.dev/) - Monorepo tool
- [NestJS](https://nestjs.com/) - Backend framework
- [TypeORM](https://typeorm.io/) - ORM for database interactions
- [PostgreSQL](https://www.postgresql.org/) - Database
- [GraphQL](https://graphql.org/) - API query language
- [DataLoader](https://github.com/graphql/dataloader) - Batching and caching utility

## Project Structure

```
apps/
  ├── blog-platform/           # Main application
  │   ├── src/
  │   │   ├── app/
  │   │   │   ├── dto/        # Data Transfer Objects
  │   │   │   ├── entities/   # TypeORM entities
  │   │   │   ├── errors/     # Custom error types
  │   │   │   ├── loaders/    # DataLoader implementations
  │   │   │   ├── modules/    # NestJS modules
  │   │   │   ├── resolvers/  # GraphQL resolvers
  │   │   │   └── services/   # Business logic
  │   │   └── main.ts         # Application entry point
  │   └── Dockerfile          # Docker configuration
  └── blog-platform-e2e/      # End-to-end tests
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform

# Install dependencies
npm install

# Start the application
docker-compose up --build
```

The application will be available at `http://localhost:3006/graphql`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=kashif123
DATABASE_NAME=blog
```

## API Documentation

### GraphQL Playground

Access the GraphQL Playground at `http://localhost:3006/graphql` to explore the API and test queries.

### Quick Reference

#### Queries
```graphql
# Get all posts
query {
  posts {
    id
    title
    content
    published
  }
}

# Get a single post
query {
  post(id: "post-id") {
    id
    title
    content
  }
}
```

#### Mutations
```graphql
# Create a post
mutation {
  createPost(input: {
    title: "New Post"
    content: "Post content"
    published: true
  }) {
    id
    title
  }
}

# Update a post
mutation {
  updatePost(
    id: "post-id"
    input: {
      title: "Updated Title"
    }
  ) {
    id
    title
  }
}

# Delete a post
mutation {
  deletePost(id: "post-id")
}
```

#### Subscriptions
```graphql
# Subscribe to new posts
subscription {
  postCreated {
    id
    title
    content
  }
}

# Subscribe to post updates
subscription {
  postUpdated {
    id
    title
  }
}

# Subscribe to post deletions
subscription {
  postDeleted
}
```

For more detailed examples and usage patterns, see [GRAPHQL_EXAMPLES.md](./GRAPHQL_EXAMPLES.md).

## Error Handling

The application implements custom error types for better error handling:

- `PostNotFoundError`: When a post is not found
- `PostCreationError`: When post creation fails
- `PostUpdateError`: When post update fails
- `PostDeletionError`: When post deletion fails

## Development

### Running Tests

```bash
nx test blog-platform
```

### Running E2E Tests

```bash
nx e2e blog-platform-e2e
```

### Code Generation

```bash
# Generate a new component
nx generate @nx/nest:component <name> --project=blog-platform

# Generate a new service
nx generate @nx/nest:service <name> --project=blog-platform
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/blog-platform](https://github.com/yourusername/blog-platform)

## Testing the Application

### Starting the Application

1. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at:
   - GraphQL Playground: `http://localhost:3006/graphql`
   - API Endpoint: `http://localhost:3006/graphql`

### Testing CRUD Operations

#### 1. Create a Post
```graphql
mutation {
  createPost(input: {
    title: "My First Post"
    content: "This is my first blog post content"
    published: true
  }) {
    id
    title
    content
    published
    createdAt
  }
}
```

#### 2. Read Posts
```graphql
# Get all posts
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

# Get a single post (replace post-id with actual ID)
query {
  post(id: "post-id") {
    id
    title
    content
    published
    createdAt
    updatedAt
  }
}
```

#### 3. Update a Post
```graphql
mutation {
  updatePost(
    id: "post-id"  # Replace with actual post ID
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

#### 4. Delete a Post
```graphql
mutation {
  deletePost(id: "post-id")  # Replace with actual post ID
}
```

#### 5. Real-time Updates
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

### Testing Sequence

1. Open GraphQL Playground at `http://localhost:3006/graphql`
2. Create a new post using the create mutation
3. Copy the returned `id` from the response
4. Use that `id` to test the single post query
5. Use the same `id` to test the update mutation
6. Finally, use the `id` to test the delete mutation
7. Keep the subscription tab open to see real-time updates

### Testing Tips

- Use the GraphQL Playground's "Variables" panel to store and reuse post IDs
- Keep the subscription tab open in a separate window to monitor real-time updates
- Use the "Docs" tab in GraphQL Playground to explore available operations
- Check the "Network" tab in your browser's developer tools to monitor requests

## GitHub Setup

1. Create a new repository on GitHub
2. Initialize the local repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add the remote repository:
   ```bash
   git remote add origin https://github.com/yourusername/blog-platform.git
   git branch -M main
   git push -u origin main
   ```

## Repository Structure

```
.
├── apps/
│   ├── blog-platform/        # Main application
│   └── blog-platform-e2e/    # End-to-end tests
├── docker-compose.yml        # Docker configuration
├── Dockerfile               # Application Dockerfile
├── package.json            # Project dependencies
├── README.md              # Project documentation
├── GRAPHQL_EXAMPLES.md    # GraphQL examples
└── LICENSE                # MIT License
```
