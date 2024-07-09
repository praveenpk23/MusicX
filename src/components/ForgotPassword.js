import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleReset = async () => {
        if (!email) {
            setShowAlert(true);
            return;
        }

        try {
            // Attempt to send the password reset email
            await firebase.auth().sendPasswordResetEmail(email);
            setIsSent(true);
            toast.success('Password reset email sent!');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.error('Email not found. Please check the email address.');
            } else {
                toast.error('Failed to send reset email. Please try again.');
                console.error(error.message);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                bgcolor: '#f5f5f5',  // Light background for better contrast
                padding: 2,
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Reset Password
                </Typography>
                <TextField
                    type="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!email && showAlert}  // Highlight the field in red if empty on submit
                    helperText={!email && showAlert ? "Email is required" : ""}
                    disabled={isSent}  // Disable the email input after sending the reset email
                />
                <Button
                    variant="contained"
                    onClick={handleReset}
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSent || !email}  // Button remains disabled after sending the reset email
                >
                    {isSent ? "Reset Email Sent" : "Reset Password"}
                </Button>
                {isSent && (
                   <>
                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                        Password reset email sent!<br />
                        If you do not receive it within a few minutes, please check your spam or junk folder.
                    </Typography>
                    <Link to='/' >Go to Login</Link>
                   </>
                )}
                <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                    <Alert onClose={() => setShowAlert(false)} severity={email ? "success" : "error"} sx={{ width: '100%' }}>
                        {email ? "Password reset email sent!" : "Please enter a valid email address."}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default ResetPassword;
