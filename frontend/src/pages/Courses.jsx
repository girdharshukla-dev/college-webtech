import { useEffect,useState } from "react"
import { getCourses, enroll } from "../api/api"
import Card from "../components/Card"

export default function Courses(){

  const [courses,setCourses] = useState([])

  useEffect(()=>{
    getCourses().then(setCourses)
  },[])

  async function handleEnroll(course_id){

    const res = await enroll(course_id)

    alert(res.message)
  }

  return(

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-2xl mb-6">
        Courses
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {courses.map(c=>(

          <Card key={c.course_id}>

            <h3 className="text-lg mb-2">
              {c.course_name}
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              Instructor: {c.instructor_name}
            </p>

            <button
              onClick={()=>handleEnroll(c.course_id)}
              className="bg-red-500 px-4 py-2 rounded text-sm"
            >
              Enroll
            </button>

          </Card>

        ))}

      </div>

    </div>

  )
}