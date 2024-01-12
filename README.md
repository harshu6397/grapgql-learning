# GraphQL App

This repository contains the source code for a GraphQL application. The application serves as a template for building web services using GraphQL, a query language for APIs, and a runtime for executing those queries with your existing data.

## Features

- **GraphQL Endpoint**: `/graphql`
- **Schema Definition**: The GraphQL schema is defined in the `typedefs.ts` file.
- **Resolvers**: Resolvers in the `resolvers` directory handle the execution of GraphQL queries and mutations.
- **Express Server**: Uses Express.js as the server to handle HTTP requests.
- **Database Integration**: Customize resolvers for database integration.

## Getting Started

### Prerequisites

- Node.js and npm installed. [Download Node.js](https://nodejs.org/)

### Installation

1. Clone this repository:

```bash
  git clone https://github.com/your-username/your-graphql-app.git
```

2. Navigate to the project directory:

```bash
cd your-graphql-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the server
```bash
npm run dev
```

Access the GraphQL Playground at http://localhost:4000/graphql to interact with the GraphQL API.
