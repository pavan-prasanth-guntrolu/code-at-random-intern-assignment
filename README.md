# Career Path App

Welcome to the Career Path App! This application helps users analyze their skill gaps for specific roles and generates a career roadmap to guide their learning journey.

## 🛠️ Tech Stack Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Axios**: Promise based HTTP client for the browser and node.js.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Body-parser**: Node.js body parsing middleware.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.

---

## 🚀 How to Run

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### 1. Backend Setup
The backend runs on port `5000`.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   You should see: `Server running on http://localhost:5000`

### 2. Frontend Setup
The frontend runs on Vite's default port (usually `5173`).

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Open the link shown in the terminal (e.g., `http://localhost:5173`) to view the app.

---

## 📡 API Endpoints

The backend provides the following RESTful API endpoints:

### 1. Skill Gap Analyzer
Analyzes the difference between a user's current skills and the required skills for a target role.

- **Endpoint**: `POST /api/skill-gap`
- **Body**:
  ```json
  {
    "targetRole": "Frontend Developer",
    "currentSkills": ["HTML", "CSS"]
  }
  ```
  *(Note: `currentSkills` can be an array of strings or a comma-separated string)*

- **Response**:
  ```json
  {
    "role": "Frontend Developer",
    "matchedSkills": ["html", "css"],
    "missingSkills": ["javascript", "react", "git"],
    "recommendations": "Focus on learning: javascript, react, git",
    "suggestedLearningOrder": ["javascript", "react", "git"]
  }
  ```

### 2. Career Roadmap Generator
Generates a phased learning roadmap for a specific role.

- **Endpoint**: `POST /api/roadmap`
- **Body**:
  ```json
  {
    "targetRole": "Backend Developer"
  }
  ```

- **Response**:
  ```json
  {
    "role": "Backend Developer",
    "roadmap": {
      "Phase 1": "Basics: Java Syntax, OOP, SQL Basics",
      "Phase 2": "Advanced: Spring Boot, REST APIs, Database Design",
      "Phase 3": "Projects: User Auth System, API Gateway, Cloud Deployment"
    }
  }
  ```

---

## 📝 Assumptions

- **Ports**: The application assumes port `5000` is free for the backend and port `5173` (default Vite port) is free for the frontend.
- **Data Persistence**: User queries are logged to a local file `backend/user_queries.json` for simple persistence. There is no external database required.
- **Roles**: The system currently supports a predefined set of roles: "Frontend Developer", "Backend Developer", and "Data Analyst". Other roles will return a generic roadmap.
- **Environment**: It is assumed that the user is running this in a local development environment with Node.js installed.
