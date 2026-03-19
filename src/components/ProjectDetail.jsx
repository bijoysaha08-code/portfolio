import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectDetail({ project }) {
  const isInternalPreview = project.slug === 'healthcare';
  const externalLink = project.link || '#';
  const actionLabel = project.linkLabel || 'Open Link';

  return (
    <section className="project-detail-page">
      <header className="project-detail-header">
        <Link to="/" className="project-detail-back" aria-label="Back to landing page">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_left_alt
          </span>
        </Link>
        <div className="project-detail-heading">
          <span className="project-detail-kicker">{project.category}</span>
          <h1>{project.title}</h1>
        </div>
      </header>

      <section className="project-detail-meta" aria-label="Project metadata">
        <article className="project-detail-meta-card">
          <span>Role</span>
          <strong>{project.role}</strong>
        </article>
        <article className="project-detail-meta-card">
          <span>Timeline</span>
          <strong>{project.period}</strong>
        </article>
        <article className="project-detail-meta-card">
          <span>Focus</span>
          <strong>{project.capabilities[0]}</strong>
        </article>
      </section>

      <p className="project-detail-copy">{project.detail}</p>

      <section className="project-detail-section" aria-label="Capabilities used in the project">
        <h2 className="project-detail-subheading">Capabilities</h2>
        <div className="project-detail-tags">
          {project.capabilities.map((capability) => (
            <span key={capability} className="project-detail-tag">
              {capability}
            </span>
          ))}
        </div>
      </section>

      <section className="project-detail-section" aria-label="Project outcomes">
        <h2 className="project-detail-subheading">Outcomes</h2>
        <ul className="project-detail-outcomes">
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      {project.slug === 'healthcare' && (
        <section className="project-app-section" aria-label="Developed application preview">
          <h2 className="project-detail-subheading">Healthcare CRM</h2>
          <Link className="project-app-preview" to={`/project/${project.slug}/link`}>
            <div className="project-app-preview-top">
              <span className="project-app-chip">Patient Dashboard</span>
              <span className="project-app-chip">Vitals</span>
              <span className="project-app-chip">Reports</span>
            </div>
            <div className="project-app-preview-body">
              <div className="project-app-row" />
              <div className="project-app-grid">
                <div className="project-app-tile" />
                <div className="project-app-tile" />
                <div className="project-app-tile" />
                <div className="project-app-tile" />
              </div>
              <div className="project-app-table">
                <div className="project-app-table-row" />
                <div className="project-app-table-row" />
                <div className="project-app-table-row" />
              </div>
            </div>
            <p className="project-app-caption">Click to open the developed application</p>
          </Link>
        </section>
      )}

      {isInternalPreview ? (
        <Link
          className="project-detail-link-button"
          to={`/project/${project.slug}/link`}
          target="_blank"
          rel="noreferrer"
        >
          {actionLabel}
        </Link>
      ) : (
        <a
          className="project-detail-link-button"
          href={externalLink}
          target="_blank"
          rel="noreferrer"
        >
          {actionLabel}
        </a>
      )}
    </section>
  );
}