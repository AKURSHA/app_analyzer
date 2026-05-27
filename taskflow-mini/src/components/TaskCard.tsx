import React from 'react';
import { Task } from '../types/task';
import '../styles/TaskCard.css';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

// Mapping priority/status values to their CSS modifier classes.
const PRIORITY_CLASS: Record<Task['priority'], string> = {
  Low:    'priority--low',
  Medium: 'priority--medium',
  High:   'priority--high',
};

const STATUS_CLASS: Record<Task['status'], string> = {
  'Todo':        'status--todo',
  'In Progress': 'status--in-progress',
  'Done':        'status--done',
};

/** Renders a single task as a card with a checkbox, badges, and action buttons. */
const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isCompleted = task.status === 'Done';

  return (
    <div className={`task-card${isCompleted ? ' task-card--completed' : ''}`}>
      {/* Header: checkbox, title, priority badge, status badge */}
      <div className="task-card__header">
        <input
          type="checkbox"
          className="task-card__checkbox"
          checked={isCompleted}
          onChange={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.title}" as ${isCompleted ? 'incomplete' : 'complete'}`}
        />
        <span className="task-card__title">{task.title}</span>
        <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>{task.priority}</span>
        <span className={`badge ${STATUS_CLASS[task.status]}`}>{task.status}</span>
      </div>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      {/* Footer: last-updated date and edit/delete actions */}
      <div className="task-card__footer">
        <span className="task-card__date">
          Updated {new Date(task.updatedAt).toLocaleDateString()}
        </span>
        <div className="task-card__actions">
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${task.title}`}
          >
            Edit
          </button>
          <button
            className="btn btn--danger btn--sm"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
