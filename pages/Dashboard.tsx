import React, { useState, useEffect } from 'react';
import { User } from '../types'; // Updated to match App.tsx type name
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface DashboardProps {
  user: User;
}

interface DashboardStats {
  testsCompleted: number;
  testsPassed: number;
  applicationsSubmitted: number;
  profileCompletion: number;
  skillLevel: number;
}

interface RecentActivity {
  id: string;
  type: 'test' | 'application' | 'profile_update';
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'in_progress';
  score?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [stats, setStats] = useState<DashboardStats>({
    testsCompleted: 0,
    testsPassed: 0,
    applicationsSubmitted: 0,
    profileCompletion: 0,
    skillLevel: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateProfileCompletion = (u: User) => {
    let score = 0;
    if (u.name) score += 20;
    if (u.email) score += 20;
    if (u.phone) score += 20;
    if (u.education && u.education !== 'Other') score += 20;
    if (u.skills && u.skills.length > 0) score += 20;
    return score;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Parallel fetching for better performance
        const [testsRes, appsRes] = await Promise.all([
          supabase.from('test_results').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('applications').select('*').eq('user_id', user.id)
        ]);

        const testResults = testsRes.data || [];
        const applications = appsRes.data || [];
        
        const completedTests = testResults.length;
        const passedTests = testResults.filter(t => t.passed).length;
        const profileScore = calculateProfileCompletion(user);

        setStats({
          testsCompleted: completedTests,
          testsPassed: passedTests,
          applicationsSubmitted: applications.length,
          profileCompletion: profileScore,
          skillLevel: completedTests > 0 ? Math.min(passedTests * 25, 100) : 0
        });

        // Map activities
        const activities: RecentActivity[] = testResults.slice(0, 3).map(res => ({
          id: res.id,
          type: 'test',
          title: `Test: ${res.test_name || 'Skill Assessment'}`,
          description: res.passed ? 'Assessment cleared successfully' : 'Keep practicing to improve',
          date: new Date(res.created_at).toLocaleDateString(),
          status: res.passed ? 'completed' : 'in_progress',
          score: res.score
        }));

        if (activities.length === 0) {
          activities.push({
            id: 'welcome',
            type: 'profile_update',
            title: 'Welcome to Internadda',
            description: 'Start your journey by completing your profile',
            date: 'Today',
            status: 'in_progress'
          });
        }

        setRecentActivity(activities);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-xl"></div>)}
        </div>
        <div className="h-64 bg-slate-100 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <style>{`
        .fade-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .progress-fill { transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      {/* Hero Welcome */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-600">Your internship journey is {stats.profileCompletion}% ready for companies.</p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
          <div className="text-right">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Placement Readiness</p>
            <p className="text-xl font-black text-indigo-900">{stats.profileCompletion}%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin-slow"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Completed', val: stats.testsCompleted, icon: '📝', color: 'indigo' },
              { label: 'Cleared', val: stats.testsPassed, icon: '✅', color: 'emerald' },
              { label: 'Applications', val: stats.applicationsSubmitted, icon: '💼', color: 'blue' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="text-2xl font-black text-slate-900">{item.val}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Recent Updates</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Live Feed</span>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {recentActivity.map((act) => (
                  <div key={act.id} className="flex gap-4 group cursor-default">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${act.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></div>
                      <div className="w-px flex-grow bg-slate-100 mt-2"></div>
                    </div>
                    <div className="flex-grow pb-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{act.title}</h4>
                        <span className="text-xs text-slate-400 font-medium">{act.date}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{act.description}</p>
                      {act.score !== undefined && (
                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded bg-slate-50 text-xs font-bold text-slate-600 border border-slate-100">
                          Score: {act.score}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-125 transition-transform">🎓</div>
            <h3 className="text-lg font-bold mb-2">Build Your Future</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Top tech companies are looking for {user.domain} interns this month.</p>
            <Link to="/internships" className="block w-full text-center bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Find Internships
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Skill Analysis</h3>
            <div className="space-y-6">
              {[
                { label: 'Technical Proficiency', val: stats.skillLevel, color: 'bg-emerald-500' },
                { label: 'Profile Authority', val: stats.profileCompletion, color: 'bg-indigo-500' },
                { label: 'Active Presence', val: Math.min(stats.testsCompleted * 20, 100), color: 'bg-blue-500' }
              ].map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
                    <span>{skill.label}</span>
                    <span>{skill.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${skill.color} progress-fill rounded-full`} 
                      style={{ width: `${skill.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                <span>💡</span> Suggestion
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {stats.profileCompletion < 100 ? 'Complete your remaining profile details to attract 3x more recruiters.' : 'Take more tests to verify your skills for the Gold Badge.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
