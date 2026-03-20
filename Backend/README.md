# Second Brain AI — Backend

Node.js + Express backend for authentication and image upload.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT auth (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Cloudinary image upload (`cloudinary`, `express-fileupload`)

## Project Structure

```text
Backend/
  src/
    config/
      db.js
      cloudinary.js
    controllers/
      auth.controller.js
      upload.controller.js
    middleware/
      auth.middleware.js
    models/
      User.js
    routes/
      auth.routes.js
      upload.routes.js
    index.js
  postman/
    Second Brain AI.postman_collection.json
  .env
  package.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create/update `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

3. Run server:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

## API Endpoints

### Health
- `GET /`

### Auth
- `POST /api/auth/signup`
  - body: `{ fullName, email, password }`
- `POST /api/auth/login`
  - body: `{ email, password }`
- `GET /api/auth/me`
  - header: `Authorization: Bearer <token>`

### Upload
- `POST /api/upload/image`
  - form-data: `image` (file)

## Response Patterns

Success examples:

```json
{ "success": true, "message": "...", "token": "...", "user": {} }
```

```json
{ "success": true, "imageUrl": "https://..." }
```

Error examples:

```json
{ "success": false, "message": "..." }
```

## Testing

Import collection:

- `postman/Second Brain AI.postman_collection.json`

---
Keep secrets private and never commit real production credentials.
