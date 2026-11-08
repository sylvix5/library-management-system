# Library Management System

A robust full-stack library management system backend built with **NestJS**, **Prisma 7**, and **PostgreSQL**, featuring relational data models for users, books, and genres.

## Tech Stack

* **Backend Framework:** NestJS (TypeScript)
* **ORM & Database:** Prisma 7 with PostgreSQL (using driver adapters)
* **Database Seeding:** TypeScript seed script (`tsx`)

## Schema Decisions

### Why Book references Genre rather than embedding it:

We chose to separate the `Genre` data into its own model and link `Book` to it via a `genreId` foreign key rather than embedding the genre name directly as a string inside the Book model for several core reasons:

1. **Data Consistency and Integrity:** Storing genres in a dedicated table prevents typographical errors or variations (e.g., preventing records from getting split between "Sci-Fi", "sci-fi", and "Science Fiction").
2. **Normalized Architecture:** It reduces data redundancy. If a genre's name needs to be updated or expanded with metadata (like descriptions or classification codes) in the future, it can be updated in a single place rather than modifying dozens of individual book entries.
3. **Scalability for Queries:** Foreign keys allow efficient relational queries (`include: { genre: true }`) to fetch contextual category details cleanly.
