import express from "express"
import cors from "cors"
import { DatabaseSync } from "node:sqlite"
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto"
import { seedDatabase } from "./seedData.js"

const app = express()
app.use(cors())
app.use(express.json())

// open database file
const db = new DatabaseSync("portal.db")

/* ---------- CREATE TABLES ---------- */

db.exec(`
CREATE TABLE IF NOT EXISTS Users(
  user_id INTEGER PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS Instructors(
  instructor_id INTEGER PRIMARY KEY,
  instructor_name TEXT,
  expertise TEXT,
  contact TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS Courses(
  course_id INTEGER PRIMARY KEY,
  course_name TEXT,
  instructor_id INTEGER,
  duration INTEGER,
  FOREIGN KEY(instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE IF NOT EXISTS Enrollments(
  enrollment_id INTEGER PRIMARY KEY,
  user_id INTEGER,
  course_id INTEGER,
  enrollment_date TEXT,
  status TEXT,
  FOREIGN KEY(user_id) REFERENCES Users(user_id),
  FOREIGN KEY(course_id) REFERENCES Courses(course_id)
);
`)

seedDatabase(db, hashPassword)

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

function verifyPassword(password, stored) {
  const [salt, key] = stored.split(":")

  const hashBuffer = scryptSync(password, salt, 64)
  const keyBuffer = Buffer.from(key, "hex")

  return timingSafeEqual(hashBuffer, keyBuffer)
}

/* ---------- USERS ---------- */

app.post("/users", (req, res) => {
  const { username, email, password } = req.body

  const stmt = db.prepare(`
    INSERT INTO Users (username,email,password)
    VALUES (?,?,?)
  `)

  stmt.run(username, email, password)

  res.json({ message: "User created" })
})

app.get("/users", (req, res) => {
  const rows = db.prepare("SELECT * FROM Users").all()
  res.json(rows)
})

app.post("/register", (req, res) => {

  const { username, email, password } = req.body

  const hashed = hashPassword(password)

  const stmt = db.prepare(`
    INSERT INTO Users (username,email,password)
    VALUES (?,?,?)
  `)

  stmt.run(username, email, hashed)

  res.json({ message: "User created" })
})

app.post("/login", (req, res) => {

  const { email, password } = req.body

  const user = db.prepare(`
    SELECT * FROM Users WHERE email = ?
  `).get(email)

  if (!user) {
    return res.status(401).json({ error: "User not found" })
  }

  const valid = verifyPassword(password, user.password)

  if (!valid) {
    return res.status(401).json({ error: "Invalid password" })
  }

  res.json({
    message: "Login successful",
    user_id: user.user_id,
    username: user.username
  })
})

/* ---------- COURSES ---------- */

app.get("/courses", (req, res) => {
  const rows = db.prepare(`
    SELECT Courses.*, Instructors.instructor_name
    FROM Courses
    LEFT JOIN Instructors
    ON Courses.instructor_id = Instructors.instructor_id
  `).all()

  res.json(rows)
})

app.post("/courses", (req, res) => {
  const { course_name, instructor_id, duration } = req.body

  const stmt = db.prepare(`
    INSERT INTO Courses (course_name,instructor_id,duration)
    VALUES (?,?,?)
  `)

  stmt.run(course_name, instructor_id, duration)

  res.json({ message: "Course added" })
})

/* ---------- INSTRUCTORS ---------- */

app.get("/instructors", (req, res) => {
  const rows = db.prepare("SELECT * FROM Instructors").all()
  res.json(rows)
})

app.post("/instructors", (req, res) => {
  const { instructor_name, expertise, contact } = req.body

  const stmt = db.prepare(`
    INSERT INTO Instructors (instructor_name,expertise,contact)
    VALUES (?,?,?)
  `)

  stmt.run(instructor_name, expertise, contact)

  res.json({ message: "Instructor added" })
})

app.post("/instructor/register", (req, res) => {

  const { instructor_name, expertise, contact, password } = req.body

  const hashed = hashPassword(password)

  const stmt = db.prepare(`
    INSERT INTO Instructors (instructor_name,expertise,contact,password)
    VALUES (?,?,?,?)
  `)

  stmt.run(instructor_name, expertise, contact, hashed)

  res.json({ message: "Instructor created" })
})


app.post("/instructor/login", (req, res) => {

  const { contact, password } = req.body

  const instructor = db.prepare(`
    SELECT * FROM Instructors WHERE contact = ?
  `).get(contact)

  if (!instructor) {
    return res.status(401).json({ error: "Instructor not found" })
  }

  const valid = verifyPassword(password, instructor.password)

  if (!valid) {
    return res.status(401).json({ error: "Invalid password" })
  }

  res.json({
    instructor_id: instructor.instructor_id,
    instructor_name: instructor.instructor_name
  })

})
/* ---------- ENROLLMENTS ---------- */

app.post("/enroll", (req, res) => {
  const { user_id, course_id } = req.body

  const stmt = db.prepare(`
    INSERT INTO Enrollments (user_id,course_id,enrollment_date,status)
    VALUES (?,?,date('now'),'active')
  `)

  stmt.run(user_id, course_id)

  res.json({ message: "Enrollment successful" })
})

app.get("/enrollments", (req, res) => {
  const rows = db.prepare(`
    SELECT Enrollments.*, Users.username, Courses.course_name
    FROM Enrollments
    JOIN Users ON Enrollments.user_id = Users.user_id
    JOIN Courses ON Enrollments.course_id = Courses.course_id
  `).all()

  res.json(rows)
})

/* ---------- SERVER ---------- */

app.listen(3001, () => {
  console.log("Server running on port 3001")
})
