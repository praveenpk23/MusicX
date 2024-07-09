import React, { useState,useEffect } from 'react';
import { TextField, Button, Paper, Typography,FormControlLabel ,Checkbox,Box} from '@mui/material';
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
          .collection('Users')
          .where('email', '==', email)
          .get();

        // if (workersSnapshot.empty) {
        //   toast.error(`${email} not found`)
        //   setLoading(false);
        // }
        // else{
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Navigate('/Home')
      setLoading(false)
    } catch (error) {
      toast.error('Email or Passwor is wrong , Please enter valid credentials.');
      setLoading(false)
    }
//   }
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        if(user.email){
          Navigate('/Home')
        }
  
      } else {
        // User is signed out.
        Navigate('/')
      }
    });
  
    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f2f5' }}>
        <>
            <Toaster />
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%', margin: '0 20px', bgcolor: 'background.paper' }}>
                <Typography variant="h4" component="div" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    MusiceX
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mt: 2 }}
                    required
                />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mt: 2 }}
                    required
                />
                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                <FormControlLabel
                    control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
                    label="Show Password"
                    sx={{ mt: 2 }}
                />
                <Button
                    disabled={loading}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, py: 1.5, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                    onClick={handleLogin}
                >
                    {loading ? (
                        <CircularProgress size={25} sx={{ color: "#fff" }} />
                    ) : (
                        "Login"
                    )}
                </Button>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        New user?
                        <Link to='/SignUp' style={{ textDecoration: 'none', color: '#3f51b5', marginLeft: 4 }}>Sign Up</Link>
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        <Link to='/ForgotPassword' style={{ textDecoration: 'none', color: '#3f51b5' }}>Forgot Password?</Link>
                    </Typography>
                </Box>
            </Paper>
        </>
    </Box>
);

};

export default Login;
