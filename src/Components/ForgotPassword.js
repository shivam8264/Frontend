import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Ensure this is imported
import styles from '../forgot_password.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Password reset link sent to your email", {
                    position: "bottom-right",
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(data.message || "Error sending reset link", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            toast.error("Network error", {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.forgotPasswordCard}>
                <h2 style={{marginBottom: "20px",textAlign:"center",color: "#333"}}>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Email address</label>
                        <input
                            type="email"
                            className={styles.formControl}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            id="email"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Send Reset Link
                    </button>
                </form>
            </div>
            <ToastContainer className="position-fixed bottom-0 end-0 p-3"/>
        </div>
    );
};

export default ForgotPassword;
