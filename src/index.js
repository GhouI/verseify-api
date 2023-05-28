const express = require('express')
const Error = require('./Error')
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
const app =  express();

const port = process.env.PORT || 3000;
app.use(cors());    
// Create a database connection pool with connection limits
const pool = mysql.createPool({
    connectionLimit: 100, // Adjust the limit based on your server capacity
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database_name,
  });

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
   
})
// Middleware to acquire a connection from the pool
function getConnection(callback) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error acquiring database connection:', err);
        callback(err, null);
      } else {
        callback(null, connection);
      }
    });
  }
app.get('/', (req,res) =>{
    res.send("Hello, Welcome to Verseify API. This is Version 1.04. Sends discord webhooks error.")
    Error(process.env.Discord, "Server is running on port " + port)
});
  app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM `Books`';
  
    getConnection((err, connection) => {
      if (err) {
        res.status(500).json({ error: 'An internal server error occurred' });
      } else {
        connection.query(query, (error, results) => {
          connection.release(); // Release the connection back to the pool
  
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An internal server error occurred' });
          } else {
            res.status(200).json(results);
          }
        });
      }
    });
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
  
    getConnection((err, connection) => {
      if (err) {
        res.status(500).json({ error: 'An internal server error occurred' });
      } else {
        connection.query(query, (error, results) => {
          connection.release(); // Release the connection back to the pool
  
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An internal server error occurred!' });
          } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Could not find that book.' });
            } else {
                res.status(200).json(results);
            }
          }
        });
      }
    });
  });
  
  app.get('/api/GetBookByID', (req, res) => {
    const searchQuery = req.query.search;
    const query = `SELECT 
    Books.*,
    Chapters.chapter_id,
    Chapters.chapter_title,
    Chapters.chapter_language,
    Chapters.Group,
    Authors.author_name
  FROM 
    Books
    INNER JOIN Authors ON Books.author_id = Authors.author_id
    INNER JOIN Chapters ON Books.book_id = Chapters.book_id
  WHERE 
    Books.book_id = ${searchQuery};
  `;
  
    getConnection((err, connection) => {
      if (err) {
        res.status(500).json({ error: 'An internal server error occurred' });
      } else {
        connection.query(query, (error, results) => {
          connection.release(); // Release the connection back to the pool
  
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An internal server error occurred!' });
          } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Could not find that book.' });
            } else {
                res.status(200).json(results);
            }
          }
        });
      }
    });
  });
  app.get('/api/GetBookContentByChapterID', (req, res) =>{
    const searchQuery = req.query.search
    const query = `
    SELECT chapter_content FROM Chapters WHERE chapter_id = ${searchQuery};
    `
      getConnection((err, connection) => {
      if (err) {
        res.status(500).json({ error: 'An internal server error occurred' });
      } else {
        connection.query(query, (error, results) => {
          connection.release(); // Release the connection back to the pool
  
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An internal server error occurred!' });
          } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Could not find that book.' });
            } else {
                res.status(200).json(results);
            }
          }
        });
      }
    });
  })
  app.post('/api/UploadChapterByBookId', (req, res) =>{
    const {book_id, chapter_title, chapter_language, chapter_content, chapter_group} = req.body;
    const query = `
    INSERT INTO Chapters (book_id, chapter_title, chapter_language, chapter_content, chapter_group) VALUES (${book_id}, '${chapter_title}', '${chapter_language}', '${chapter_content}', '${chapter_group}');
    `
    getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ error: 'An internal server error occurred' });
        } else {
            connection.query(query, (error, results) => {
            connection.release(); // Release the connection back to the pool
    
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'An internal server error occurred!' });
            } else {
                if (results.length === 0) {
                res.status(404).json({ error: 'Could not find that book.' });
                } else {
                    res.status(200).json(results);
                }
            }
            });
        }
        }
    );

  })
export default app;
