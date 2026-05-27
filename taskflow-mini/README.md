# TaskFlow Mini

A lightweight, client-side task manager built with **React**, **TypeScript**, and **Parcel**.  
Data is persisted in the browser's `localStorage` — no backend required.

---

## Features

| Feature | Details |
|---|---|
| Create, edit, delete tasks | Full CRUD via a modal form |
| Mark as completed | Checkbox toggles status between `Todo` ↔ `Done` |
| Priority levels | `Low`, `Medium`, `High` — colour-coded badges |
| Status tracking | `Todo`, `In Progress`, `Done` |
| Filter tasks | By status and/or priority via dropdown selects |
| Search tasks | Full-text search across title and description |
| Dashboard | Live counts: total, completed, open, high-priority |
| Persistence | Tasks stored in `localStorage`; survive page reloads |
| Sample data | Seven pre-loaded tasks on first launch |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Parcel 2 |
| Styling | Plain CSS with CSS custom properties (no UI library) |
| State Management | React built-in hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) |
| Persistence | Browser `localStorage` |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

### Install dependencies

```bash
cd taskflow-mini
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:1234](http://localhost:1234) in your browser.

### Build for production

```bash
npm run build
```

Static output is written to `dist/`.

---

## Folder Structure

```
taskflow-mini/
├── index.html                  # Parcel entry HTML
├── tsconfig.json               # TypeScript configuration
├── package.json
└── src/
    ├── main.tsx                # React DOM root mount
    ├── App.tsx                 # Root component — composes all children
    │
    ├── components/
    │   ├── Dashboard.tsx       # Four summary stat cards
    │   ├── FilterBar.tsx       # Search input + filter dropdowns + New Task button
    │   ├── TaskCard.tsx        # Single task row with badges and action buttons
    │   ├── TaskForm.tsx        # Modal form for create / edit
    │   └── TaskList.tsx        # Renders the list of TaskCard items
    │
    ├── hooks/
    │   └── useTasks.ts         # All task state, CRUD, filtering, and stats logic
    │
    ├── types/
    │   └── task.ts             # TypeScript interfaces and type aliases
    │
    ├── utils/
    │   ├── localStorage.ts     # Read / write helpers for localStorage
    │   └── sampleData.ts       # Seed tasks shown on first app load
    │
    └── styles/
        ├── global.css          # Reset, CSS variables, shared .btn and .badge classes
        ├── App.css             # Layout for header and main container
        ├── Dashboard.css       # Stat card grid
        ├── FilterBar.css       # Search + select controls
        ├── TaskCard.css        # Individual task card
        ├── TaskForm.css        # Modal and form fields
        └── TaskList.css        # Task list container and empty state
```

---

## Architecture Notes

- **`useTasks`** is the single source of truth. It manages the raw task array, derives filtered tasks and stats via `useMemo`, and exposes stable callbacks via `useCallback`.
- **`App`** owns no state itself — it calls `useTasks` and passes results down as props.
- **Business logic** (filtering, ID generation, LocalStorage sync) lives in `hooks/` and `utils/`, not in components.
- **Components** are purely presentational; they receive data and event handlers as props.

---

## Possible Improvements

- Add drag-and-drop reordering (e.g. `@dnd-kit/core`)
- Due dates with overdue highlighting
- Tag / label system for grouping tasks
- Dark mode via a CSS class toggle
- Unit tests with Vitest and React Testing Library
- Export tasks as JSON or CSV
- Keyboard shortcut to open the New Task form
