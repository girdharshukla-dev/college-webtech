import { useState } from "react"
import { useNavigate } from "react-router"

export default function InstructorRegister(){

  const [instructor_name,setInstructorName] = useState("")
  const [expertise,setExpertise] = useState("")
  const [contact,setContact] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e){

    e.preventDefault()

    const res = await fetch("http://localhost:3001/instructor/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        instructor_name,
        expertise,
        contact,
        password
      })
    })

    const data = await res.json()

    alert(data.message)

    navigate("/instructor/login")

  }

  return(

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-8 rounded w-96"
      >

        <h2 className="text-xl mb-6">
          Instructor Register
        </h2>

        <input
          className="w-full mb-4 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Instructor Name"
          onChange={e=>setInstructorName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 bg-black border border-zinc-800 rounded"
          placeholder="Expertise"
          onChange={e=>setExpertise(e.target.value)}
        />

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
          Register
        </button>

      </form>

    </div>

  )
}