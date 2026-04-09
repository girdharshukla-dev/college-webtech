export function seedDatabase(db, hashPassword) {

  const users = db.prepare("SELECT COUNT(*) as count FROM Users").get()

  if (users.count > 0) {
    return
  }

  console.log("Seeding database...")

  /* ---------- USERS ---------- */

  const insertUser = db.prepare(`
    INSERT INTO Users (username,email,password)
    VALUES (?,?,?)
  `)

  insertUser.run("Alice", "alice@test.com", hashPassword("1234"))
  insertUser.run("Bob", "bob@test.com", hashPassword("1234"))
  insertUser.run("Charlie", "charlie@test.com", hashPassword("1234"))

  /* ---------- INSTRUCTORS ---------- */

  const insertInstructor = db.prepare(`
    INSERT INTO Instructors (instructor_name,expertise,contact)
    VALUES (?,?,?)
  `)

  insertInstructor.run("Dr. Smith","Web Security","smith@test.com")
  insertInstructor.run("Prof. Adams","React Development","adams@test.com")
  insertInstructor.run("Dr. Lee","Database Systems","lee@test.com")

  /* ---------- COURSES ---------- */

  const insertCourse = db.prepare(`
    INSERT INTO Courses (course_name,instructor_id,duration)
    VALUES (?,?,?)
  `)

  insertCourse.run("Introduction to Web Security",1,6)
  insertCourse.run("React Fundamentals",2,8)
  insertCourse.run("Advanced SQL Queries",3,5)
  insertCourse.run("JavaScript Deep Dive",2,7)
  insertCourse.run("Backend Development with Node",2,6)
  insertCourse.run("Database Design",3,4)

  /* ---------- ENROLLMENTS ---------- */

  const insertEnroll = db.prepare(`
    INSERT INTO Enrollments (user_id,course_id,enrollment_date,status)
    VALUES (?,?,date('now'),'active')
  `)

  insertEnroll.run(1,1)
  insertEnroll.run(1,2)
  insertEnroll.run(2,3)
}