import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate()
  return (
    <div>
        <h1>Payment successfull</h1>
        <CheckCircleIcon color='success' style={{width:"100px",height:"100px"}}/>
        <br />
        <br />
        <Button color='success' variant="contained" onClick={() => navigate('/')}>Home</Button>
    </div>
  )
}

export default Success