import React, { useState } from 'react';
import Card from '../common/Card';

const PALETTE = [
  { main: '#6366f1', light: 'rgba(99, 102, 241, 0.15)' }, // Indigo
  { main: '#10b981', light: 'rgba(16, 185, 129, 0.15)' },  // Emerald
  { main: '#f43f5e', light: 'rgba(244, 63, 94, 0.15)' },   // Rose
  { main: '#f59e0b', light: 'rgba(245, 158, 11, 0.15)' },   // Amber
  { main: '#06b6d4', light: 'rgba(6, 182, 212, 0.15)' },    // Cyan
  { main: '#8b5cf6', light: 'rgba(139, 92, 246, 0.15)' },  // Purple
  { main: '#ec4899', light: 'rgba(236, 72, 153, 0.15)' },  // Pink
  { main: '#64748b', light: 'rgba(100, 116, 139, 0.15)' }  // Slate
];

export const CategoryPieChart = ({ expenses = [] }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Group expenses by category
  const categoryTotals = {};
  let grandTotal = 0;

  expenses.forEach((item) => {
    const name = item.category?.name || 'Other';
    const amount = Number(item.amount) || 0;
    categoryTotals[name] = (categoryTotals[name] || 0) + amount;
    grandTotal += amount;
  });

  const categories = Object.entries(categoryTotals)
    .map(([name, amount], index) => ({
      name,
      amount,
      percentage: grandTotal > 0 ? (amount / grandTotal) * 100 : 0,
      color: PALETTE[index % PALETTE.length]
    }))
    .sort((a, b) => b.amount - a.amount);

  if (categories.length === 0 || grandTotal === 0) {
    return (
      <Card title="Category Distribution Pie Chart">
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
          <p>No expense distribution data available yet.</p>
        </div>
      </Card>
    );
  }

  // Calculate SVG Pie/Donut Slices
  let cumulativeAngle = 0;
  const radius = 80;
  const strokeWidth = 32;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  const slices = categories.map((cat) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativeAngle / 360) * circumference);
    cumulativeAngle += (cat.percentage / 100) * 360;

    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <Card
      title="Category Expense Distribution"
      subtitle="Visual percentage breakdown of spending across categories"
      glass
    >
      <div className="pie-chart-container">
        
        {/* SVG Donut Chart */}
        <div className="pie-chart-svg-wrapper">
          <svg viewBox="0 0 200 200" className="pie-chart-svg">
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="var(--bg-app)"
              strokeWidth={strokeWidth}
            />
            {slices.map((slice) => {
              const isHovered = hoveredCategory === slice.name;
              return (
                <circle
                  key={slice.name}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color.main}
                  strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  transform={`rotate(-90 ${center} ${center})`}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    opacity: hoveredCategory && !isHovered ? 0.4 : 1
                  }}
                  onMouseEnter={() => setHoveredCategory(slice.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              );
            })}
          </svg>

          {/* Center Text Info */}
          <div className="pie-chart-center-info">
            <span className="center-info-label">
              {hoveredCategory || 'Total Spent'}
            </span>
            <span className="center-info-val">
              ₹
              {hoveredCategory
                ? (categoryTotals[hoveredCategory] || 0).toLocaleString('en-IN')
                : grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Categories Legend List */}
        <div className="pie-chart-legend">
          {categories.map((cat) => {
            const isHovered = hoveredCategory === cat.name;
            return (
              <div
                key={cat.name}
                className={`legend-item ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="legend-info">
                  <span className="legend-dot" style={{ backgroundColor: cat.color.main }} />
                  <span className="legend-name">{cat.name}</span>
                </div>
                <div className="legend-stats">
                  <span className="legend-amount">₹{cat.amount.toLocaleString('en-IN')}</span>
                  <span className="legend-badge" style={{ backgroundColor: cat.color.light, color: cat.color.main }}>
                    {cat.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </Card>
  );
};

export default CategoryPieChart;
