# PropertyPeedika Backend

## Overview
A lightweight **Node.js + Express** API for managing property listings.

- **MongoDB** for data storage (via Mongoose)
- **Cloudinary** for image uploads
- **JWT** authentication for admin actions (create, update, delete)
- CORS enabled for the React frontend (running on `http://localhost:5175`)

## Quick Start
```bash
# Clone the repo (if not already)
git clone <repo-url>
cd propertypeedika

# Install frontend dependencies (already done) and start it
npm install && npm run dev   # runs on http://localhost:5175

# Backend setup
cd server
npm install                # installs express, mongoose, cloudinary, etc.
cp .env.example .env       # edit with your own values
npm run start              # starts server on http://localhost:5000
```

## Environment Variables (`.env`)
```
MONGO_URI=mongodb://localhost:27017/propertypeedika
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST   | `/api/auth/register` | Create admin user (run once) | Public |
| POST   | `/api/auth/login`    | Login and receive JWT token | Public |
| POST   | `/api/properties`    | Add new property (image upload) | Admin |
| GET    | `/api/properties`    | List all properties | Public |
| GET    | `/api/properties/:id`| Get a single property | Public |
| PUT    | `/api/properties/:id`| Update property (image upload) | Admin |
| DELETE | `/api/properties/:id`| Delete property | Admin |

## Usage from Frontend
Add the JWT token to the `Authorization` header:
```js
fetch('/api/properties', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(propertyData)
});
```

## License
MIT
