import React from 'react';

export const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
  error = '',
  required = false,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`select-control ${error ? 'input-error' : ''} ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
            {opt.label ?? opt.name}
          </option>
        ))}
      </select>
      {error && <span className="form-error-msg">{error}</span>}
    </div>
  );
};

export default Select;
