import React from 'react';
import styles from '../../About.module.css';

const About = () => {
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>About NewsBook</h1>
      <p className={styles.lead}>
        NewsBook is a powerful note-taking application that allows users to efficiently create, manage, and organize their notes. With NewsBook, you can easily perform CRUD (Create, Read, Update, Delete) operations on your notes, ensuring that your important information is always at your fingertips.
      </p>
      
      <h2>Features</h2>
      <ul className={styles.featuresList}>
        <li className={styles.featureItem}><i className="fas fa-check-circle"></i> Create new notes quickly and easily</li>
        <li className={styles.featureItem}><i className="fas fa-check-circle"></i> Read and review your notes at any time</li>
        <li className={styles.featureItem}><i className="fas fa-check-circle"></i> Update existing notes to keep them current</li>
        <li className={styles.featureItem}><i className="fas fa-check-circle"></i> Delete notes that are no longer needed</li>
        <li className={styles.featureItem}><i className="fas fa-check-circle"></i> Securely store your notes with user authentication</li>
      </ul>
      
      <h2>Technology Stack</h2>
      <p>
      NewsBook is built using the latest technologies to provide a seamless and efficient user experience:
      </p>
      <ul className={styles.technologyList}>
        <li className={styles.technologyItem}><i className="fab fa-react"></i> React.js for the frontend</li>
        <li className={styles.technologyItem}><i className="fab fa-node"></i> Node.js and Express for the backend</li>
        <li className={styles.technologyItem}><i className="fas fa-database"></i> MongoDB for the database</li>
        <li className={styles.technologyItem}><i className="fab fa-bootstrap"></i> Bootstrap for styling and responsive design</li>
      </ul>
    </div>
  );
};

export default About;
