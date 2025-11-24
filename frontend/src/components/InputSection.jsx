import React, { useState } from 'react';

const InputSection = ({ onAnalyze, isLoading }) => {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && skills) {
      onAnalyze(role, skills);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Career Goal Input</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Target Role</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Backend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">Supported: Frontend Developer, Backend Developer, Data Analyst</p>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Current Skills</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Java, SQL, Git (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze My Career Path'}
        </button>
      </form>
    </div>
  );
};

export default InputSection;
