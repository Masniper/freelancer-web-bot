import React from 'react';
import Project from './Project'; // Adjust path as per your actual structure

interface ProjectProps {
  title: string;
  seo_url: string;
  time_submitted: number;
  budget: {
    minimum: string;
    maximum: string;
  };
  currency: {
    country: string;
  };
  description: string;
}

interface ProjectViewerProps {
  projects: ProjectProps[];
}

const ProjectViewer: React.FC<ProjectViewerProps> = (props) => {
  const projects = props.projects.map(project => (
    <div key={project.seo_url} className="m-5">
      <Project project={project} />
    </div>
  ));

  return projects

};

export default ProjectViewer;
