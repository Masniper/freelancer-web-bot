import React, { useState } from 'react';
import * as timeago from 'timeago.js';

interface ProjectProps {
  project: {
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
  };
}

const Project: React.FC<ProjectProps> = (props) => {
  const [hide, setHide] = useState(true);

  const project = props.project;

  const viewAction = () => setHide(prev => !prev);
  const openAction = () => window.open(`https://www.freelancer.com/projects/${props.project.seo_url}`, '_blank');

  // Calculate elapsed time since project submission
  const elapsed_time = timeago.format(new Date(project.time_submitted * 1000)); // Convert seconds to milliseconds

  // Budget string: min budget - max budget
  const budget = `${project.budget.minimum} - ${project.budget.maximum} ${project.currency.country}`;

  return (
    <>
    <div className="relative mr-2 ml-2 mt-2">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-start">
        <span className="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Project</span>
      </div>
    </div>
    <div className="bg-white px-4 py-5 sm:px-6 w-90   mr-2 ml-2 ">
      <div className="flex flex-row justify-between gap-10 ">
        <p className="text-sm font-semibold text-gray-900 ">{project.title}</p>
        <div className="flex gap-5">
          <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={viewAction}>View</button>
          <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={openAction}>Open</button>
        </div>
      </div>

      {hide ? null :
        <p className="text-sm text-gray-500 py-5">
          {project.description}
        </p>
      }

      <div className="flex gap-10">
        <p className="text-sm text-gray-500">{budget}</p>
        <p className="text-sm text-gray-500">{elapsed_time}</p>

      </div>
    </div>
    </>

  );
};

export default Project;
