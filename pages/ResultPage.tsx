
import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const score = parseFloat(searchParams.get('score') || '0');
  const type = searchParams.get('type') || 'practice';
  
  const passed = score >= 50;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-[40px] p-16 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        {passed && (
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-indigo-500"></div>
        )}
        
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto text-5xl mb-10 shadow-inner ${
          passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
        }`}>
          {passed ? '🏆' : '💪'}
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          {passed ? 'Congratulations!' : 'Keep Pushing!'}
        </h1>
        
        <p className="text-slate-500 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          {passed 
            ? `You've successfully cleared the skill assessment for the Internship. Our hiring team will review your profile.`
            : `You didn't reach the 50% threshold this time. Practice more and try again in 24 hours.`}
        </p>

        <div className="flex items-center justify-center gap-12 mb-16">
          <div className="text-center">
            <span className="block text-4xl font-black text-slate-900">{score.toFixed(0)}%</span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Score</span>
          </div>
          <div className="w-px h-16 bg-slate-100"></div>
          <div className="text-center">
            <span className={`block text-xl font-bold px-4 py-1 rounded-full ${
              passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {passed ? 'PASSED' : 'FAILED'}
            </span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 block">Status</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {passed ? (
            <>
              <Link 
                to="/dashboard"
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Go to Dashboard
              </Link>
              <button className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Download Certificate
              </button>
            </>
          ) : (
            <>
              <Link 
                to={`/test/practice/${id}`}
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Try Practice Test
              </Link>
              <Link 
                to="/"
                className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Back to Listings
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
