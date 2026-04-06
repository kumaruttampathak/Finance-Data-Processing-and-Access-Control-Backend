# Finance Data Processing and Access Control System

## Description

This is a backend API for a Finance Data Processing and Access Control system built with Node.js, Express, and MongoDB. It provides CRUD operations for financial records, user management, and role-based access control.

## Features

- User authentication and authorization
- Role-based access control (Admin, Analyst, Viewer)
- CRUD operations for financial records
- Filtering records by date and category
- Dashboard summary with total balance and category-wise totals
- Input validation using Joi
- Global error handling

## Setup Instructions

1. Clone the repository or navigate to the project directory.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/finance_db
     JWT_SECRET=secret_jwt_key
     ```
   - Replace `secret_jwt_key` with a secure JWT secret.

4. Ensure MongoDB is running locally or update `MONGODB_URI` to your MongoDB connection string.

5. Run the server:
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

## Assumptions

- MongoDB is used as the database.
- JWT is used for authentication.
- Passwords are hashed using bcrypt.
- Default user status is 'Active'.
- Currency is assumed to be in a single unit (e.g., USD), no multi-currency support.
- Dates are stored as ISO strings.

## API Guide

### Authentication

- `POST /api/users/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string", "role": "Admin|Analyst|Viewer" }`

- `POST /api/users/login` - Login
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: `{ "user": {...}, "token": "jwt_token" }`

Use the token in the `Authorization` header as `Bearer <token>` for protected routes.

### Users (Admin only)

- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Financial Records

- `GET /api/records` - Get all records (Viewer+)
  - Query params: `?date=YYYY-MM-DD&category=string`

- `GET /api/records/:id` - Get record by ID (Viewer+)

- `GET /api/records/dashboard/summary` - Get summary (Analyst+)
  - Returns: `{ "balance": number, "income": number, "expense": number, "categoryTotals": [...] }`

- `POST /api/records` - Create record (Admin)
  - Body: `{ "amount": number, "type": "income|expense", "category": "string", "date": "YYYY-MM-DD", "notes": "string" }`

- `PUT /api/records/:id` - Update record (Admin)

- `DELETE /api/records/:id` - Delete record (Admin)

## Project Structure
- **Data Models**: User and FinancialRecord schemas with proper validation
- **API Architecture**: Controller-Service-Model pattern with separation of concerns
- **Authentication**: JWT-based auth with role-based middleware
- **CRUD Operations**: Full create, read, update, delete for records
- **Filtering**: Query parameters for date and category filtering
- **Summary Endpoint**: `/api/records/dashboard/summary` with balance calculation and category totals
- **Access Control**: 
  - Viewers: GET requests only
  - Analysts: GET + summary access
  - Admins: Full CRUD + user management
- **Validation**: Joi schemas for input validation
- **Error Handling**: Global error handler with consistent JSON responses

## Key Files
- server.js - Main application entry point
- Models: `User.js`, `FinancialRecord.js`
- Controllers: `userController.js`, `recordController.js`
- Services: `userService.js`, `recordService.js`
- Middleware: `auth.js`, `roleCheck.js`
- Routes: `userRoutes.js`, `recordRoutes.js`
- Utils: `validation.js`
- Config: `database.js`
- Documentation: README.md

## Setup
1. install the required dependencies
2. Environment variables configured in .env
3. MongoDB connection ready
4. Server can be started with `npm start`

The system includes user registration/login, secure API endpoints, and comprehensive documentation. All requirements for data modeling, API development, access control, validation, and documentation have been implemented.