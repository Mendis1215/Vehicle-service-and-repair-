# Yasarathna Motors - Vehicle Service & Repair

A modern, responsive full-stack website built for a professional vehicle mechanic and service company in Balapitiya.

##  Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication

## Features

- **Dynamic Public Website:** Displays services, gallery, customer reviews, and contact details.
- **Admin Dashboard:** Fully protected dashboard for the business owner to manage the website content.
- **Service Management:** Admin can add, edit, or delete services displayed on the website.
- **Gallery Management:** Admin can add photos (via URL) or YouTube video links to showcase past work.
- **Review System:** Customers can submit reviews. Admin can approve, hide, or delete reviews before they appear publicly.
- **Contact Messages:** Customers can send messages which appear directly in the admin dashboard.

## Setup Instructions

1. **Backend Setup:**
   - Navigate to the `server` directory.
   - Run `npm install` to install dependencies.
   - Create a `.env` file based on `.env.example`.
   - Run `npm run dev` to start the backend server on port 5000.

2. **Frontend Setup:**
   - Navigate to the `client` directory.
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the frontend on port 5173.

## 🔑 Default Admin Access
- **URL:** `http://localhost:5173/admin/login`

