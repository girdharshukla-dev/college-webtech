import { useState } from "react"
import { instructorLogin } from "../api/api"
import { useNavigate } from "react-router"

export default function InstructorLogin(){

  const [contact,setContact] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e){

    e.preventDefault()

    const data = await instructorLogin(contact,password)

    if(data.instructor_id){

      localStorage.setItem("instructor_id",data.instructor_id)
      localStorage.setItem("instructor_name",data.instructor_name)

      navigate("/instructor/dashboard")

    }

  }

  return(

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6">
          Instructor Login
        </h2>

        <input
          className="w-full mb-4 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Contact"
          onChange={e=>setContact(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="w-full bg-red-500 py-2 rounded">
          Login
        </button>

      </form>

    </div>

  )
}