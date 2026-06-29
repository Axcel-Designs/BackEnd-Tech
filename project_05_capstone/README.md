# A Production-Ready Car Rental & Marketplace API

`AutoLease` is building a platform that allows:
* **Car owners** to lease their vehicles to earn money.
* **Customers** to rent vehicles from verified owners.
* **The company** to earn a commission from every successful rental.

The founders expect a secure, scalable, production-ready backend that can support thousands of users. Your task is to design, architect, develop, secure, document, and deploy the entire backend.

> [!IMPORTANT]
> This is **NOT** a simple CRUD application. You are expected to research industry best practices and implement solutions that would be acceptable in a production environment.

---

## Tech Stack (Compulsory)

* **Runtime**: Node.js
* **Language**: TypeScript
* **Framework**: Express.js
* **Database**: PostgreSQL (with TypeORM)
* **Authentication**: JWT & Google OAuth
* **Transactions**: PostgreSQL Transactions
* **Payments**: Third-party Payment API (Flutterwave, Paystack, or Stripe)
* **Storage**: Cloud Image Storage (Cloudinary or equivalent)
* **Version Control**: Git
* **Testing/API Client**: Postman
* **Deployment**: Platform of choice (Railway, Render, Fly.io, DigitalOcean, AWS, etc.)

---

## Functional Requirements

### Authentication & Authorization
* User Registration
* Email Login
* Google OAuth Login
* JWT Authentication
* Refresh Tokens
* Email Verification
* Forgot Password
* Reset Password
* Change Password

### Roles
* Customer
* Car Owner
* Admin

### User Module
Users should be able to:
* Update profile
* Upload profile picture
* View wallet
* View rental history
* View payment history

### Car Owner Module
Owners should be able to:
* Register vehicles
* Upload multiple images
* Edit vehicles
* Delete vehicles
* Set rental price
* Manage availability
* Pause rentals
* View bookings
* View earnings

Each vehicle should contain:
* Brand
* Model
* Year
* VIN
* Engine Type
* Fuel Type
* Transmission
* Daily Price
* Description
* Images
* Address
* GPS Coordinates

### Customer Module
Customers should be able to:
* Browse vehicles
* Search vehicles
* Filter vehicles
* Sort vehicles
* Book vehicles
* Cancel bookings (business rules apply)
* View bookings
* Leave reviews

### Booking Module
Implement the booking lifecycle:
* Pending
* Awaiting Payment
* Paid
* Active
* Completed
* Cancelled

**Prevent:**
* Double bookings
* Booking unavailable vehicles
* Booking suspended vehicles

### Payment Module
Integrate at least one payment gateway: `Flutterwave`, `Paystack`, or `Stripe`.

Implement:
* Payment initialization
* Payment verification
* Webhooks
* Payment history
* Failed payments
* Successful transactions

> [!WARNING]
> Never trust client-side payment success. Verification **must** happen on the server.

### Wallet Module
Every successful rental should automatically credit the owner's wallet.

The wallet should support:
* Pending Balance
* Available Balance
* Transaction History
* Commission deduction
* Withdrawal history

### Withdrawal Module
Owners should be able to:
* Add bank account
* Validate bank details
* Request withdrawal
* View withdrawal history

Admins should be able to:
* Approve withdrawals
* Reject withdrawals

**Prevent:**
* Double withdrawals
* Negative balances
* Concurrent withdrawal race conditions

### Review Module
Customers can:
* Rate vehicles
* Leave reviews
* Update reviews
* Delete reviews

Display:
* Average rating
* Total reviews

### Admin Module
Create endpoints for administrators to:
* View platform analytics (total revenue, total rentals, total users, active vehicles)
* Suspend/activate users
* Suspend vehicles
* Verify owners
* Approve withdrawals
* View all payments & failed payments
* View audit logs

---

## Database Requirements (Compulsory)

Use PostgreSQL with TypeORM. Your schema must demonstrate proper relational database design.

### Expected Relationships
* One-to-One
* One-to-Many
* Many-to-One
* Many-to-Many (where appropriate)

### Implementation Checklist
* Foreign Keys
* Constraints
* Indexes
* Database Migrations
* Seeders (Bonus)

### Transactions
Use transactions where consistency is critical, such as:
* Payment verification
* Wallet updates
* Booking confirmation
* Withdrawals

---

## API Requirements

Every list endpoint should support:
* Pagination (compulsory)
* Filtering
* Searching
* Sorting

Other standards:
* Use proper HTTP status codes.
* Return consistent API responses.

---

## Security Requirements

Your project should include as many production security practices as possible.

### Minimum Expectations
* Helmet
* CORS
* Rate Limiting
* Request Validation
* Password Hashing
* JWT Authentication & Refresh Tokens
* Role-Based Access Control (RBAC)
* Secure Environment Variables
* NoSQL/SQL Injection Prevention
* XSS Protection
* CSRF considerations (where applicable)
* Webhook Signature Verification
* Audit Logging
* Proper Authorization Checks

### Bonus
* Two-Factor Authentication (2FA)
* Login Attempt Limiting
* Device Sessions
* Token Blacklisting

---

## Engineering Expectations

Your codebase should demonstrate software engineering best practices.

### Expected Folder Structure
```
src/
├── controllers/
├── services/
├── repositories/
├── entities/
├── middlewares/
├── routes/
├── validators/
├── config/
├── utils/
├── interfaces/
├── types/
├── database/
├── migrations/
└── subscribers/
```

### Development Principles
* Apply **SOLID Principles**
* Dependency Injection where appropriate
* Separation of Concerns
* Reusable Services
* Clean Folder Structure
* Consistent Naming
* Error Handling
* Logging

---

## Deployment & DevOps

### Deployment
* Deploy the API to a public platform.
* The deployed API must be publicly accessible.

### Version Control
Push your code to GitHub (or any Git-based version control platform). Your repository should contain:
* Meaningful commits
* Proper README
* Installation Guide
* Environment Variables
* ER Diagram
* Deployment Link

---

## Documentation

Submit:
* Complete Postman Documentation
* API Environment
* Sample Requests
* Sample Responses
* Authentication Guide

---

## Submission Requirements

Each student must submit:
* GitHub Repository
* Live API URL
* Postman Documentation
* `README.md`
* ER Diagram
* Database Migration Files
* Test Credentials (Admin, Customer & Car Owner)

---

## Bonus Marks

Additional marks will be awarded for implementing:
* Docker
* GitHub Actions (CI/CD)
* Redis Caching
* Queue System (BullMQ)
* Email Queue
* Swagger/OpenAPI
* Unit Tests & Integration Tests
* Event-Driven Architecture
* WebSockets
* Soft Deletes
* Scheduled Jobs (Cron)
* Database & Query Performance Optimization
* Multi-environment Configuration

---

## Final Challenge

There is intentionally no step-by-step guide for this project. A senior backend engineer is expected to research unfamiliar concepts, evaluate trade-offs, design scalable systems, and solve problems independently.

You are free to choose your architecture and implementation strategy, but every technical decision should be justifiable. Your code should reflect production standards, not just satisfy functional requirements. This project is designed to test your readiness for real-world backend engineering roles.
