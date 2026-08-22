import React from 'react';
import { getCategoryIconInfo } from './Icons';

export const CategoryBadge = ({ name = 'Other', showIcon = true, size = 16 }) => {
  const iconInfo = getCategoryIconInfo(name);
  const IconComponent = iconInfo.icon;

  return (
    <span
      className="category-badge-pill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: iconInfo.bg,
        color: iconInfo.color,
        border: `1px solid ${iconInfo.color}33`,
        whiteSpace: 'nowrap'
      }}
    >
      {showIcon && <IconComponent size={size} color={iconInfo.color} />}
      <span>{name}</span>
    </span>
  );
};

export default CategoryBadge;
