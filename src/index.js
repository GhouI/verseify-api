import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.use(cors({ origin: true }));
app.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 100, // Adjust the limit based on your server capacity
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database_name,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, Welcome to Verseify API. This is Version 1.06');
});

const queryDatabase = (query, res) => {
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An internal server error occurred' });
      const discordURL = process.env.Discord;
      const data = {
        content: `An error occurred: ${error.message}`,
      };
  
      fetch(discordURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } else {
      res.status(200).json(results);
    }
  });
};

app.get('/api/books', (req, res) => {
  const query = 'SELECT * FROM `Books`';
  queryDatabase(query, res);
});

app.get('/api/getbook', (req, res) => {
  const searchQuery = req.query.search;
  const query = `
    SELECT 
      Books.*,
      Authors.author_name
    FROM 
      Books
      INNER JOIN Authors ON Books.author_id = Authors.author_id
    WHERE 
      Books.book_title LIKE '%${searchQuery}%';
  `;

  queryDatabase(query, res);
});

app.get('/api/GetBookByID', (req, res) => {
  const searchQuery = req.query.search;
  const query = `
    SELECT 
      Books.*,
      Chapters.chapter_id,
      Chapters.chapter_title,
      Chapters.chapter_language,
      Chapters.chapter_group,
      Authors.author_name
    FROM 
      Books
      INNER JOIN Authors ON Books.author_id = Authors.author_id
      INNER JOIN Chapters ON Books.book_id = Chapters.book_id
    WHERE 
      Books.book_id = ${searchQuery};
  `;

  queryDatabase(query, res);
});

app.get('/api/GetBookContentByChapterID', (req, res) => {
  const searchQuery = req.query.search;
  const query = `
    SELECT chapter_content FROM Chapters WHERE chapter_id = ${searchQuery};
  `;

  queryDatabase(query, res);
});

app.post('/api/UploadChapterByBookId', (req, res) => {
  const { book_id, chapter_title, chapter_language, chapter_content, chapter_group } = req.body;
  const query = `
    INSERT INTO Chapters (book_id, chapter_title, chapter_language, chapter_content, chapter_group) VALUES (1, 'meow', 'roo', 'boo', 'cow');
  `;

  queryDatabase(query, res);
});

export default app;
