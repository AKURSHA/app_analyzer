// Core domain types for the TaskFlow Mini application.

export type Priority = 'Low' | 'Medium' | 'High';

export type Status = 'Todo' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Data submitted through the task form (no generated fields).
export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

// Active filter state applied to the task list.
export interface TaskFilters {
  status: Status | 'All';
  priority: Priority | 'All';
  search: string;
}

// Aggregated stats shown in the dashboard.
export interface TaskStats {
  total: number;
  completed: number;
  open: number;
  highPriority: number;
}
