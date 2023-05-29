# Project Description

The project is a RESTful API that serves as a backend for a book management system. It allows users to retrieve information about books, search for books based on specific criteria, and access the content of individual book chapters.

## Functionality

1. Welcome Message
   - The API provides a welcome message when accessing the root URL ("/").
   - It responds with a simple "Hello, welcome to the API" message.

2. Retrieve All Books
   - The API endpoint `/api/books` allows users to retrieve all books stored in the database.
   - It executes a SQL query to select all records from the "Books" table.
   - The API responds with an array of book objects containing information such as book title, author, and other details.

3. Search for Books
   - The `/api/getbook` endpoint enables users to search for books based on a search query.
   - Users can pass a search query parameter (`search`) to specify their search criteria.
   - The API executes a SQL query that performs a search based on the book title.
   - If any books matching the search query are found, the API responds with an array of book objects.
   - If no matching books are found, the API responds with a 404 error and an error message.

4. Retrieve Book and Chapters by ID
   - The `/api/GetBookByID` endpoint allows users to retrieve a specific book and its associated chapters using the book's ID.
   - Users need to provide the book ID as a query parameter (`search`).
   - The API executes a SQL query that joins the "Books," "Authors," and "Chapters" tables to retrieve the desired book and its chapters.
   - If the book is found, the API responds with an array of book objects, each containing information about the book and its associated chapters.
   - If the specified book ID is not found, the API responds with a 404 error and an error message.

5. Retrieve Chapter Content by Chapter ID
   - The `/api/GetBookContentByChapterID` endpoint allows users to retrieve the content of a specific chapter using the chapter's ID.
   - Users need to provide the chapter ID as a query parameter (`search`).
   - The API executes a SQL query to retrieve the content of the specified chapter.
   - If the chapter is found, the API responds with an array containing the chapter content.
   - If the specified chapter ID is not found, the API responds with a 404 error and an error message.

## Error Handling
- The API handles various error scenarios, such as internal server errors or resource not found situations.
- In case of an internal server error, the API responds with a 500 error and an appropriate error message.
- When a specific book or chapter is not found, the API responds with a 404 error and an error message indicating that the requested resource could not be found.

## Live Demo

You can find a live demo of the project at [https://verseify-api.vercel.app/](https://verseify-api.vercel.app/). Please follow the docs on how to use it.
