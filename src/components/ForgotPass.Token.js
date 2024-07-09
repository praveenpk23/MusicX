import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const ChangePasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const { token } = useParams();

    useEffect(() => {
        firebase.auth().verifyPasswordResetCode(token)
            .then(() => setIsTokenValid(true))
            .catch((error) => console.error(error.message));
    }, [token]);

    const handleChangePassword = async () => {
        try {
            await firebase.auth().confirmPasswordReset(token, newPassword);
            // Password updated successfully
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            {isTokenValid ? (
                <div>
                    <TextField
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button onClick={handleChangePassword}>Change Password</Button>
                </div>
            ) : (
                <p>Invalid or expired password reset token.</p>
            )}
        </div>
    );
};

export default ChangePasswordPage;
