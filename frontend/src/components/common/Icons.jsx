import React from 'react';

// SVG Icon Component helper
const IconWrapper = ({ children, size = 20, color = 'currentColor', className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`custom-icon ${className}`}
    {...props}
  >
    {children}
  </svg>
);

// Navigation & Feature Icons
export const DashboardIcon = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </IconWrapper>
);

export const ExpenseIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </IconWrapper>
);

export const CategoryIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
  </IconWrapper>
);

export const BudgetIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </IconWrapper>
);

// Individual Category Icons
export const FoodIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </IconWrapper>
);

export const TransportIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.05 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </IconWrapper>
);

export const ShoppingIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </IconWrapper>
);

export const BillsIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
  </IconWrapper>
);

export const HealthIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </IconWrapper>
);

export const EntertainmentIcon = (props) => (
  <IconWrapper {...props}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </IconWrapper>
);

export const OtherIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </IconWrapper>
);

// UI & Utility Icons
export const SunIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M18.36 5.64l-1.41 1.41" />
  </IconWrapper>
);

export const MoonIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </IconWrapper>
);

export const PlusIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconWrapper>
);

export const EditIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </IconWrapper>
);

export const TrashIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </IconWrapper>
);

export const SearchIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </IconWrapper>
);

export const FilterIcon = (props) => (
  <IconWrapper {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </IconWrapper>
);

export const SparklesIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </IconWrapper>
);

export const TrendingUpIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </IconWrapper>
);

export const TrendingDownIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </IconWrapper>
);

export const ShieldCheckIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </IconWrapper>
);

export const CloseIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconWrapper>
);

export const MenuIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </IconWrapper>
);

/**
 * Smart Category Icon Resolver - Context-aware vector icon selector
 */
export const getCategoryIconInfo = (categoryName = '') => {
  const name = categoryName.toLowerCase();

  if (name.includes('food') || name.includes('din') || name.includes('groc') || name.includes('eat') || name.includes('rest')) {
    return { icon: FoodIcon, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', name: 'Food & Dining' };
  }
  if (name.includes('trans') || name.includes('fuel') || name.includes('cab') || name.includes('taxi') || name.includes('bike') || name.includes('car') || name.includes('ride')) {
    return { icon: TransportIcon, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)', name: 'Transport & Travel' };
  }
  if (name.includes('shop') || name.includes('cloth') || name.includes('store') || name.includes('item') || name.includes('buy')) {
    return { icon: ShoppingIcon, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)', name: 'Shopping & Retail' };
  }
  if (name.includes('bill') || name.includes('util') || name.includes('rent') || name.includes('phone') || name.includes('elec') || name.includes('net')) {
    return { icon: BillsIcon, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)', name: 'Bills & Utilities' };
  }
  if (name.includes('health') || name.includes('med') || name.includes('fit') || name.includes('gym') || name.includes('doc') || name.includes('care')) {
    return { icon: HealthIcon, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', name: 'Health & Medical' };
  }
  if (name.includes('enter') || name.includes('mov') || name.includes('sub') || name.includes('game') || name.includes('fun') || name.includes('show')) {
    return { icon: EntertainmentIcon, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', name: 'Entertainment & Leisure' };
  }

  return { icon: OtherIcon, color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)', name: categoryName || 'Other' };
};
