import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [stats, setStats] = useState({
    testsCompleted: 0,
    applicationsSubmitted: 0,
    profileCompletion: 85
  });

  const [profileStrength, setProfileStrength] = useState(0);

  useEffect(() => {
    // Calculate profile strength based on filled fields
    let strength = 0;
    if (user.name) strength += 20;
    if (user.email) strength += 20;
    if (user.phone) strength += 20;
    if (user.education) strength += 20;
    if (user.domain) strength += 10;
    if (user.skills && user.skills.length > 0) strength += 10;
    
    setProfileStrength(Math.min(strength, 100));
    
    // Load stats from localStorage
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const motivationalMessages = [
    "Your next opportunity is just one application away! 🚀",
    "Great profiles get great internships. Complete yours! ✨",
    "Ready to kickstart your career journey? Apply now! 💼",
    "Don't wait for opportunities. Create them! ⚡",
    "Your dream internship awaits. Take the first step today! 🌟"
  ];

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  const getSkillLevel = (skill: string) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return levels[hash % 4];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Your Profile Dashboard</h1>
          <p className="text-slate-600">Track your progress and showcase your skills</p>
        </div>

        {/* Profile Strength Indicator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Profile Strength</h3>
            <span className="text-lg font-bold text-indigo-600">{profileStrength}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${profileStrength}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Complete your profile to increase your chances by {100 - profileStrength}%
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden border-8 border-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <img 
                        src="https://iili.io/fb5Wtrx.md.png" 
                        alt="Explorer"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <span class="text-indigo-600 font-bold text-3xl">
                                  ${getInitials(user.name)}
                                </span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                    {profileStrength === 100 && (
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        ✓ Complete
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">{user.name}</h2>
                    <p className="text-slate-600 mb-2 flex items-center gap-2 justify-center md:justify-start">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {user.email}
                    </p>
                    <p className="text-slate-600 mb-4 flex items-center gap-2 justify-center md:justify-start">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {user.phone}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                      <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 hover:bg-indigo-100 transition-colors">
                        🎓 {user.education}
                      </span>
                      <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100 hover:bg-purple-100 transition-colors">
                        💼 {user.domain}
                      </span>
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100 hover:bg-emerald-100 transition-colors">
                        ⭐ {profileStrength}% Complete
                      </span>
                    </div>

                    {/* Skills Section */}
                    {user.skills && user.skills.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                          Your Skills
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {user.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="group relative px-4 py-2.5 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                            >
                              <span className="font-medium text-slate-800">{skill}</span>
                              <span className="text-xs text-slate-500 ml-2 bg-slate-100 px-2 py-1 rounded">
                                {getSkillLevel(skill)}
                              </span>
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Skill Level: {getSkillLevel(skill)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="text-center p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300">
                        <div className="text-3xl font-bold text-indigo-600">{stats.testsCompleted}</div>
                        <div className="text-sm text-slate-600">Tests Taken</div>
                      </div>
                      <div className="text-center p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300">
                        <div className="text-3xl font-bold text-emerald-600">{stats.applicationsSubmitted}</div>
                        <div className="text-sm text-slate-600">Applications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Section */}
            <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-6 animate-bounce">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Ready for Your Next Adventure?</h3>
                <p className="text-lg text-indigo-100 mb-8">
                  {getRandomMessage()}
                </p>
                <Link 
                  to="/internships"
                  className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Explore Opportunities</span>
                  <span className="text-xl">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Tips & Trust Indicators */}
          <div className="space-y-6">
            {/* Profile Tips (Replaced Quick Actions) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 mb-4 text-lg">Profile Tips</h3>
              <ul className="space-y-4">
                {profileStrength < 100 && (
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 shrink-0"></div>
                    <p>Complete your missing profile details to get better-matched internship recommendations.</p>
                  </li>
                )}
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 shrink-0"></div>
                  <p>Adding specific technical skills like React or Python increases recruiter visibility by 3x.</p>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 shrink-0"></div>
                  <p>Keep your contact information updated to ensure you don't miss interview calls.</p>
                </li>

                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                  <p>Verify your skills by taking the internal Internadda assessments.</p>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link to="/settings" className="text-indigo-600 text-sm font-bold hover:underline">
                  Update Profile Now →
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6">
              <h3 className="font-semibold mb-6 text-lg flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                Why Internadda?
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <div className="font-medium">98% Success Rate</div>
                    <div className="text-sm text-slate-300">Students placed through Internadda</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <div className="font-medium">48h Avg. Process</div>
                    <div className="text-sm text-slate-300">From application to interview</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💰</div>
                  <div>
                    <div className="font-medium">₹6.5k Avg. Stipend</div>
                    <div className="text-sm text-slate-300">Per month across all roles</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-medium">500+ Companies</div>
                    <div className="text-sm text-slate-300">Trusted partners worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-8 text-lg">
            Start your journey today. It only takes one application to change everything.
          </p>
          <Link 
            to="/internships"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>💼 Browse Open Internships</span>
            <span className="text-2xl animate-pulse">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
