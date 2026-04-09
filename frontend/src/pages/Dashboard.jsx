import { useEffect, useState } from "react"
import StatBox from "../components/StatBox"

export default function Dashboard(){

  const [stats,setStats] = useState({
    enrolled:0,
    active:0,
    completed:0
  })

  const [courses,setCourses] = useState([])

  useEffect(()=>{

    async function load(){

      const user_id = localStorage.getItem("user_id")

      const res = await fetch("http://localhost:3001/enrollments")
      const data = await res.json()

      const userEnrollments = data.filter(e => e.user_id == user_id)

      const active = userEnrollments.filter(e => e.status === "active").length
      const completed = userEnrollments.filter(e => e.status === "completed").length

      setStats({
        enrolled:userEnrollments.length,
        active,
        completed
      })

      setCourses(userEnrollments)

    }

    load()

  },[])

  return(

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-2xl mb-8">
        Student Dashboard
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <StatBox label="Courses Enrolled" value={stats.enrolled} />
        <StatBox label="Completed" value={stats.completed} />
        <StatBox label="Active" value={stats.active} />
        <StatBox label="Certificates" value="0" />

      </div>

      {/* Course List */}

      <h2 className="text-xl mb-4">My Courses</h2>

      <div className="shadow rounded">

        <table className="w-full">

          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Course</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Enrollment Date</th>
            </tr>
          </thead>

          <tbody>

            {courses.map(course => (

              <tr key={course.enrollment_id} className="border-b">

                <td className="p-4">
                  {course.course_name}
                </td>

                <td className="p-4">
                  {course.status}
                </td>

                <td className="p-4">
                  {course.enrollment_date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}