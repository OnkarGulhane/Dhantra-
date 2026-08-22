import React from 'react';
import EmptyState from './EmptyState';
import { SkeletonRow } from './Loader';

export const Table = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No records available.',
  keyExtractor = (item, idx) => item.id || idx
}) => {
  if (isLoading) {
    return (
      <div className="table-responsive">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title="No Data" description={emptyMessage} />;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={{ textAlign: col.align || 'left', width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIdx) => (
            <tr key={keyExtractor(item, rowIdx)}>
              {columns.map((col, colIdx) => (
                <td key={colIdx} style={{ textAlign: col.align || 'left' }}>
                  {col.render ? col.render(item, rowIdx) : item[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
