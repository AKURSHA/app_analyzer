import { Task } from '../types/task';

/**
 * Pre-populated tasks shown on the very first app load.
 * They give the user an immediate feel for the UI without needing to create anything.
 */
export const SAMPLE_TASKS: Task[] = [
  {
    id: 'sample-1',
    title: 'Set up project structure',
    description: 'Initialise the React project with Vite and TypeScript configuration.',
    priority: 'High',
    status: 'Done',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Design the data model',
    description: 'Define TypeScript interfaces for tasks, priorities, and statuses.',
    priority: 'High',
    status: 'Done',
    createdAt: new Date('2024-01-11').toISOString(),
    updatedAt: new Date('2024-01-11').toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Implement authentication flow',
    description: 'Add login and registration pages with JWT-based session management.',
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-14').toISOString(),
  },
  {
    id: 'sample-4',
    title: 'Write unit tests for hooks',
    description: 'Cover useTasks and helper utilities with Vitest unit tests.',
    priority: 'Medium',
    status: 'Todo',
    createdAt: new Date('2024-01-13').toISOString(),
    updatedAt: new Date('2024-01-13').toISOString(),
  },
  {
    id: 'sample-5',
    title: 'Improve accessibility',
    description: 'Ensure all interactive elements are keyboard-navigable and have ARIA labels.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'sample-6',
    title: 'Add dark mode support',
    description: 'Implement a colour-scheme toggle that persists to localStorage.',
    priority: 'Low',
    status: 'Todo',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'sample-7',
    title: 'Update README documentation',
    description: 'Add installation instructions, feature list, and folder-structure overview.',
    priority: 'Low',
    status: 'Done',
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString(),
  },
];
