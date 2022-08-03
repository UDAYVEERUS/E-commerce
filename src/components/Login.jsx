import { TextField,Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/Auth/action'

const Login = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [token,setToken] = useState("")
    const navigate = useNavigate()

    const handleLogin= (email,password) => {
        const data={
            email,
            password
        }
        fetch(`https://reqres.in/api/login`,{
            method:"POST",
            body: JSON.stringify(data),
            headers:{
                "content-Type" : "application/json"
            }
        }).then((res) => res.json())
        .then((res) => {
          console.log(res)
          login(res);
          navigate("/")
        })
        .catch((err) => console.log(err))
    }
  return (
    <div>
      <h1>Login</h1>
      <div><TextField value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' id="outlined-basic" label="Email" variant="outlined" /></div><br />
      <div><TextField value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Password' id="outlined-basic" label="Password" variant="outlined" /></div><br />
      <Button onClick={(() => handleLogin(email,pass))} variant="contained">LOGIN</Button>
    </div>
  )
}

export default Login