import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './Redux/slices/authSlices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../login.module.css';
import loginImage from '../images/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const AUTO_LOGOUT_TIME = 60 * 60 * 1000;

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth || {});

    useEffect(() => {
        const handleUserActivity = () => {
            if (timeout) clearTimeout(timeout);
            setTimeout(logoutUser, AUTO_LOGOUT_TIME);
        };

        const logoutUser = () => {
            navigate('/login');
        };

        let timeout = setTimeout(logoutUser, AUTO_LOGOUT_TIME);
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(login(credentials)).unwrap();
            if (resultAction) {
                toast.success("Login Successful", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (err) {
            toast.error("Invalid Credentials", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.loginImage}>
                    <img src={loginImage} draggable="false" alt="Login" />
                </div>
                <div className={styles.loginFormContainer}>
                    <h2>Login To Continue NewsPlus</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>Email address</label>
                            <input 
                                type="email" 
                                className={styles.formControl} 
                                value={credentials.email} 
                                onChange={onChange} 
                                name="email" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                required 
                            />
                            <div id="emailHelp" className={styles.formText}>We'll never share your email with anyone else.</div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>Password</label>
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={credentials.password} 
                                    onChange={onChange} 
                                    className={styles.formControl} 
                                    name="password" 
                                    id="password" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className={styles.passwordToggle} 
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn} disabled={loading}>
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>
                    </form>
                    <div className={styles.forgotPassword}>
                        <Link to="/forget-Password">Forgot Password?</Link>
                    </div>
                    <div className={styles.createAccount}>
                        <Link to="/signup" style={{ cursor: 'pointer', color: '#007bff' }}>Create your Account →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
