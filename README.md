# EduPortal – Online Learning Portal

A minimal full-stack learning management system built using **React (frontend)** and **Node.js + SQLite (backend)**.
The system allows **students to register, enroll in courses, and view their dashboard**, while **instructors can register, login, and create courses**.

This project was built as a **web technologies lab project** focusing on REST APIs, SQL schema design, and frontend integration.

---

# Features

## Student Features

* Register a new account
* Login authentication with hashed passwords
* View all available courses
* Enroll in courses
* View enrolled courses on dashboard
* Dashboard statistics:

  * Total courses enrolled
  * Active courses
  * Completed courses

## Instructor Features

* Instructor registration
* Instructor login
* Instructor dashboard
* Add new courses
* View courses created by the instructor

## General Features

* Navbar shows currently logged-in user
* Separate student and instructor authentication
* Password hashing using **Node crypto (scrypt)**
* SQLite database
* REST API architecture
* Minimal UI using **React + Tailwind CSS**

---

# Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* SQLite (node:sqlite)
* Crypto module (scrypt hashing)

### Database

SQLite relational schema.

---

# Project Structure

```
EduPortal
│
├── backend
│   ├── server.js
│   ├── seedData.js
│   └── portal.db
│
└── frontend
    └── src
        ├── api
        │   └── api.js
        │
        ├── components
        │   ├── Navbar.jsx
        │   ├── Card.jsx
        │   └── StatBox.jsx
        │
        ├── pages
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Courses.jsx
        │   ├── Dashboard.jsx
        │   ├── InstructorLogin.jsx
        │   ├── InstructorRegister.jsx
        │   └── InstructorDashboard.jsx
        │
        ├── App.jsx
        └── main.jsx
```

---

# Database Schema

## Users

```
Users
-----
user_id (PK)
username
email
password
```

## Instructors

```
Instructors
-----------
instructor_id (PK)
instructor_name
expertise
contact
password
```

## Courses

```
Courses
-------
course_id (PK)
course_name
instructor_id (FK)
duration
```

## Enrollments

```
Enrollments
-----------
enrollment_id (PK)
user_id (FK)
course_id (FK)
enrollment_date
status
```

---

# API Endpoints

## Student Authentication

### Register

```
POST /register
```

### Login

```
POST /login
```

---

## Instructor Authentication

### Instructor Register

```
POST /instructor/register
```

### Instructor Login

```
POST /instructor/login
```

---

## Courses

### Get All Courses

```
GET /courses
```

### Add Course (Instructor)

```
POST /courses
```

---

## Enrollment

### Enroll in Course

```
POST /enroll
```

### Get All Enrollments

```
GET /enrollments
```

---

# Installation

## 1 Clone the repository

```
git clone <repo-url>
```

---

## 2 Backend Setup

Navigate to backend folder:

```
cd backend
```

Install dependencies:

```
npm install express cors
```

Run server:

```
node server.js
```

Server runs on:

```
http://localhost:3001
```

---

## 3 Frontend Setup

Navigate to frontend:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Seed Data

The backend automatically seeds initial data if the database is empty.

Default users:

| User        | Email                                       | Password |
| ----------- | ------------------------------------------- | -------- |
| Alice       | [alice@test.com](mailto:alice@test.com)     | 1234     |
| Bob         | [bob@test.com](mailto:bob@test.com)         | 1234     |
| Charlie     | [charlie@test.com](mailto:charlie@test.com) | 1234     |

Default instructors:

| Instructor  | Contact                                 | Password |
| ----------- | --------------------------------------- | -------- |
| Dr. Smith   | [smith@test.com](mailto:smith@test.com) | 1234     |
| Prof. Adams | [adams@test.com](mailto:adams@test.com) | 1234     |
| Dr. Lee     | [lee@test.com](mailto:lee@test.com)     | 1234     |

---

# Authentication

Passwords are stored using **scrypt hashing**.

Example format:

```
salt:hash
```

Verification uses:

```
timingSafeEqual()
```

to prevent timing attacks.

---

# Limitations

This is a **lab project**, so some production features are missing:

* No JWT authentication
* No role based middleware
* Client side filtering of instructor courses
* No input validation
* No session management

---

# Future Improvements

Possible enhancements:

* JWT authentication
* Role based authorization
* Instructor course management (edit/delete)
* Certificate generation
* Pagination for courses
* Better UI/UX
* Instructor analytics dashboard

---