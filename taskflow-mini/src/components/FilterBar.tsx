import React from 'react';
import { Task, TaskFilters, Priority, Status } from '../types/task';
import '../styles/FilterBar.css';

interface FilterBarProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onNewTask: () => void;
}

const STATUSES: Array<Status | 'All'> = ['All', 'Todo', 'In Progress', 'Done'];
const PRIORITIES: Array<Priority | 'All'> = ['All', 'Low', 'Medium', 'High'];

/**
 * FilterBar — search input, status/priority dropdowns, and the "New Task" button.
 * All filter changes bubble up to the parent via onFiltersChange.
 */
const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange, onNewTask }) => {
  // Generic helper so each control only needs to specify its own key.
  const handleChange = <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <input
          className="filter-bar__search"
          type="text"
          placeholder="Search by title or description…"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          aria-label="Search tasks"
        />

        <select
          className="filter-bar__select"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value as Task['status'] | 'All')}
          aria-label="Filter by status"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value as Task['priority'] | 'All')}
          aria-label="Filter by priority"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>
          ))}
        </select>
      </div>

      <button className="btn btn--primary" onClick={onNewTask}>
        + New Task
      </button>
    </div>
  );
};

export default FilterBar;
