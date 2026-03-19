import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import ReportsTable from './ReportsTable';

const patient = {
  name: 'Aarav Mehta',
  summary: '42 years old · Follow-up for respiratory recovery · Assigned to Dr. Iqbal',
  branch: 'Kolkata South',
  careStage: 'Observation',
};

const reports = [
  {
    name: 'CBC Panel',
    result: 'Normal',
    date: '18 Mar 2026',
    priority: 'Routine',
    status: 'Reviewed',
  },
  {
    name: 'Chest X-Ray',
    result: 'Improving infiltrates',
    date: '17 Mar 2026',
    priority: 'High',
    status: 'Shared with pulmonology',
  },
  {
    name: 'CRP',
    result: '6 mg/L',
    date: '16 Mar 2026',
    priority: 'Routine',
    status: 'Trend improving',
  },
];

const appointments = [
  {
    title: 'Pulmonology follow-up',
    time: '20 Mar · 10:30 AM',
    owner: 'Dr. Iqbal',
  },
  {
    title: 'Nutrition review',
    time: '22 Mar · 1:00 PM',
    owner: 'R. Sen',
  },
  {
    title: 'Discharge planning call',
    time: '23 Mar · 4:30 PM',
    owner: 'Care coordination',
  },
];

const overviewQuickStats = [
  {
    name: 'Critical Alerts',
    value: '3',
  },
  {
    name: 'Pending Approvals',
    value: '7',
  },
  {
    name: 'ICU Patients',
    value: '12',
    alertText: '3 Review Pending',
    alertTone: 'danger',
  },
  {
    name: 'IPD Patients',
    value: '21',
    alertText: '7 Review Pending',
    alertTone: 'warning',
  },
  {
    name: 'OPD Patients',
    value: '30',
    alertText: '21 Pending',
    alertTone: 'warning',
  },
];

const overviewRightPanels = [
  {
    label: 'Today focus',
    value: 'Discharge readiness',
    note: 'Coordinate final imaging check and family instructions.',
  },
  {
    label: 'Alerts',
    value: '2 reminders',
    note: 'Medication audit due at 2 PM and call-back at 4:30 PM.',
  },
];

const navItems = [
  { icon: 'home', label: 'Home' },
  { icon: 'calendar_month', label: 'Appointments' },
  { icon: 'person', label: 'Patients' },
  { icon: 'lab_research', label: 'Reports' },
];

const branchOptions = [
  'All Branches',
  'Brooklyn Heights',
  'Williamsburg',
  'Long Island City',
  'Astoria',
  'Flushing',
];

