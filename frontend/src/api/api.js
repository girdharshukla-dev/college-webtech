const BASE = "http://localhost:3001"

export async function getCourses() {
  const res = await fetch(`${BASE}/courses`)
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  return res.json()
}

export async function register(data) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function enroll(course_id) {
  const user_id = localStorage.getItem("user_id")

  const res = await fetch(`${BASE}/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, course_id })
  })

  return res.json()
}


export async function instructorLogin(contact,password){

  const res = await fetch(`${BASE}/instructor/login`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ contact,password })
  })

  return res.json()
}

export async function addCourse(course){

  const res = await fetch(`${BASE}/courses`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(course)
  })

  return res.json()
}