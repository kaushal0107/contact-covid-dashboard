import React from 'react';

interface GlobalStatsProps {
  data: {
    cases: number;
    deaths: number;
    recovered: number;
  };
}

const GlobalStats: React.FC<GlobalStatsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Cases</h3>
          <p className="text-lg text-gray-700">{data.cases.toLocaleString()}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
          </svg>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Deaths</h3>
          <p className="text-lg text-gray-700">{data.deaths.toLocaleString()}</p>
        </div>
        <div className="bg-red-100 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
          </svg>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Recovered</h3>
          <p className="text-lg text-gray-700">{data.recovered.toLocaleString()}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
