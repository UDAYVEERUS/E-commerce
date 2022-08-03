import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector } from 'react-redux'



export default function ButtonAppBar() {
  const navigate = useNavigate()
  const [state, setState] = React.useState(false);
  const token = useSelector(state => state.auth.token)


  const toggleDrawer = (open) => {
    setState(open);
  };

  const sendToLogin = () => {
    navigate('/login')
  }

  const sendToSignup = () => {
    navigate('/signup')
  }

  const sendToHome = () => {
    navigate('/')
  }
  const pageChange = (text) => {
    if(text == "Home"){
      return navigate(`/`)
    }
    const newText = text.toLowerCase()
    navigate(`/${newText}`)
}

const list = () => (
  <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={() => toggleDrawer(false)}
    onKeyDown={() => toggleDrawer(false)}
  >
    <List>
      {['Home', 'Grocery', 'Pharmacy','CartData','History'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={() => pageChange(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={sendToLogin}>
          <ListItemIcon style={{ fontSize: "20px" }}>
            {(!token) ? "Login" : "Logout"}
          </ListItemIcon>
          <ListItemText />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);
return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Drawer
        anchor={"left"}
        open={state}
        onClose={() => toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <Toolbar>
        <IconButton
          onClick={() => toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />

        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={sendToHome}>Home</Typography>
        <Button color="inherit" onClick={sendToLogin}>Login</Button>
        <Button color="inherit" onClick={sendToSignup}>Signup</Button>
      </Toolbar>
    </AppBar>
  </Box>
);
}