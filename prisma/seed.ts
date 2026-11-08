import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter })

async function main() {
  // Create 4 Genres
  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery' } });
  const history = await prisma.genre.create({ data: { name: 'History' } });

  // Create 15 Books distributed across genres
  const booksData = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genreId: fiction.id },
    { title: '1984', author: 'George Orwell', genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: fiction.id },
    { title: 'Dune', author: 'Frank Herbert', genreId: sciFi.id },
    { title: 'Neuromancer', author: 'William Gibson', genreId: sciFi.id },
    { title: 'Foundation', author: 'Isaac Asimov', genreId: sciFi.id },
    { title: 'Snow Crash', author: 'Neal Stephenson', genreId: sciFi.id },
    { title: 'The Big Sleep', author: 'Raymond Chandler', genreId: mystery.id },
    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', genreId: mystery.id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genreId: history.id },
    { title: 'A People s History of the United States', author: 'Howard Zinn', genreId: history.id },
    { title: 'The Wright Brothers', author: 'David McCullough', genreId: history.id },
  ];

  for (const book of booksData) {
    await prisma.book.create({ data: book });
  }

  console.log('Database seeded successfully with 4 genres and 15 books!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });