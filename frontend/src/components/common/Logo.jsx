import React from 'react';

export const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 28, text: '1rem', gap: '0.5rem' },
    md: { icon: 36, text: '1.25rem', gap: '0.625rem' },
    lg: { icon: 48, text: '1.75rem', gap: '0.875rem' }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div
      className={`brand-logo-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: currentSize.gap,
        userSelect: 'none'
      }}
    >
      <div
        className="brand-logo-icon"
        style={{
          width: currentSize.icon,
          height: currentSize.icon,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <svg
          width={currentSize.icon * 0.6}
          height={currentSize.icon * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Diamond Currency Crest Logo */}
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      {showText && (
        <span
          className="brand-logo-text"
          style={{
            fontSize: currentSize.text,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--color-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Dhantra
        </span>
      )}
    </div>
  );
};

export default Logo;
