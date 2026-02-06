import React from 'react';
import { Link } from 'react-router-dom';

const Tests: React.FC = () => {
  const practiceTests = [
    { id: 'python', title: 'Python Programming', questions: 30, duration: '45m', difficulty: 'Medium' },
    { id: 'web', title: 'Web Development', questions: 25, duration: '40m', difficulty: 'Easy' },
    { id: 'data', title: 'Data Science', questions: 35, duration: '60m', difficulty: 'Hard' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Practice Tests</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Prepare for real interviews with our industry-standard assessments. Take unlimited practice tests to improve your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceTests.map(test => (
          <div key={test.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                <span className="text-xl">{test.id === 'python' ? '🐍' : test.id === 'web' ? '🌐' : '📊'}</span>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                test.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                test.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {test.difficulty}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{test.title}</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Questions</span>
                <span className="font-medium text-slate-700">{test.questions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Duration</span>
                <span className="font-medium text-slate-700">{test.duration}</span>
              </div>
            </div>

            <Link 
              to={`/test/practice/${test.id}`}
              className="block w-full text-center bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Practice Test
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tests;
