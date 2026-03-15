import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectDetail({ project }) {
  return (
    <section className="project-detail-page">
      <header className="project-detail-header">
        <Link to="/" className="project-detail-back" aria-label="Back to landing page">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_left_alt
          </span>
        </Link>
        <h1>{project.title}</h1>
      </header>

      <p className="project-detail-copy">{project.detail}</p>

      <a
        className="project-detail-link-button"
        href={project.link}
        target="_blank"
        rel="noreferrer"
      >
        Open Link
      </a>
    </section>
  );
}