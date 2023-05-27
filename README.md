# verseify-api API Documentation

This documentation provides an overview of the RESTful API endpoints available in the provided script.

## Base URL

The base URL for all API endpoints is `/`.

## Endpoints

### GET /

Returns a welcome message for the API.

#### Request

- Method: GET
- URL: `/`

#### Response

- Status Code: 200 (OK)
- Body: "Hello, welcome to the API"

### GET /api/books

Retrieves all books from the database.

#### Request

- Method: GET
- URL: `/api/books`

#### Response

- Status Code: 200 (OK)
- Body: Array of book objects

### GET /api/getbook

Retrieves books based on a search query.

#### Request

- Method: GET
- URL: `/api/getbook?search={searchQuery}`

##### Parameters

| Parameter   | Type   | Required | Description             |
| ----------- | ------ | -------- | ----------------------- |
| searchQuery | string | Yes      | Search query for books  |

#### Response

- Status Code: 200 (OK)
- Body: Array of book objects matching the search query

### GET /api/GetBookByID

Retrieves a book and its chapters based on the book ID.

#### Request

- Method: GET
- URL: `/api/GetBookByID?search={bookID}`

##### Parameters

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| bookID    | string | Yes      | ID of the book       |

#### Response

- Status Code: 200 (OK)
- Body: Array of book objects with associated chapters

### GET /api/GetBookContentByChapterID

Retrieves the content of a chapter based on the chapter ID.

#### Request

- Method: GET
- URL: `/api/GetBookContentByChapterID?search={chapterID}`

##### Parameters

| Parameter  | Type   | Required | Description           |
| ---------- | ------ | -------- | --------------------- |
| chapterID  | string | Yes      | ID of the chapter      |

#### Response

- Status Code: 200 (OK)
- Body: Array of chapter content

## Error Responses

The following error responses may be returned by the API endpoints:

- Status Code: 404 (Not Found)
  - Body: { "error": "Could not find that book." }

- Status Code: 500 (Internal Server Error)
  - Body: { "error": "An internal server error occurred" }

- Status Code: 500 (Internal Server Error)
  - Body: { "error": "An internal server error occurred!" }

Please note that the error responses may vary depending on the specific scenario.

---

This documentation provides an overview of the available endpoints and their usage in the provided script. Please refer to this document for API reference and usage instructions.
