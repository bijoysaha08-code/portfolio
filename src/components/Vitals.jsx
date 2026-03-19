import React from 'react';

function VitalCard({ title, value, note, status, extra }) {
  return (
    <div className="card vital-card">
      <h3>{title}</h3>
      <p className="vital-card-value">{value}</p>
      {status && <small className="vital-card-status">{status}</small>}
      {note && <p className="vital-card-note">{note}</p>}
      {extra && <div className="vital-card-extra">{extra}</div>}
    </div>
  );
}

export default function Vitals({ data }) {
  return (
    <div className="vitals-grid" aria-label="Patient vitals">
      {data.map((item) => (
        <VitalCard key={item.title} {...item} />
      ))}
    </div>
  );
}