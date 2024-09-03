import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from './Redux/slices/authSlices';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, email, password, confirmPassword } = credentials;

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const resultAction = await dispatch(signup({ name, username, email, password })).unwrap();
            if (resultAction) {
                toast.success("Account Created Successfully", {
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
            if (err.error === "Username already taken") {
                toast.error("Username already exists. Please choose a different one.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (err.error==="User with this email already exists"){
                toast.error("Email already exists.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } 
            else {
                toast.error("Invalid Credentials.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={styles.container}>
            <ToastContainer className="position-fixed bottom-0 end-0 p-3" />
            <div className={styles.signupCard}>
                <div className={styles.signupFormContainer}>
                    <h2>Create an account to use NewsPlus</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.formLabel}>Name*</label>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                value={credentials.name} 
                                onChange={onChange} 
                                name='name' 
                                id="name" 
                                aria-describedby="nameHelp" 
                                required 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="username" className={styles.formLabel}>Username*</label>
                            <input 
                                type="text" 
                                className={styles.formControl} 
                                value={credentials.username} 
                                onChange={onChange} 
                                name='username' 
                                id="username" 
                                aria-describedby="usernameHelp" 
                                required 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>Email address*</label>
                            <input 
                                type="email" 
                                className={styles.formControl} 
                                value={credentials.email} 
                                onChange={onChange} 
                                name='email' 
                                id="email" 
                                aria-describedby="emailHelp" 
                                required 
                            />
                            <div id="emailHelp" className={styles.formText}>We'll never share your email with anyone else.</div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>Password*</label>
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name='password' 
                                    className={styles.formControl} 
                                    onChange={onChange} 
                                    value={credentials.password} 
                                    id="password" 
                                    minLength={5} 
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
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password*</label>
                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    name='confirmPassword' 
                                    className={styles.formControl} 
                                    onChange={onChange} 
                                    value={credentials.confirmPassword} 
                                    id="confirmPassword" 
                                    minLength={5} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className={styles.passwordToggle} 
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn} disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
