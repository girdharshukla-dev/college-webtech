import { useState, useEffect } from "react"
import { addCourse } from "../api/api"

export default function InstructorDashboard(){

  const [course_name,setCourseName] = useState("")
  const [duration,setDuration] = useState("")
  const [courses,setCourses] = useState([])

  const instructor_id = localStorage.getItem("instructor_id")
  const instructor_name = localStorage.getItem("instructor_name")

  useEffect(()=>{

    async function loadCourses(){

      const res = await fetch("http://localhost:3001/courses")
      const data = await res.json()

      const myCourses = data.filter(c => c.instructor_id == instructor_id)

      setCourses(myCourses)

    }

    loadCourses()

  },[])

  async function handleSubmit(e){

    e.preventDefault()

    const res = await addCourse({
      course_name,
      duration,
      instructor_id
    })

    alert(res.message)

    const updated = await fetch("http://localhost:3001/courses")
    const data = await updated.json()

    const myCourses = data.filter(c => c.instructor_id == instructor_id)

    setCourses(myCourses)

    setCourseName("")
    setDuration("")

  }

  return(

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-2xl mb-6">
        Instructor Dashboard
      </h1>

      <p className="mb-8 text-gray-400">
        Logged in as {instructor_name}
      </p>

      {/* Add Course */}

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-6 rounded w-96 mb-10"
      >

        <h2 className="text-lg mb-4">
          Add Course
        </h2>

        <input
          value={course_name}
          className="w-full mb-4 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Course Name"
          onChange={e=>setCourseName(e.target.value)}
        />

        <input
          value={duration}
          className="w-full mb-6 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Duration"
          onChange={e=>setDuration(e.target.value)}
        />

        <button className="w-full bg-red-500 py-2 rounded">
          Add Course
        </button>

      </form>

      {/* Instructor Courses */}

      <h2 className="text-xl mb-4">
        My Courses
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {courses.map(c => (

          <div
            key={c.course_id}
            className="bg-zinc-900 border border-zinc-800 rounded p-4"
          >

            <h3 className="text-lg mb-2">
              {c.course_name}
            </h3>

            <p className="text-gray-400 text-sm">
              Duration: {c.duration} weeks
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}