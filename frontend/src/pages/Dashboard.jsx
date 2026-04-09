import { useEffect, useState } from "react"
import StatBox from "../components/StatBox"

export default function Dashboard(){

  const [stats,setStats] = useState({
    enrolled:0,
    active:0,
    completed:0
  })

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

    }

    load()

  },[])

  return(

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-2xl mb-8">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <StatBox label="Courses Enrolled" value={stats.enrolled} />
        <StatBox label="Completed" value={stats.completed} />
        <StatBox label="Active" value={stats.active} />
        <StatBox label="Certificates" value="0" />

      </div>

    </div>

  )

}