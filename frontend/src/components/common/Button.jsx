import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="spinner" style={{ width: 16, height: 16, borderLineWidth: 2 }} />
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
