import React from 'react';

interface BotControlProps {
  status: {
    total: number;
    success: number;
    failed: number;
    projectCount: number;
  };
  onRefresh: () => void;
  onClear: () => void;
}

const BotControl: React.FC<BotControlProps> = (props) => {
  return (
    <div className="h-screen bg-white shadow-md rounded-lg overflow-hidden divide-y divide-gray-200 flex flex-col justify-between">
      {/* Status section */}
      <div className="p-4">
        <div className="text-sm font-medium text-gray-500">Bot Status</div>
        <dl className="mt-2 grid grid-rows-2 gap-4">
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500 text-white">
            {props.status.total}
            </div>
            <div className="ml-3 text-sm font-medium text-gray-900">
              Total Requests
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-green-500 text-white">
            {props.status.success}
            </div>
            <div className="ml-3 text-sm font-medium text-gray-900">
              Success Requests
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-red-500 text-white">
            {props.status.failed}
            </div>
            <div className="ml-3 text-sm font-medium text-gray-900">
              Failed Requests
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-500 text-white">
            {props.status.projectCount}
            </div>
            <div className="ml-3 text-sm font-medium text-gray-900">
              Project Count
            </div>
          </div>
        </dl>
      </div>

      {/* Actions section */}
      <div className="flex justify-center p-4 space-x-3">
      <button
          onClick={props.onClear}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Clear
        </button>
        <button
          onClick={props.onRefresh}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default BotControl;
