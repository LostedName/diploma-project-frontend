import React from 'react';
import { Link } from 'react-router-dom';
import './notFoundPage.scss';
const NotFoundPage: React.FC = () => {
  return (
    <main className="admin_notfound_page">
      <div>
        <h1>Page not found</h1>
        <Link to="/">Go to home page</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;