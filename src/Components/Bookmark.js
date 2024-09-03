import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from './Redux/slices/bookmarksSlice';
import NewsItem from './NewsItem';
import styles from '../bookmark.module.css';
import { Spinner } from 'react-bootstrap';

const Bookmark = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmark.bookmarks || []);
  const status = useSelector((state) => state.bookmark.status);
  const error = useSelector((state) => state.bookmark.error);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  if (status === 'loading') {
    return <div><Spinner/></div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`container ${styles.content}`}>
      <h2 className={styles.heading}>Your Bookmarked Articles</h2>
      {bookmarks.length === 0 ? (
        <p className={styles.message}>You have no bookmarked articles.</p>
      ) : (
        <div className="row">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.newsUrl} className="col-md-4">
              <NewsItem
                title={bookmark.title}
                description={bookmark.description}
                imageUrl={bookmark.imageUrl}
                newsUrl={bookmark.newsUrl}
                author={bookmark.author}
                date={bookmark.date}
                source={bookmark.source}
                color="primary"
                category={bookmark.category}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
