import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, FormControlLabel, Checkbox } from '@mui/material';
import 'firebase/auth';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const usersSnapshot = await firebase.firestore()
      .collection('Users')
      .where('email', '==', email)
      .get();

    if (!usersSnapshot.empty) {
      toast.error(`${email} already exists`);
      setLoading(false);
    } else {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.firestore().collection('Users').add({
          email: email,
        });
        Navigate('/Home');
        setLoading(false);
      } catch (error) {
        toast.error('Error signing up, please try again.');
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <>
        <Toaster />
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Sign Up
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
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSignup}
          >
            {loading ? (
              <CircularProgress size={25} style={{ color: "#fff" }} />
            ) : (
              "Sign Up"
            )}
          </Button>
          <hr />
          <Typography variant="body2" align="center">
            <Link to='/'>Already have an account? Log in</Link>
          </Typography>
        </Paper>
      </>
    </div>
  );
};

export default Signup;
