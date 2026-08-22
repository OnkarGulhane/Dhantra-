import React from 'react';

export const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  required = false,
  hint = '',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className={`form-label ${required ? 'form-label-required' : ''}`}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-control ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="form-error-msg">{error}</span>}
      {hint && !error && <span className="form-hint">{hint}</span>}
    </div>
  );
};

export default Input;
