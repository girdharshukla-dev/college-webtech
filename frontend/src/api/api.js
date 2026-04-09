const API = "http://localhost:3001"

export async function getCourses(){

  const res = await fetch(`${API}/courses`)
  return res.json()

}

export async function login(email,password){

  const res = await fetch(`${API}/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  })

  return res.json()

}

export async function register(data){

  const res = await fetch(`${API}/register`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

  return res.json()

}