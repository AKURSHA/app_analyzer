import React from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskFormData } from './types/task';
import Dashboard from './components/Dashboard';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles/App.css';

/**
 * App — root component.
 *
 * Owns no state directly. Instead it delegates everything to the `useTasks`
 * hook and passes the resulting values down as props to child components.
 * This keeps the component tree flat and easy to follow.
 */
const App: React.FC = () => {
  const {
    tasks,
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
  } = useTasks();

  // Route the form submission to the correct CRUD operation.
  const handleFormSubmit = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>TaskFlow Mini</h1>
        <p>A simple and clean task manager</p>
      </header>

      <main className="app__main">
        {/* Summary metrics */}
        <Dashboard
          total={stats.total}
          completed={stats.completed}
          open={stats.open}
          highPriority={stats.highPriority}
        />

        {/* Search, filters, and "New Task" button */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          onNewTask={openCreateForm}
        />

        {/* Filtered task list */}
        <TaskList
          tasks={tasks}
          onEdit={openEditForm}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </main>

      {/* Create / Edit modal — rendered only when open */}
      {isFormOpen && (
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default App;
