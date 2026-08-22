import React, { useState } from 'react';
import Card from '../common/Card';
import { getCategoryIconInfo } from '../common/Icons';

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
    .map(([name, amount]) => {
      const iconInfo = getCategoryIconInfo(name);
      return {
        name,
        amount,
        percentage: grandTotal > 0 ? (amount / grandTotal) * 100 : 0,
        iconInfo
      };
    })
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
      subtitle="Visual percentage breakdown of spending across categories with individual vector icons"
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
                  stroke={slice.iconInfo.color}
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

        {/* Categories Legend List with Semantic Icons */}
        <div className="pie-chart-legend">
          {categories.map((cat) => {
            const isHovered = hoveredCategory === cat.name;
            const IconComponent = cat.iconInfo.icon;
            return (
              <div
                key={cat.name}
                className={`legend-item ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="legend-info">
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: cat.iconInfo.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent size={16} color={cat.iconInfo.color} />
                  </div>
                  <span className="legend-name">{cat.name}</span>
                </div>
                <div className="legend-stats">
                  <span className="legend-amount">₹{cat.amount.toLocaleString('en-IN')}</span>
                  <span className="legend-badge" style={{ backgroundColor: cat.iconInfo.bg, color: cat.iconInfo.color }}>
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
