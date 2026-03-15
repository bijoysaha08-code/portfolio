import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Portfolio = ({ projects }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (targetId) => {
    setMenuOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="landing-page">
      <header className="landing-header">
        <span className="landing-logo">Bijoy Saha</span>
        <button
          type="button"
          className="landing-menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`landing-menu ${menuOpen ? "open" : ""}`}>
          <button type="button" onClick={() => handleMenuClick('projects')}>Projects</button>
          <button type="button" onClick={() => handleMenuClick('cv')}>Resume</button>
          <button type="button" onClick={() => handleMenuClick('contact')}>Contact</button>
        </nav>
      </header>

      <section className="landing-hero">
        <h1>Experience Designer specializing in Storytelling, Strategy, Enterprise UX, and Scalable Design Systems — leveraging Gen AI and modern design tools.</h1>
      </section>

      <section id="projects" className="project-grid">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="project-box-link"
            onClick={() => setMenuOpen(false)}
          >
            <article className="project-box">
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </article>
          </Link>
        ))}
      </section>

      <div id="cv" className="landing-anchor" aria-hidden="true"></div>
      <div id="contact" className="landing-anchor" aria-hidden="true"></div>
    </section>
  );
};

export default Portfolio;
