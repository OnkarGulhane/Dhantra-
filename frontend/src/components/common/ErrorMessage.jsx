import React from 'react';
import Button from './Button';

export const ErrorMessage = ({ message = 'An error occurred while fetching data.', onRetry }) => {
  return (
    <div style={{
      backgroundColor: 'var(--color-danger-bg)',
      border: '1px solid var(--color-danger)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '1rem 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-danger)' }}>
        <span style={{ fontSize: '1.25rem' }}>⚠</span>
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{message}</span>
      </div>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
