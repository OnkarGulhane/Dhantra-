import React from 'react';
import Button from '../components/common/Button';

export const NotFound = ({ onGoHome }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.25rem'
    }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
        The page or section you are looking for does not exist or has been moved.
      </p>
      {onGoHome && (
        <Button variant="primary" onClick={onGoHome}>
          Return to Dashboard
        </Button>
      )}
    </div>
  );
};

export default NotFound;
