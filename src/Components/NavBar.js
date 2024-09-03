import React, { useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import "../navbar.css";
import { useSelector, useDispatch } from 'react-redux';
import user from '../images/user_login.png'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { logout } from './Redux/slices/authSlices';
import { useNavigate } from 'react-router-dom';

const countries = [
    { name: 'United Arab Emirates', code: 'ae' },
    { name: 'Argentina', code: 'ar' },
    { name: 'Austria', code: 'at' },
    { name: 'Australia', code: 'au' },
    { name: 'Belgium', code: 'be' },
    { name: 'Bulgaria', code: 'bg' },
    { name: 'Brazil', code: 'br' },
    { name: 'Canada', code: 'ca' },
    { name: 'Switzerland', code: 'ch' },
    { name: 'China', code: 'cn' },
    { name: 'Colombia', code: 'co' },
    { name: 'Cuba', code: 'cu' },
    { name: 'Czech Republic', code: 'cz' },
    { name: 'Germany', code: 'de' },
    { name: 'Egypt', code: 'eg' },
    { name: 'France', code: 'fr' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'Greece', code: 'gr' },
    { name: 'Hong Kong', code: 'hk' },
    { name: 'Hungary', code: 'hu' },
    { name: 'Indonesia', code: 'id' },
    { name: 'Ireland', code: 'ie' },
    { name: 'Israel', code: 'il' },
    { name: 'India', code: 'in' },
    { name: 'Italy', code: 'it' },
    { name: 'Japan', code: 'jp' },
    { name: 'South Korea', code: 'kr' },
    { name: 'Lithuania', code: 'lt' },
    { name: 'Latvia', code: 'lv' },
    { name: 'Morocco', code: 'ma' },
    { name: 'Mexico', code: 'mx' },
    { name: 'Malaysia', code: 'my' },
    { name: 'Nigeria', code: 'ng' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Norway', code: 'no' },
    { name: 'New Zealand', code: 'nz' },
    { name: 'Philippines', code: 'ph' },
    { name: 'Poland', code: 'pl' },
    { name: 'Portugal', code: 'pt' },
    { name: 'Romania', code: 'ro' },
    { name: 'Serbia', code: 'rs' },
    { name: 'Russia', code: 'ru' },
    { name: 'Saudi Arabia', code: 'sa' },
    { name: 'Sweden', code: 'se' },
    { name: 'Singapore', code: 'sg' },
    { name: 'Slovenia', code: 'si' },
    { name: 'Slovakia', code: 'sk' },
    { name: 'Thailand', code: 'th' },
    { name: 'Turkey', code: 'tr' },
    { name: 'Taiwan', code: 'tw' },
    { name: 'Ukraine', code: 'ua' },
    { name: 'United States', code: 'us' },
    { name: 'Venezuela', code: 've' },
    { name: 'South Africa', code: 'za' }
];

const NavBar = ({ onCountryChange, onSearch }) => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleCountryChange = (event) => {
        event.preventDefault(); 
        const selectedCountryCode = event.target.getAttribute("data-country-code");
        onCountryChange(selectedCountryCode);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleLogout = async  (e) => {
        e.preventDefault();
        try {
            const resultAction = dispatch(logout());
            if (resultAction) {
                toast.success("Logout Successful", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (err) {
            toast.error("Error occurred.", {
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

    return (
        <div>
            <ToastContainer className="position-fixed bottom-0 end-0 p-3" />
            <nav className={`navbar navbar-expand-lg fixed-top navbar-${theme} bg-${theme}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 me-5" to="/">NewsPlus</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/business" ? 'active' : ""}`} to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/entertainment" ? 'active' : ""}`} to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/general" ? 'active' : ""}`} to="/general">General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/health" ? 'active' : ""}`} to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/science" ? 'active' : ""}`} to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/sports" ? 'active' : ""}`} to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/technology" ? 'active' : ""}`} to="/technology">Technology</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ""}`} to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select Country <i className="fa-solid fa-angle-down toggle"></i>
                                </Link>
                                <ul className="dropdown-menu custom-shadow">
                                    {countries.map((country) => (
                                        <li key={country.code}>
                                            <Link className="dropdown-item" to="/" data-country-code={country.code} onClick={handleCountryChange}>
                                                {country.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex search me-5" role="search" style={{ backgroundColor: theme === 'dark' ? 'white' : '#b7b8bb' }} onSubmit={handleSearchSubmit}>
                            <i className="fa-solid icon fa-magnifying-glass me-2"></i>
                            <input className="search-input" type="search" placeholder="Type to search..." aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                        </form>
                        <div className="theme me-4">
                            <i className={`bi bi-${theme === 'dark' ? 'moon-stars' : 'sun'}-fill text-${theme === 'dark' ? 'light' : 'dark'} fs-3`} onClick={toggleTheme}></i>
                        </div>
                        {isAuthenticated ? (
                            <div className="d-flex align-items-center user-menu">
                                <img src={user} alt="User" draggable="false" className="user-icon" />
                                <div className="dropdown-content">
                                    <Link to="/bookmarks">Bookmark Articles</Link>
                                    <Link to="/newsbook">NewsBook</Link>
                                    <Link to="/about">About NewsBook</Link>
                                    <Link to="/message-board">NewsPlus Community</Link>
                                    <Link to="/" onClick={handleLogout}>Logout</Link>
                                </div>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <Link to="/login" className="btn btn-secondary me-3">Login</Link>
                                <Link to="/signup" className="btn btn-secondary">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

NavBar.propTypes = {
    onCountryChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default NavBar;
