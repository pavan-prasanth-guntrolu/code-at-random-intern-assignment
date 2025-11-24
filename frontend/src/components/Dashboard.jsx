import React from "react";

const Dashboard = ({ gapResults, roadmapResults }) => {
  if (!gapResults && !roadmapResults) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-red-600">
          Skill Gap Analysis
        </h3>
        {gapResults ? (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700">Missing Skills:</h4>
              {gapResults.missingSkills.length > 0 ? (
                <ul className="list-disc list-inside text-red-500">
                  {gapResults.missingSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-500">None! You are ready.</p>
              )}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700">Matched Skills:</h4>
              <ul className="list-disc list-inside text-green-500">
                {gapResults.matchedSkills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-100">
              <span className="font-semibold text-blue-800">
                Recommendation:
              </span>
              <p className="text-blue-700 text-sm">
                {gapResults.recommendations}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No analysis data yet.</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-purple-600">
          Career Roadmap
        </h3>
        {roadmapResults ? (
          <div className="space-y-4">
            {Object.entries(roadmapResults.roadmap).map(([phase, content]) => (
              <div key={phase} className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-gray-800">{phase}</h4>
                <p className="text-gray-600">{content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No roadmap generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
