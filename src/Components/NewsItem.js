import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { toggleBookmark } from './Redux/slices/bookmarksSlice';
import styles from '../newsItem.module.css';
import generalImage from '../images/general.jpeg';
import businessImage from '../images/business.jpeg';
import entertainmentImage from '../images/entertainments.jpeg';
import healthImage from '../images/health.jpeg';
import scienceImage from '../images/science.jpeg';
import sportsImage from '../images/sports.jpeg';
import technologyImage from '../images/technology.jpeg';
import { useNavigate } from 'react-router-dom';

const categoryImages = {
  general: generalImage,
  business: businessImage,
  entertainment: entertainmentImage,
  health: healthImage,
  science: scienceImage,
  sports: sportsImage,
  technology: technologyImage
};

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, color, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmark?.bookmarks || []);
  const isBookmarked = bookmarks.some(bookmark => bookmark.newsUrl === newsUrl);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showShareIcons, setShowShareIcons] = useState(false);

  const handleIconClick = (action) => {
    if (isAuthenticated) {
      if (action === 'bookmark') {
        handleBookmarkToggle();
      } else if (action === 'share') {
        setShowShareIcons(prev => !prev);
      }
    } else {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        const tooltipInstance = Tooltip.getInstance(tooltipTriggerEl);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      });
      setShowShareIcons(prev => !prev);
      navigate('/login');
    }
  };

  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl);
    });
  }, [dispatch, newsUrl]);

  const fallbackImageUrl = categoryImages[category] || 'https://ak.picdn.net/shutterstock/videos/1418746/thumb/5.jpg';

  const handleBookmarkToggle = async () => {
    const response = await dispatch(toggleBookmark({ title, description, imageUrl, newsUrl, author, date, source, category, isBookmarked }));
    if (response.payload.message) {
      toast.success(response.payload.message);
    } else {
      toast.error('Something went wrong!');
    }
  };

  const handleShareClick = (platform) => {
    setShowShareIcons(false);
    switch (platform) {
      case 'facebook':
        shareOnFacebook(newsUrl);
        break;
      case 'twitter':
        shareOnTwitter(newsUrl, title);
        break;
      case 'linkedin':
        shareOnLinkedIn(newsUrl, title, description);
        break;
      case 'whatsapp':
        shareOnWhatsApp(newsUrl, title, imageUrl, description);
        break;
      default:
        toast.error('Unknown platform');
    }
  };

  const shareOnFacebook = (url, title, description) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}: ${encodeURIComponent(description)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnTwitter = (url, title) => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=news,breaking`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = (url, title, description) => {
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}&source=NewsPlus`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnWhatsApp = (url, title) => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title}\n\n\n${url}`)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container my-3 p-1">
      <div className={`card news-card p-3 mb-5 bg-white rounded ${styles.card}`}>
        <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${color}`} style={{ left: '90%', zIndex: '1' }}>
          {source}
        </span>
        <img
          src={imageUrl || fallbackImageUrl}
          className="card-img-top"
          draggable="false"
          alt="news"
        />
        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text">{description} ...</p>
          <p className="card-text">
            <small className={`text-${color}`}>By {author || "Unknown"} on {new Date(date).toGMTString()}</small>
          </p>
          <div className={`d-flex ${styles.actions}`}>
            <div className={styles.cl1}>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">
                Read More
              </a>
            </div>

            <div className={styles.cl2}>
              <i
                className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark fs-4 mx-3 icon-hover ${styles.bookmark}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                onClick={() => handleIconClick('bookmark')}
              ></i>
              <i
                className="fa-regular fa-share-from-square fs-3 icon-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title='Share this article'
                onClick={() => handleIconClick('share')}
              ></i>
              {showShareIcons && (
                <div className={styles.shareIcons}>
                  <i
                    className="fa-brands fa-facebook fs-4 mx-2 icon-hover"
                    style={{ color: "#1877F2" }}
                    title="Share on Facebook"
                    onClick={() => handleShareClick('facebook')}
                  ></i>
                  <i
                    className="fa-brands fa-x-twitter fs-4 mx-2 icon-hover"
                    title="Share on X"
                    style={{ color: "#1DA1F2" }}
                    onClick={() => handleShareClick('twitter')}
                  ></i>
                  <i
                    className="fa-brands fa-linkedin fs-4 mx-2 icon-hover"
                    title="Share on LinkedIn"
                    style={{ color: "#0077B5" }}
                    onClick={() => handleShareClick('linkedin')}
                  ></i>
                  <i
                    className="fa-brands fa-whatsapp fs-4 mx-2 icon-hover"
                    title="Share on WhatsApp"
                    style={{ color: "#25D366" }}
                    onClick={() => handleShareClick('whatsapp')}
                  ></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default NewsItem;
