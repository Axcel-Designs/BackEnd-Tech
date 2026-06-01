# Authentication, Authorization & Secure API Design with Node.js

Stack Requirements

Use the following technologies:

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- Morgan

Scenario

You were hired to build the backend for a startup called **VaultPass** — a platform where users can create private notes and manage team access securely.

The company recently suffered a security breach because:

users could access other users’ data,  
admins had too much unrestricted power,  
tokens never expired,  
and sensitive routes were exposed publicly.  
Your task is to redesign the backend properly.

## Requirements

### Project Setup

Initialize a professional backend structure.

Your project must include:

Environment variable management with dotenv  
Request logging with Morgan  
Proper folder structure  
Error handling middleware  
MongoDB connection setup

### Authentication System

Implement:

User Registration  

A user should register with:  
fullName  
email  
password  
role  

Rules  
email must be unique  
password must be hashed  

role can only be:  
user  
moderator  
admin

**User Login**  
Users should log in using:  
email  
password  

Return:  
JWT token  
user information (excluding password)

### Authorization Twist

Implement role-based access control.

Routes

Public Route  
GET /api/public/message  
Response:  
{ "message": "This route is public" }

Protected Route  
GET /api/user/profile
Only logged-in users can access it.

Moderator Route  
GET /api/moderator/reports

Accessible only by:  
moderator  
admin

Admin Route

DELETE /api/admin/user/:id

Only admins can:  
delete users  
BUT admins cannot delete themselves
(Yes, this is intentional.)

### The Twist

Implement account locking.

If a user enters the wrong password:

5 consecutive times,

within 10 minutes,

their account should be locked for:

15 minutes.

During lock:

login must fail even if password becomes correct.

Store this properly in MongoDB.

### Token Security

JWT tokens must:

expire in 1 hour

fail properly when expired

return meaningful error responses

### Suspicious Activity Logger

Create middleware that logs:

failed logins

forbidden route access attempts

deleted accounts

Store logs in MongoDB.

Suggested fields:

action

user

ipAddress

timestamp

### Bonus Twist (Important)

Create a route:

POST /api/admin/promote/:id

Rules:

only admins can promote users

admins CANNOT promote another admin

moderators cannot promote anyone

users cannot access the route

    Deliverables

Students must submit:

    GitHub Repository

With:

clean commits

meaningful README

### Postman Collection

Include:  
all endpoints  
example requests  
example responses

### Database Design

Explain:  
collections used  
why each field exists

### Extra Challenge Questions

Students must answer these theoretically:

1. Question 1

    Why is storing plain passwords dangerous even in small applications?

2. Question 2

    What is the difference between:

    authentication

    authorization

    Give real-world examples.

3. Question 3

    Why is JWT expiration important?

    What could happen if tokens never expire?

4. Question 4

    A hacker gets access to a valid JWT token.

    What are 3 things you can implement to reduce damage?

5. Question 5
    Why should logging systems be treated as sensitive infrastructure?

    
<!-- 
vaultpass-backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic (with public DNS resolution)
│   │
│   ├── controllers/
│   │   ├── adminController.js    # Handles user deletion, promotion, etc.
│   │   ├── authController.js     # Handles signUp and signIn (with login lock logic)
│   │   ├── modController.js      # Handles moderator specific logic (reports)
│   │   └── userController.js     # Handles regular user routes (profile lookup)
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT token verification ('protect' function)
│   │   ├── errorMiddleware.js    # Global 500 error & 404 catch-all handlers
│   │   ├── logMiddleware.js      # Suspicious Activity Logger (failed logins, forbidden access)
│   │   └── roleMiddleware.js     # Role verification ('restrictTo' guard)
│   │
│   ├── models/
│   │   ├── Account.js            # User Schema (with bcrypt hook, login attempts, & lock tracking fields)
│   │   └── AuditLog.js           # Schema for logging failed logins, forbidden access, & deletions
│   │
│   ├── routes/
│   │   ├── adminRoute.js         # Protected admin endpoints
│   │   ├── modRoute.js           # Protected moderator endpoints
│   │   ├── publicRoute.js        # Unprotected endpoints (/api/public)
│   │   └── userRoute.js          # Protected user endpoints
│   │
│   └── app.js                    # Express application configuration & routing pipeline
│
├── .env                          # Local secret environment variables (PORT, MONGO_URI, JWT_SECRET)
├── .env.example                  # Template env file for GitHub (no real secrets included)
├── .gitignore                    # Tells Git to ignore node_modules and your active .env file
├── package.json                  # App dependencies (express, mongoose, bcrypt, jsonwebtoken, morgan, dotenv)
├── server.js                     # Root entry point that boots up DB first, then listens on the Port
└── README.md                     # Documentation detailing database choices & theory question answers -->
