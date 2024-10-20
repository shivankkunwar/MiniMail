import React from 'react';

interface FilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter">
      <span>Filter By:</span>
      <button
        className={currentFilter === 'unread' ? 'active' : ''}
        onClick={() => onFilterChange('unread')}
      >
        Unread
      </button>
      <button
        className={currentFilter === 'read' ? 'active' : ''}
        onClick={() => onFilterChange('read')}
      >
        Read
      </button>
      <button
        className={currentFilter === 'favorites' ? 'active' : ''}
        onClick={() => onFilterChange('favorites')}
      >
        Favorites
      </button>
    </div>
  );
};

export default Filter;