import React, { useState, useEffect } from 'react';
import { Task, TaskFormData, Priority, Status } from '../types/task';
import '../styles/TaskForm.css';

interface TaskFormProps {
  editingTask: Task | null; // null = create mode, Task = edit mode
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
}

const PRIORITIES: Priority[] = ['Low', 'Medium', 'High'];
const STATUSES: Status[] = ['Todo', 'In Progress', 'Done'];

const DEFAULT_FORM: TaskFormData = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Todo',
};

/**
 * TaskForm — modal dialog for creating or editing a task.
 *
 * Clicking the backdrop or the × button closes the form without saving.
 * The form validates that title is non-empty before submitting.
 */
const TaskForm: React.FC<TaskFormProps> = ({ editingTask, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<TaskFormData>(DEFAULT_FORM);
  const [titleError, setTitleError] = useState('');

  // Populate form fields when switching between create and edit mode.
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title:       editingTask.title,
        description: editingTask.description,
        priority:    editingTask.priority,
        status:      editingTask.status,
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
    setTitleError('');
  }, [editingTask]);

  const handleChange = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === 'title' && titleError) setTitleError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setTitleError('Title is required.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Stop clicks inside the modal from closing it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 id="modal-title">{editingTask ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close form">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Task title"
              autoFocus
            />
            {titleError && <span className="form-error">{titleError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Optional description"
              rows={3}
            />
          </div>

          {/* Priority and Status displayed side by side */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value as Priority)}
              >
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as Status)}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
