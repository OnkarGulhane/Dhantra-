import React from 'react';
import Button from './Button';

export const EmptyState = ({
  icon = '📁',
  title = 'No Data Found',
  description = 'There are no records to display at the moment.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} style={{ marginTop: '1rem' }}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
