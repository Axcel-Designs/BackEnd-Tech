# Backend Project: The "GigFlow" Pro Onboarding API

Project Scenario

You have been hired as a Junior Backend Developer for GigFlow, a platform connecting independent contractors (freelancers) with local clients. Your task is to build a robust Service Provider Management System.

Instead of a traditional school system, this API handles professional profiles, skill categorization, and a verification workflow.

1. The Data Model (Schema)
Your MongoDB collection should represent a Service Provider with the following fields:

| Field | Type | Details |
| :--- | :--- | :--- |
| fullName | String | Required, trim whitespace. |
| email | String | Required, Unique, lowercase. |
| phoneNumber | String | Required. |
| skillCategory | String | e.g., 'Web Dev', 'Plumbing', 'Design'. |
| gender | String | Enum: ['Male', 'Female', 'Other']. |
| address | String | The provider's base of operations. |
| isVerified | Boolean | Default: false. |

2.Technical Requirements
Phase A: Setup & Connection

    Initialize a Node.js project.
    Install express, mongoose, and dotenv.
    Connect to a MongoDB database (Atlas or Compass).
    Use a .env file to store your PORT and MONGODB_URI.

Phase B: RESTful Endpoints (CRUD)

Implement the following routes:

    POST /providers: Create a new profile.
    GET /providers: Fetch all profiles.
    GET /providers/:id: Fetch a specific profile by ID.
    PATCH /providers/:id: Update profile details.
    DELETE /providers/:id: Remove a profile.

3. The "Mid-Range" Twist (Logic Tasks)

To successfully complete this project, you must implement the following logic:

    Custom Verification Route: Create a dedicated PATCH /providers/:id/verify endpoint. This route should only update the isVerified field to true.
    Skill Search: Modify your GET /providers route to allow filtering by skill.
        Example: GET /providers?skill=Plumbing should only return providers in that category.
    Duplicate Prevention: If a user attempts to register with an email that already exists in the database, return a 409 Conflict status code with a message: "Profile already exists with this email."
    Global Error Handling: Implement a middleware function to handle $404$ (Not Found) and $500$ (Server Error) responses gracefully.

4. Submission Deliverables

    Source Code: A GitHub repository link or a zipped folder.
    Environment File: A .env.example file showing the required variables.
    JSON Export: A sample JSON object of a "Verified" provider.