export default function ProjectLinkPage({ project }) {
  const navigate = useNavigate();
  const branchMenuRef = useRef(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (branchMenuRef.current && !branchMenuRef.current.contains(event.target)) {
        setIsBranchMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogoutClick = () => {
    setActivePage('Logout');
  };

  const renderMainContent = () => {
    if (activePage === 'Home') {
      return (
        <>
          <Header
            patient={patient}
            onBack={() => navigate(`/project/${project.slug}`)}
            primaryActionLabel="Message family"
            secondaryActionLabel="Escalate case"
          />

          <div className="dashboard-overview-grid dashboard-overview-grid-home">
            <div className="dashboard-overview-left">
              <div className="dashboard-overview-left-top">
                {overviewQuickStats.map((item) => (
                  <article key={item.name} className="dashboard-layout-box dashboard-layout-box-compact dashboard-stat-box">
                    <strong className="dashboard-stat-value">{item.value}</strong>
                    <p className="dashboard-stat-name">{item.name}</p>
                    {item.alertText && (
                      <span className={`dashboard-stat-alert dashboard-stat-alert-${item.alertTone}`}>
                        {item.alertText}
                      </span>
                    )}
                  </article>
                ))}
              </div>

              <article className="dashboard-layout-box dashboard-layout-box-wide">
                <h2 className="dashboard-patients-heading">Patients</h2>
              </article>
            </div>

            <div className="dashboard-overview-right">
              {overviewRightPanels.map((item) => (
                <article key={item.label} className="dashboard-layout-box dashboard-layout-box-side">
                  <span className="dashboard-overview-label">{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (activePage === 'Appointments') {
      return (
        <section className="dashboard-section dashboard-section-surface">
          <div className="dashboard-section-heading">
            <h2>Upcoming appointments</h2>
            <p>Coordinated schedule for the next recovery milestones.</p>
          </div>
          <div className="dashboard-stack">
            {appointments.map((appointment) => (
              <article key={appointment.title} className="dashboard-list-card">
                <strong>{appointment.title}</strong>
                <p>{appointment.time}</p>
                <span>{appointment.owner}</span>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (activePage === 'Patients') {
      return (
        <section className="dashboard-content-grid dashboard-content-grid-single">
          <article className="dashboard-section dashboard-section-surface">
            <div className="dashboard-section-heading">
              <h2>Patient profile</h2>
              <p>Operational summary for support staff and clinicians.</p>
            </div>
            <dl className="dashboard-definition-list">
              <div>
                <dt>Primary diagnosis</dt>
                <dd>Post-infection respiratory monitoring</dd>
              </div>
              <div>
                <dt>Insurance</dt>
                <dd>Verified · Corporate plan</dd>
              </div>
              <div>
                <dt>Risk level</dt>
                <dd>Moderate</dd>
              </div>
              <div>
                <dt>Preferred contact</dt>
                <dd>Family coordinator and SMS reminders</dd>
              </div>
            </dl>
          </article>
        </section>
      );
    }

    if (activePage === 'Reports') {
      return (
        <section className="dashboard-section dashboard-section-surface">
          <div className="dashboard-section-heading">
            <h2>Clinical reports</h2>
            <p>Review-ready history prepared for physician and admin workflows.</p>
          </div>
          <ReportsTable reports={reports} />
        </section>
      );
    }

    if (activePage === 'Settings') {
      return (
        <div className="dashboard-overview-grid">
          <article className="dashboard-overview-card">
            <span className="dashboard-overview-label">Notifications</span>
            <strong>Urgent only</strong>
            <p>Critical patient alerts are enabled for assigned staff.</p>
          </article>
          <article className="dashboard-overview-card">
            <span className="dashboard-overview-label">Data sharing</span>
            <strong>Restricted</strong>
            <p>External report downloads require supervisor approval.</p>
          </article>
          <article className="dashboard-overview-card">
            <span className="dashboard-overview-label">Theme</span>
            <strong>Clinical light</strong>
            <p>High-contrast interface tuned for desktop review stations.</p>
          </article>
        </div>
      );
    }

    return (
      <section className="dashboard-section dashboard-section-surface dashboard-empty-state">
        <h2>Signed out preview</h2>
        <p>This state can be connected to a real authentication flow when the concept moves beyond portfolio preview.</p>
      </section>
    );
  };

  return (
    <section className="project-link-page">
      <section className="project-link-dashboard" aria-label="Healthcare dashboard preview">
        <aside
          className={`project-link-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
          aria-label="Dashboard navigation"
        >
          <div className="project-link-sidebar-top">
            <div className="project-link-logo" aria-label="AH logo">
              AH
            </div>

            <button
              type="button"
              className="project-link-toggle"
              aria-label={sidebarExpanded ? 'Collapse navigation' : 'Expand navigation'}
              onClick={() => setSidebarExpanded((value) => !value)}
            >
              <span className="material-symbols-outlined project-link-toggle-icon" aria-hidden="true">
                {sidebarExpanded ? 'close' : 'dehaze'}
              </span>
            </button>

            <nav className="project-link-nav" aria-label="Primary">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`project-link-nav-item ${activePage === item.label ? 'active' : ''}`}
                  aria-current={activePage === item.label ? 'page' : undefined}
                  onClick={() => setActivePage(item.label)}
                >
                  <span className="project-link-icon-box" aria-hidden="true">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {item.icon}
                    </span>
                  </span>
                  {sidebarExpanded && <span className="project-link-nav-label">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className={`project-link-nav-item project-link-logout ${activePage === 'Logout' ? 'active' : ''}`}
            aria-current={activePage === 'Logout' ? 'page' : undefined}
            onClick={handleLogoutClick}
          >
            <span className="project-link-icon-box" aria-hidden="true">
              <span className="material-symbols-outlined" aria-hidden="true">
                logout
              </span>
            </span>
            {sidebarExpanded && <span className="project-link-nav-label">Logout</span>}
          </button>
        </aside>

        <div className="project-link-main" aria-label="Main dashboard area">
          <div className="project-link-body">
            <div className="project-link-toprow">
              <div className="project-link-branch-control" ref={branchMenuRef}>
                <button
                  type="button"
                  className="project-link-branch-dropdown"
                  aria-haspopup="listbox"
                  aria-expanded={isBranchMenuOpen}
                  onClick={() => setIsBranchMenuOpen((value) => !value)}
                >
                  <span className="project-link-branch-text">{selectedBranch}</span>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {isBranchMenuOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>

                {isBranchMenuOpen && (
                  <ul className="project-link-branch-menu" role="listbox" aria-label="Select branch">
                    {branchOptions.map((branch) => (
                      <li key={branch}>
                        <button
                          type="button"
                          className={`project-link-branch-option ${selectedBranch === branch ? 'selected' : ''}`}
                          role="option"
                          aria-selected={selectedBranch === branch}
                          onClick={() => {
                            setSelectedBranch(branch);
                            setIsBranchMenuOpen(false);
                          }}
                        >
                          {branch}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="project-link-search" role="search">
                <span className="project-link-search-label">Search patients, reports, or care notes</span>
                <span className="material-symbols-outlined" aria-hidden="true">search</span>
              </div>

              <div className="project-link-header-icons">
                <span className="material-symbols-outlined" aria-label="Notifications">notifications</span>
                <span className="material-symbols-outlined" aria-label="Profile">account_circle</span>
              </div>
            </div>

            <div className="project-link-main-content">{renderMainContent()}</div>
          </div>
        </div>
      </section>
    </section>
  );
}