Movie Application (MERN Stack)
A full-stack Movie Application built using MongoDB, Express.js, React, and Node.js.
This project supports User & Admin authentication, movie management, search functionality, and role-based access control.

Features
👤 User Features

User login & logout

View movies on home page

Search movies by name

View movie details

Secure authentication using JWT

🛠 Admin Features

Admin login

Admin dashboard

Add new movies

Update movie details

Upload movie posters

Delete movies

🔐 Authentication & Authorization

JWT based authentication

Role-based routing (Admin / User)

Tech Stack

Frontend

React

React Router DOM

Axios

Tailwind CSS

Context API

Backend

Node.js

Express.js

MongoDB

Mongoose

Multer (for image upload)

JWT

bcrypt
▶️ How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/your-username/movie-application.git
cd movie-application

2️⃣ Backend Setup
cd backend
npm install
npm start


Server will run on:

http://localhost:3000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173

API Endpoints (Sample)
Auth

POST /user/login

POST /user/logout

Movies

GET /movies

GET /movies/search?name=movieName

POST /movies/create (Admin)

PUT /movies/update/:id (Admin)

DELETE /movies/delete/:id (Admin)

🧠 Workflow Summary

App opens → Home page visible

User/Admin logs in

Backend returns JWT + role

Frontend stores auth state in Context API

Admin → redirected to Admin Dashboard

User → redirected to Home page

Navbar updates based on auth & role

Logout clears session and redirects to Home

📸 Image Upload

Movie posters are uploaded using Multer

Images are stored on server

Only image URL/path is saved in MongoDB

🧪 Future Improvements

Pagination

Movie ratings & reviews

Cloudinary integration

Refresh token authentication
ted routes

Secure logout API
