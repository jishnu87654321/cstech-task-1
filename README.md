# MERN Stack Application

This is a MERN stack application for managing agents and distributing lists.

## Features

- Admin login with JWT authentication
- Add and manage agents
- Upload CSV files and distribute lists equally among 5 agents

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following:
   ```
   MONGO_URI=mongodb://localhost:27017/mernapp
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. Start MongoDB service.

5. Run the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

### Usage

1. Open the application in your browser (usually http://localhost:5173).
2. Login with admin credentials (you need to manually create an admin user in the database or add a seed script).
3. Add 5 agents.
4. Upload a CSV file with columns: FirstName, Phone, Notes.
5. View the distributed lists on the dashboard.

### Notes

- Ensure MongoDB is running.
- For CSV upload, only CSV files are supported for simplicity.
- The application distributes items equally among exactly 5 agents.