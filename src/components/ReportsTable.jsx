import React from 'react';

export default function ReportsTable({ reports }) {
  return (
    <div className="reports-table-shell">
      <table className="table reports-table">
        <thead>
          <tr>
            <th>Investigation</th>
            <th>Result</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={`${report.name}-${report.date}`}>
              <td>{report.name}</td>
              <td>{report.result}</td>
              <td>{report.date}</td>
              <td>{report.priority}</td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}