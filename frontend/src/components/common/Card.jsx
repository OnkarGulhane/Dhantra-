import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  footer,
  interactive = false,
  glass = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'card',
    interactive ? 'card-interactive' : '',
    glass ? 'card-glass' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {(title || subtitle || action) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
