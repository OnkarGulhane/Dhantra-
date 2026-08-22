import React from 'react';

export const Loader = ({ message = 'Loading data...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '1rem' }}>
      <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{message}</span>
    </div>
  );
};

export const SkeletonRow = () => (
  <div style={{ padding: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <div className="skeleton-loader" style={{ width: '30%', height: 20 }} />
    <div className="skeleton-loader" style={{ width: '20%', height: 20 }} />
    <div className="skeleton-loader" style={{ width: '25%', height: 20 }} />
    <div className="skeleton-loader" style={{ width: '15%', height: 20 }} />
  </div>
);

export default Loader;
