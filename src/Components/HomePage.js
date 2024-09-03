import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactMessage, resetContactState } from './Redux/slices/contactSlice';
import { toast} from 'react-toastify';
import { Link ,useNavigate} from 'react-router-dom';
import styles from '../home.module.css';
import realTimeUpdatesIcon from '../images/update.png';
import userFriendlyIcon from '../images/add-friend.png';
import richContentIcon from '../images/transmit.png';
import secureAccessIcon from '../images/user.png';
import image_intro from '../images/news1.jpg';
import newsImage1 from '../images/newsc1.jpeg';
import newsImage2 from '../images/newsc2.jpeg';
import newsImage3 from '../images/newsc3.jpeg';
import newsImage4 from '../images/newsc4.jpeg';
import newsImage5 from '../images/newsc5.jpeg';
import newsImage6 from '../images/newsc6.jpeg';
import newsImage7 from '../images/newsc7.jpeg';
import newsImage8 from '../images/newsc8.jpg';
import news2 from '../images/news2.jpg';
import feature1 from '../images/feature1.png';
import feature2 from '../images/feature2.png';
import news3 from '../images/news3.jpg'
import news4 from '../images/news4.jpg'
import news5 from '../images/news5.jpeg'
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF';
  }, []);

  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [userCount, setUserCount] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const contactData = { Name, email, message };
    try {
      await dispatch(submitContactMessage(contactData)).unwrap();
      toast.success('Message sent successfully!');
      dispatch(resetContactState());
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      dispatch(resetContactState());
    }
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user-count');
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error('Error fetching user count', error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [isAuthenticated, user]);
  return (
    <>
      <div className={styles.hero1}>
        <div className={styles.secIntro}>
          <div className={styles.introArea}>
            <p className={styles.text}>Stay Informed, Stay Empowered, Always.</p>
            <p className={styles.text2}>Discover the latest news tailored to your interests and stay informed with real-time updates.</p>
            <Link type="button" to="/general" className={styles.btnPrimary}>Explore Now <i className="fas fa-arrow-right"></i></Link>
          </div>
          <img src={image_intro} alt='image_intro' draggable="false" className={styles.image} />
        </div>
      </div>
      <div className={styles.hero2}>
        <p className={styles.text3}>Why Choose NewsPlus</p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <img src={realTimeUpdatesIcon} alt="Real-time Updates" className={styles.icon} draggable="false" />
            <h3>Real-time Updates</h3>
            <p>Get the latest news as it happens.</p>
          </div>
          <div className={styles.feature}>
            <img src={userFriendlyIcon} alt="User Friendly" className={styles.icon} draggable="false" />
            <h3>User Friendly</h3>
            <p>Easily filter and search articles quickly.</p>
          </div>
          <div className={styles.feature}>
            <img src={richContentIcon} alt="Rich Content" className={styles.icon} draggable="false" />
            <h3>Rich Content</h3>
            <p>Access detailed and diverse news reports.</p>
          </div>
          <div className={styles.feature}>
            <img src={secureAccessIcon} alt="Secure Access" className={styles.icon} draggable="false" />
            <h3>Secure Access</h3>
            <p>Secure and private login solutions provided.</p>
          </div>
        </div>
        {!isAuthenticated && (
          <Link type="button" to="/login" className={styles.joinBtn}>
            Join Us Today
          </Link>)}
      </div>
      <div className={styles.hero3}>
        <p className={styles.text4}>Dive Into Trending News</p>
        <p className={styles.text5}>Explore diverse topics and insights.</p>
        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>
            <Link to="/business"><img src={newsImage1} alt="News 1" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Business</p>
            <h3 className={styles.newsTitle}>Global Trade Dynamics and Their Impact</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/entertainment"><img src={newsImage2} alt="News 2" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Entertainment</p>
            <h3 className={styles.newsTitle}>Cultural Shifts in Modern Entertainment</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/general"><img src={newsImage3} alt="News 3" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>General</p>
            <h3 className={styles.newsTitle}>Innovative Solutions to Global Problems</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/health"><img src={newsImage4} alt="News 4" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Health</p>
            <h3 className={styles.newsTitle}>Healthy Living: Tips for a Balanced Lifestyle</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/science"><img src={newsImage5} alt="News 5" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Science</p>
            <h3 className={styles.newsTitle}>Environmental Science: Key Issues and Solutions</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/sports"><img src={newsImage6} alt="News 6" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Sports</p>
            <h3 className={styles.newsTitle}>The Evolution of Sports Technology</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/technology"><img src={newsImage7} alt="News 7" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Technology</p>
            <h3 className={styles.newsTitle}>Emerging Technologies That Will Change the World</h3>
          </div>
          <div className={styles.newsCard}>
            <Link to="/business"><img src={newsImage8} alt="News 8" className={styles.newsImage} draggable="false" /></Link>
            <p className={styles.newsCategory}>Economical</p>
            <h3 className={styles.newsTitle}>The Impact of Inflation on Everyday Life</h3>
          </div>
        </div>
      </div>
      <div className={styles.hero4}>
        <div className={styles.imageSection}>
          <img src={news2} alt="Intro" className={styles.introImage} draggable="false" />
        </div>
        <div className={styles.textSection}>
          <p className={styles.sectionText}>Explore Our Great Features</p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <img src={feature1} alt="Feature1" className={styles.icon} draggable="false" />
              <h3>News at Fingertips</h3>
              <p>Access news anywhere with API integration.</p>
            </div>
            <div className={styles.feature}>
              <img src={feature2} alt="Feature2" className={styles.icon} draggable="false" />
              <h3>Custom Filters</h3>
              <p>Set date ranges to filter news.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hero5}>
        <div className={styles.textSection5}>
          <p className={styles.text6}>Ultimate News Platform for You</p>
          <p className={styles.text7}>Stay updated with real-time articles tailored to your preferences, and enjoy a seamless reading experience.</p>
          <Link type="button" to="/business" className={styles.readMoreBtn}>Read More Now</Link>
        </div>
        <div className={styles.imageSection5}>
          <img src={news3} alt="Hero 5" className={styles.hero5Image} draggable="false" />
        </div>
      </div>
      <div className={styles.hero6}>
        <div className={styles.imageSection6}>
          <img src={news4} className={styles.hero6Image} alt="Hero 6" />
        </div>
        <div className={styles.textSection6}>
          <h2 className={styles.text8}>Effortless Content Filtering</h2>
          <p className={styles.text9}>
            Filter and search articles by date, category, or tags and find exactly what you need.
          </p>
          <Link className={styles.disMoreBtn} to='/general'>Discover More</Link>
        </div>
      </div>
      <div className={styles.hero8}>
        <div className={styles.textSection8}>
          <h2>Introducing NewsBook</h2>
          <p>
            Welcome to NewsBook - your personal space to write, save, and manage notes.
            With NewsBook, you can perform CRUD(Create-Read-Update-Delete) operations on your notes and keep them
            organized. This feature is available exclusively for authenticated users.
          </p>
          <p>
            <strong>If you want to comment or give your likes on news articles, it is mandatory to authenticate first.</strong>
          </p>
          <Link className={styles.hero8Button} to="/newsbook">
            Go to NewsBook
          </Link>
        </div>
        <div className={styles.imageSection8}>
          <img src={news5} alt="newsbook" draggable="false" />
        </div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.section_field}>
          <div className={styles.section1}>
            <h2 className={styles.text10}>{userCount !== null ? userCount : 'Loading...'}</h2>
            <p className={styles.text11}>
              Active daily users on platform
            </p>
          </div>
          <div className={styles.section1}>
            <h2 className={styles.text10}>6 Categories</h2>
            <p className={styles.text11}>
              Articles categories available
            </p>
          </div>
          <div className={styles.section1}>
            <h2 className={styles.text10}>87%</h2>
            <p className={styles.text11}>
              User satisfaction with news content
            </p>
          </div>
        </div>
      </div>
      <div className={styles.hero7}>
        <div className={styles.contactDetails}>
          <p>We're here to help</p>
          <h2>Get In Touch</h2>
          <p>Reach out for collaborations.</p>
          <ul>
            <li><i className="fa fa-envelope"></i> contactsnewsplus@gmail.com</li>
            <li><i className="fa fa-phone"></i> +91 9699499933</li>
            <li><i className="fa fa-map-marker"></i> Thane, Maharashtra, India 400 607</li>
          </ul>
        </div>
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button style={{ marginTop: "10px" }} type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className={styles.copyrightSection}>
        <p>© 2024 NewsPlus by Shivam Yadav. All rights reserved.</p>
      </div>
    </>
  );
};

export default Home;
