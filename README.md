# Team-Task-Manager
TEAM TASK MANAGER (FULL STACK PROJECT)

Project Overview:
Team Task Manager is a full-stack web application designed to manage team tasks efficiently. It allows users to create projects, assign tasks, and track progress using role-based access control (Admin and Member). The application ensures better task organization and accountability within a team.

Tech Stack:
Frontend:

* React (Vite)
* CSS (Custom Styling)

Backend:

* Node.js
* Express.js

Database:

* MongoDB (Atlas)

Deployment:

* Frontend: Vercel
* Backend: Railway

Key Features:

* User Authentication (Signup & Login)
* Role-Based Access (Admin / Member)
* Admin can create and assign tasks
* Members can view and update their assigned tasks
* Task status tracking (Pending, In Progress, Done)
* Dashboard with task statistics (Total, Pending, Done)
* Overdue task highlighting
* Clean and responsive UI

User Roles:

1. Admin:

* Can create tasks
* Can assign tasks to team members
* Can view all tasks

2. Member:

* Can view only assigned tasks
* Can update task status

Project Structure:

* client/ (Frontend - React)
* server/ (Backend - Node.js & Express)
* models/ (Database schemas)
* routes/ (API endpoints)
* middleware/ (Authentication & role handling)

API Endpoints:

* POST /api/auth/signup → Register user
* POST /api/auth/login → Login user
* GET /api/task → Get tasks
* POST /api/task → Create task
* PUT /api/task/:id → Update task status

How to Run Locally:

1. Clone the repository

2. Navigate to server folder

   * npm install
   * npm run dev

3. Navigate to client folder

   * npm install
   * npm run dev

4. Open browser at:
   http://localhost:5173

Environment Variables:
Backend (.env):

* MONGO_URI = your_mongodb_connection_string
* JWT_SECRET = your_secret_key

Frontend (.env):

* VITE_API_URL = backend_api_url

Live Project Links:
Frontend (Vercel):
https://team-task-manager-rosy-ten.vercel.app/




Future Improvements:

* Team collaboration features
* Notifications system
* Drag & Drop task board
* Email alerts for deadlines

Conclusion:
This project demonstrates full-stack development skills including frontend design, backend API development, database integration, authentication, and deployment.

---

Developed By:
Ribhu Bhushan Tiwari
