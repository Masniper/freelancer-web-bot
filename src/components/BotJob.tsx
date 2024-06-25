import React, { useState, useEffect, useRef } from 'react';

function useDetectClickOutside(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

function escapeRegex(string: string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

interface BotJobSearchResultProps {
  id: number;
  name: string;
  onJobAdd: (id: number, name: string) => void;
}

const BotJobSearchResult: React.FC<BotJobSearchResultProps> = (props) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer rounded-xl p-3 transition duration-150 ease-in-out hover:bg-gray-100">
      <div className="ml-4 flex-auto">
        <p className="text-sm font-medium text-gray-900">{props.name}</p>
      </div>
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded"
        onClick={() => props.onJobAdd(props.id, props.name)}
      >
        Add
      </button>
    </div>
  );
};

interface BotJobProps {
  allJobs: { id: number; name: string }[];
  jobs: { id: number; name: string }[];
  job: number;
  onJobAdd: (id: number, name: string) => void;
  onJobSelect: (id: number) => void;
  onJobRemove: (id: number) => void; // New prop for removing a job
}

const BotJob: React.FC<BotJobProps> = (props) => {
  const [jobSearchResult, setJobSearchResult] = useState<JSX.Element[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [matchingJobs, setMatchingJobs] = useState<string>('');

  useDetectClickOutside(wrapperRef, () => setMatchingJobs(''));

  useEffect(() => {
    if (matchingJobs === '') {
      setJobSearchResult([]);
      return;
    }

    const regex = new RegExp(`(\\s+|^)${escapeRegex(matchingJobs)}(\\S)*`, 'i');
    const newJobs: JSX.Element[] = [];
    for (const job of props.allJobs) {
      if (job.id !== 0 && job.name.search(regex) !== -1) {
        newJobs.push(<BotJobSearchResult key={job.id} id={job.id} name={job.name} onJobAdd={props.onJobAdd} />);
      }
    }
    setJobSearchResult(newJobs);
  }, [matchingJobs, props.allJobs, props.onJobAdd]);

  const jobs = props.jobs.map((job) => (
    <div key={job.id} className="relative flex items-start ">
      <div className="min-w-0 flex-1 text-sm leading-6">
        {job.id !== 0 && (
          <button
            className="px-2 py-1 bg-red-500 text-white rounded mr-2"
            onClick={() => props.onJobRemove(job.id)}
          >
            X
          </button>
        )}
        <label htmlFor={`job-${job.id}`} className="select-none font-medium text-gray-900">
          {job.name}
        </label>
      </div>
      <div className="ml-3 flex h-6 items-center">
        <input
          id={`job-${job.id}`}
          name="job"
          type="radio"
          value={job.id}
          onClick={(e) => props.onJobSelect(Number(e.currentTarget.value))}
          defaultChecked={props.job === job.id}
          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col gap-5 m-5">
      <div ref={wrapperRef} className="flex flex-col">
        <input
          className="p-2 border"
          type="text"
          placeholder="Search job"
          value={matchingJobs}
          onChange={e => setMatchingJobs(e.target.value)}
          onFocus={e => setMatchingJobs(e.target.value)}
        />
        <div className="overflow-auto flex flex-col gap-5 mt-2" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          {jobSearchResult}
        </div>
      </div>
      <div className="relative mr-2 ml-2 mt-2">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>
      <div className="overflow-auto flex flex-col gap-5" style={{ maxHeight: 'calc(100vh - 190px)' }}>
        {jobs}
      </div>
    </div>
  );
};

export default BotJob;
