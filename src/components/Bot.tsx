"use client"
import React, { useEffect, useState } from 'react';
import BotControl from './BotControl';
import BotJob from './BotJob';
import ProjectViewer from './ProjectViewer';
import requests from '../utils/requests';

interface Job {
  id: number;
  name: string;
}

interface Project {
  id: number;
  seo_url: string;
  jobs: Job[];
  time_submitted: number;
  title: string;
  description: string;
  budget: {
    minimum: string;
    maximum: string;
  };
  currency: {
    country: string;
  };
}


const defaultJobs: Job[] = [
  {id: 0, name: 'All' },
  {id: 759, name: 'React.js'},
  {id: 1314, name: 'React Native'},
  {id: 1623, name: 'React.js Framework'},
  {id: 13, name: 'Python'},
  {id: 2376, name: 'Next.js'},
  {id: 979, name: 'Typescript'},
  {id: 9, name: 'JavaScript'},
  {id: 3, name: 'PHP'},
  {id: 1325, name: 'jQuery'},
  {id: 1527, name: 'Google Firebase'},
  {id: 602, name: 'Bootstrap'},
  {id: 2301, name: 'TailWind'},
  {id: 2435, name: 'Tailwind CSS'},
  {id: 2703, name: 'REST API'},
  {id: 1240, name: 'RESTful API'},
  {id: 697, name: 'RESTful'},
  {id: 2696, name: 'Webpack'},
  {id: 5, name: 'ASP'},
  {id: 500, name: 'Node.js'},
  {id: 598, name: 'Express JS'},
  {id: 1002, name: 'Docker'},
  {id: 2398, name: 'Docker Compose'},
];

function filterProjects(projects: Project[], jobId: number): Project[] {
  return projects.filter(project => {
    if (jobId === 0) return true;
    for (const job of project.jobs) {
      if (job.id === jobId) return true;
    }
    return false;
  }).sort((lhs, rhs) => rhs.time_submitted - lhs.time_submitted);
}

const Bot: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(defaultJobs.slice());
  const [allJobs, setAllJobs] = useState<Job[]>(defaultJobs.slice());
  const [job, setJob] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [requestStatus, setRequestStatus] = useState({ total: 0, success: 0, failed: 0 });

  useEffect(() => {
    const option = {
      url: 'https://www.freelancer.com/api/projects/0.1/jobs/?active_project_count_details=true&webapp=1&compact=true&new_errors=true&new_pools=true',
      method: 'GET',
    };
    requests.getResponse(option, data => {
      const result = data.result;
      const newAllJobs: Job[] = result.map((job: any) => ({ id: job.id, name: job.name }));
      setAllJobs(newAllJobs);
    });
  }, []);

  const refreshJob = (code: number) => {
    const option = {
      url: `https://www.freelancer.com/api/projects/0.1/projects/active?limit=20&full_description=true&job_details=true&location_details=true&upgrade_details=true&user_country_details=true&user_details=true&user_employer_reputation=true&jobs[]=${code}&languages[]=en&sort_field=submitdate&webapp=1&compact=true&new_errors=true&new_pools=true`,
      method: 'GET',
    };
    setRequestStatus(prev => ({ ...prev, total: prev.total + 1 }));
    requests.getResponse(option, data => {
      const result = data.result;
      if (result && result.projects) {
        setRequestStatus(prev => ({ ...prev, success: prev.success + 1 }));
        setProjects(oldProjects => {
          const newProjects = oldProjects.slice();
          for (const newProject of result.projects) {
            let found = false;
            for (const project of newProjects) {
              if (project.id === newProject.id) {
                found = true;
                break;
              }
            }
            if (!found) {
              newProjects.push(newProject);
            }
          }
          return newProjects;
        });
      } else {
        setRequestStatus(prev => ({ ...prev, failed: prev.failed + 1 }));
      }
    }, error => setRequestStatus(prev => ({ ...prev, failed: prev.failed + 1 })));
  };

  const onJobAdd = (id: number, name: string) => {
    console.log({id,name});
    
    setJobs(oldJobs => {
      for (const job of oldJobs) {
        if (job.id === id) return oldJobs;
      }
      const newJobs = oldJobs.slice();
      newJobs.push({ id, name });
      return newJobs;
    });
  };

  const onRefresh = () => {
    const jobCodes = jobs.map(job => job.id).filter(id => job === 0 || id === job);
    console.log(jobCodes);
    
    jobCodes.forEach(refreshJob);
  };

  const onClear = () => setProjects([]);

  const onJobSelect = (id: number) => setJob(id);
  const onJobRemove = (id: number) => {
    setJobs(oldJobs => oldJobs.filter(job => job.id !== id));
      if (job === id) {
           setJob(0); // Reset selected job if removed job is currently selected
         };
        }
  const filteredProjects = filterProjects(projects, job);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="flex-shrink-0 w-50 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="">
          <BotControl status={{ ...requestStatus, projectCount: filteredProjects.length }} onRefresh={onRefresh} onClear={onClear} />
        </div>
        {/* Placeholder for other sidebar content */}
      </div>
      {/* BotJob Section */}
      <div className="flex-shrink-0 w-96 bg-white border-l border-gray-200 overflow-y-auto">
       <BotJob
         allJobs={allJobs}
         jobs={jobs}
         job={job}
         onJobAdd={onJobAdd}
         onJobSelect={onJobSelect}
         onJobRemove={onJobRemove}
         />

               
      </div>
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Results Section */}
        <div className="flex-1 overflow-y-auto">
          <ProjectViewer projects={filteredProjects} />
        </div>
      </div>
    </div>
  );
};

export default Bot;
