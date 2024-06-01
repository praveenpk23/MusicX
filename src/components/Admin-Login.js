import React, { useState,useEffect } from 'react';
import { TextField, Button, Paper, Typography,FormControlLabel ,Checkbox} from '@mui/material';
import  'firebase/auth'
import {CircularProgress} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const Navigate = useNavigate();
  const handleLogin = async () => {
      setLoading(true)
      const workersSnapshot = await firebase.firestore()
          .collection('Admin')
          .where('email', '==', email)
          .get();

        // if (workersSnapshot.empty) {
        //   toast.error(`${email} not found`)
        //   setLoading(false);
        // }
        // else{
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Navigate('/HomeX')
      setLoading(false)
    } catch (error) {
      toast.error('Email or Passwor is wrong , Please enter valid credentials.');
      setLoading(false)
    }
//   }
  };
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
  //     if (user) {
  //       // User is signed in.
  //       if(user.email){
  //         Navigate('/HomeX')
  //       }
  
  //     } else {
  //       // User is signed out.
  //       Navigate('/')
  //     }
  //   });
  
  //   // Cleanup function to unsubscribe when the component unmounts
  //   return () => unsubscribe();
  // }, []);
  return (
  <div style={{marginTop:"150px"}}>
      <>
      <Toaster />
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          MusiceX
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <FormControlLabel
          control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
          label="Show Password"
        />
        <Button
          disabled={loading}
          variant="contained"
          style={{ width: "100%", marginTop: 20 }}
          color="primary"
          onClick={handleLogin}
        >
          {loading ? (
            <CircularProgress size={25} style={{ color: "#fff" }} />
          ) : (
            "Login"
          )}
        </Button>
        <hr />
        <Typography variant="body2" align="center">
        New user ?
          <Link to='/SignUp'> SignUp</Link>
        </Typography>
      </Paper>
    </>
  </div>
  );

};

export default Login;
