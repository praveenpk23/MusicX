import React from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';

const Navbar = ({email}) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const NavigateAdmin =()=>{
    navigate('/Admin')
  }

  const handleConfirmLogout = async () => {
    await firebase.auth().signOut();
    navigate('/');
  };

  return (
    <>
      <AppBar position="fixed" >
        <Toolbar>
          <Typography  variant="h6" style={{ flexGrow: 1 }}>
            <Link to='/' style={{color:"white",textDecoration:"none",marginRight:"20px"}}>            MusiceX
</Link>
{/* {email} */}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          <Button color="inherit" onClick={NavigateAdmin}>Admin</Button>
        </Toolbar>
      </AppBar>
      
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
