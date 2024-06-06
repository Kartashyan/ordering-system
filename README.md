# Ordering System

This is a ordering system that allows customers to place orders for food online.

## Getting Started

To run the food ordering system on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pizza-ordering-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pizza-ordering-system
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```bash
   POSTGRES_USER=your-username
   POSTGRES_PASSWORD=your-password
   POSTGRES_DB=pizza_ordering_system
   DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB
   SESSION_SECRET=your-session-secret
   ```

   or just copy the `.env.example` file and rename it to `.env`

   ```bash
   cp .env.example .env
   ```

5. Start the Postgres Database
   ```bash
   npm run docker
   ```
6. Initial setup:
   ```bash
   npm run setup
   ```
7. Start the application:

   ```bash
   npm run dev
   ```

8. Use Postman [Collection](src/infra/postman/ordering-system.postman_collection.json) to test the API endpoints.

9. Explore and manipulate the data in the database using the Prisma studio.

   ```bash
   npx prisma studio
   ```

## Folder Structure

The folder structure of the project is as follows:

- `src`: Contains the source code files for the pizza ordering system.
  ...

## Architectural Components

![alt text](image.png)
**Repositories**

A **repository** separates the logic that retrieves data from a data source. It provides a consistent interface for accessing and managing data, abstracting away the details of how the data is stored or retrieved.

**Services**

A **service** refers to a component or module that encapsulates business logic or functionality within an application.
