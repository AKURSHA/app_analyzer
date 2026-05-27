import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, TaskFormData, TaskFilters, TaskStats, Status } from '../types/task';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/localStorage';
import { SAMPLE_TASKS } from '../utils/sampleData';

function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

const DEFAULT_FILTERS: TaskFilters = {
  status: 'All',
  priority: 'All',
  search: '',
};

/**
 * useTasks — central hook for all task state and business logic.
 *
 * Responsibilities:
 *  - Load/save tasks to localStorage
 *  - CRUD operations (add, update, delete, toggle complete)
 *  - Filter and search logic
 *  - Dashboard stats derivation
 *  - Form open/close state
 */
export function useTasks() {
  // Initialise from localStorage; seed with sample data on first ever load.
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasksFromStorage();
    if (stored.length === 0) {
      saveTasksToStorage(SAMPLE_TASKS);
      return SAMPLE_TASKS;
    }
    return stored;
  });

  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Keep localStorage in sync whenever the task list changes.
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // --- CRUD operations ---

  const addTask = useCallback((formData: TaskFormData) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...formData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, formData: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...formData, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  /**
   * Toggles a task between 'Done' and its previous status.
   * If the task was 'Done', it reverts to 'Todo'.
   */
  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const newStatus: Status = task.status === 'Done' ? 'Todo' : 'Done';
        return { ...task, status: newStatus, updatedAt: new Date().toISOString() };
      })
    );
  }, []);

  // --- Filter logic ---

  const filteredTasks = useMemo(() => {
    const searchTerm = filters.search.toLowerCase();
    return tasks.filter((task) => {
      const matchesStatus = filters.status === 'All' || task.status === filters.status;
      const matchesPriority = filters.priority === 'All' || task.priority === filters.priority;
      const matchesSearch =
        !searchTerm ||
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm);
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filters]);

  // --- Dashboard stats (always from the unfiltered list) ---

  const stats = useMemo<TaskStats>(() => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Done').length,
    open: tasks.filter((t) => t.status !== 'Done').length,
    highPriority: tasks.filter((t) => t.priority === 'High').length,
  }), [tasks]);

  // --- Form state helpers ---

  const openCreateForm = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(false);
  }, []);

  return {
    tasks: filteredTasks,
    stats,
    filters,
    setFilters,
    editingTask,
    isFormOpen,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    openCreateForm,
    openEditForm,
    closeForm,
  };
}
