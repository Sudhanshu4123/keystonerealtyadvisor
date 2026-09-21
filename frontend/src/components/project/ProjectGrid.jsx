import React from 'react';
import ProjectCard from './ProjectCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';
import { Building2 } from 'lucide-react';

export default function ProjectGrid({ projects, loading }) {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card" style={{ height: '380px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <LoadingSkeleton height="200px" />
            <LoadingSkeleton height="24px" width="60%" />
            <LoadingSkeleton height="18px" width="85%" />
            <LoadingSkeleton height="16px" width="40%" />
          </div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        icon={<Building2 size={32} />}
        title="No projects available at the moment."
        description="There are currently no real estate projects matching your selected criteria. Please adjust your filters or contact our advisory desk."
      />
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
