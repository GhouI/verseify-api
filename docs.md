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

## POST /api/UploadChapterByBookId

Uploads a chapter to a book in the database.

### Request

- Method: POST
- URL: `/api/UploadChapterByBookId`
- Headers:
  - Content-Type: application/json
- Body: Object containing chapter details

#### Body Parameters

| Parameter         | Type   | Required | Description                             |
| ----------------- | ------ | -------- | --------------------------------------- |
| bookid            | number | Yes      | The ID of the book to which the chapter belongs. |
| chaptercontent    | string | Yes      | The content of the chapter.              |
| groupName         | string | Yes      | The group to which the chapter belongs.  |
| chapter_title     | string | Yes      | The title of the chapter.                |
| chapter_language  | string | Yes      | The language of the chapter.             |

### Response

- Status Code: 200 (OK) if successful
- Body: Result of the database insertion operation

### Example

#### Request

```http
POST /api/UploadChapterByBookId HTTP/1.1
Content-Type: application/json

{
  "bookid": 123,
  "chaptercontent": "Lorem ipsum dolor sit amet...",
  "groupName": "Group A",
  "chapter_title": "Chapter 1",
  "chapter_language": "English"
}
```

#### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

[]
```

Note: The example above demonstrates the possible response but may not reflect the actual response data from the API.
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
