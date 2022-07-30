import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
   
    const handleChange = (e) => {
     const {name, value} = e.target;
     setLoginData(prev => ({
        ...prev,
        [name]: value
     }))
    }

  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    {Object.keys(loginData).map(el=> <TextField id={el} value={loginData[el]} name={el} onChange={handleChange} label={el.toLocaleUpperCase()} variant="outlined" />)}
    <div className = "container">
        <button classname = "btn btn-primary">Login</button>
    </div>
  </Box>
  )
}