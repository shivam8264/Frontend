import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../resetPassword.module.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "bottom-right",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/reset-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Password reset successful", {
                    position: "bottom-right",
                });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            } else {
                toast.error(data.message || "Error resetting password", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            toast.error("Network error", {
                position: "bottom-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer className={styles.toastContainer} />
            <div className={styles.resetPasswordCard}>
                <h2 style={{color:"#343a40",marginBottom:"1.5rem",fontSize:"1.5rem"}}>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>New Password</label>
                        <input
                            type="password"
                            className={styles.formControl}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                        <input
                            type="password"
                            className={styles.formControl}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
