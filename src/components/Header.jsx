import React from 'react';

export default function Header() {
  return (
    <div className="navbar dashboard-header">
      <div className="dashboard-header-main">
        <h1 className="dashboard-welcome-title">Welcome Dr. Jack Marcos</h1>
      </div>

      <div className="dashboard-header-actions">
        <button type="button" className="dashboard-summary-btn">
          Summarise My Day
        </button>
      </div>
    </div>
  );
}