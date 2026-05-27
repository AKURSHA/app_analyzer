import React from 'react';
import { TaskStats } from '../types/task';
import '../styles/Dashboard.css';

type StatColor = 'blue' | 'green' | 'orange' | 'red';

interface StatCardProps {
  label: string;
  value: number;
  color: StatColor;
}

/** A single coloured metric card in the dashboard row. */
const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <div className={`stat-card stat-card--${color}`}>
    <span className="stat-card__value">{value}</span>
    <span className="stat-card__label">{label}</span>
  </div>
);

type DashboardProps = TaskStats;

/** Renders the four summary stat cards at the top of the page. */
const Dashboard: React.FC<DashboardProps> = ({ total, completed, open, highPriority }) => (
  <div className="dashboard">
    <StatCard label="Total Tasks"   value={total}        color="blue"   />
    <StatCard label="Completed"     value={completed}    color="green"  />
    <StatCard label="Open"          value={open}         color="orange" />
    <StatCard label="High Priority" value={highPriority} color="red"    />
  </div>
);

export default Dashboard;
