# Announcement Board REST API

A Node.js REST API for managing announcements with features like filtering, sorting, and pagination.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd announcement-board-rest-api-hw3
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your database configuration:

```
DATABASE_URL="<your_db_string>"
```

4. Run database migrations:

```bash
npm run prisma:migrate
```

5. Generate prisma client:

```bash
npm run prisma:generate
```

5. Start the server:

```bash
npm run start
```

The API will be available at `http://localhost:3000/api-docs`

## API Documentation

All endpoints are documented with Swagger/OpenAPI specifications. View the interactive API docs at `/api-docs` when the server is running.

### Base URL

```
http://localhost:3000/announcements
```

### Endpoints

#### 1. Get All Announcements

**GET** `/`

Retrieve a paginated list of announcements with optional filtering and sorting.

**Query Parameters:**

- `search` (string, optional) - Search filter by announcement title
- `sort` (string, optional) - Sort order: `newest` (default) or `oldest`
- `page` (integer, optional) - Page number for pagination (default: 1)

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Used iPhone 13",
      "description": "Excellent condition, minimal usage",
      "price": 750,
      "category": "sale",
      "contactInfo": "john@example.com",
      "createdAt": "2026-06-16T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "totalPages": 5,
    "perPage": 10
  }
}
```

---

#### 2. Get Announcement by ID

**GET** `/:id`

Retrieve a specific announcement by its ID.

**Path Parameters:**

- `id` (integer, required) - Announcement ID

**Response:**

```json
{
  "id": 1,
  "title": "Used iPhone 13",
  "description": "Excellent condition, minimal usage",
  "price": 750,
  "category": "sale",
  "contactInfo": "john@example.com",
  "createdAt": "2026-06-16T10:30:00Z"
}
```

---

#### 3. Create Announcement

**POST** `/`

Create a new announcement.

**Request Body:**

```json
{
  "title": "Used iPhone 13",
  "description": "Excellent condition, minimal usage",
  "price": 750,
  "category": "sale",
  "contactInfo": "john@example.com"
}
```

**Required Fields:**

- `title` (string) - 5-100 characters
- `description` (string) - minimum 10 characters
- `price` (number) - positive number
- `category` (string) - one of: `sale`, `service`, `job`, `other`
- `contactInfo` (string) - minimum 5 characters (email or phone)

**Response:** `201 Created`

---

#### 4. Update Announcement

**PATCH** `/:id`

Update an existing announcement (all fields are optional).

**Path Parameters:**

- `id` (integer, required) - Announcement ID

**Request Body:**

```json
{
  "title": "Updated Title",
  "price": 699,
  "contactInfo": "newemail@example.com"
}
```

**Response:** `200 OK`

---

#### 5. Delete Announcement

**DELETE** `/:id`

Delete an announcement by ID.

**Path Parameters:**

- `id` (integer, required) - Announcement ID

**Response:** `204 No Content`

---

## Categories

Valid announcement categories:

- `sale` - For selling items
- `service` - For services offered
- `job` - For job postings
- `other` - Other announcements

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (delete success)
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

Error response format:

```json
{
  "error": "Announcement with provided id not found"
}
```

## Technology Stack

- **Framework:** Express.js
- **Database:** Prisma ORM
- **Validation:** Celebrate (Joi)
- **Documentation:** Swagger/JSDoc

## Project Structure

```
src/
├── controllers/      # Route handlers
├── routes/          # API route definitions
└── validators/      # Input validation middleware
prisma/
├── schema.prisma    # Database schema
└── migrations/      # Database migrations
```
