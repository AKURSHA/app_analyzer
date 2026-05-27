import { Task } from '../types/task';

const STORAGE_KEY = 'taskflow_tasks';

/** Reads the saved task list from localStorage. Returns an empty array on failure. */
export function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    // Corrupted data — start fresh rather than crashing.
    return [];
  }
}

/** Serialises and saves the full task list to localStorage. */
export function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
