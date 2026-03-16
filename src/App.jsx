import React from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import ProjectLinkPage from './components/ProjectLinkPage';

const projects = [
  {
    slug: 'finance',
    title: 'Finance',
    summary: 'Fintech tools and analytics workflows for cross-functional risk and growth teams.',
    detail:
      'Designed a modular reporting experience for a multi-market fintech platform. The work reduced handoff friction between product, risk, and operations teams by introducing reusable dashboard patterns and clearer decision checkpoints.',
    link: 'https://example.com/finance',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    summary: 'Service design and care experience systems for patient, clinician, and operations workflows.',
    detail:
      'Led the UX direction for a healthcare CRM concept focused on care continuity, fast triage, and transparent reporting. The prototype demonstrates information hierarchy, status communication, and scalable component behavior for complex dashboards.',
    link: 'https://example.com/healthcare',
  },
  {
    slug: 'ios-app',
    title: 'iOS App',
    summary: 'Mobile-first product experiments with a focus on concise flows and gesture-native interactions.',
    detail:
      'Built and tested mobile interaction patterns for high-frequency user tasks. The concept explores onboarding compression, contextual navigation, and accessibility-aware UI states in constrained viewports.',
    link: 'https://example.com/ios-app',
  },
  {
    slug: 'dashboard',
    title: 'Dashboard',
    summary: 'Data products and visual reporting designed for clarity, actionability, and trust.',
    detail:
      'Created a dashboard framework that balances executive-level summaries with drill-down depth for specialist users. Emphasis was placed on visual rhythm, status semantics, and reducing cognitive load in dense interfaces.',
    link: 'https://example.com/dashboard',
  },
];

function ProjectDetailRoute() {
  const { projectId } = useParams();
  const project = projects.find((entry) => entry.slug === projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <ProjectDetail project={project} />;
}

function ProjectLinkRoute() {
  const { projectId } = useParams();
  const project = projects.find((entry) => entry.slug === projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <ProjectLinkPage project={project} />;
}

export default function App() {
  return (
    <HashRouter>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Portfolio projects={projects} />} />
          <Route path="/portfolio" element={<Portfolio projects={projects} />} />
          <Route path="/project/:projectId" element={<ProjectDetailRoute />} />
          <Route path="/project/:projectId/link" element={<ProjectLinkRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </HashRouter>
  );
}