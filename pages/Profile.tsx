import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { CheckCircle, Shield, Award, TrendingUp, Users, Briefcase, Clock, Mail, Phone, GraduationCap, Star } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [profileStrength, setProfileStrength] = useState(0);
  const [qualifiedAssessments] = useState<any[]>([]);

  useEffect(() => {
    let strength = 0;
    if (user.name) strength += 25;
    if (user.email) strength += 25;
    if (user.phone) strength += 20;
    if (user.education) strength += 15;
    if (user.domain) strength += 10;
    if (user.skills?.length > 0) strength += 5;
    
    setProfileStrength(Math.min(strength, 100));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
              <p className="text-blue-200 mt-2">Your journey to professional excellence continues here</p>
            </div>
            <div className="mt-6 lg:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-medium">Active Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                      <div className="text-4xl font-bold text-blue-600">
                        {user.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Verified
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span className="font-medium">{user.email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span className="font-medium">{user.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <div className="text-right">
                          <div className="text-4xl font-bold text-blue-600">{profileStrength}%</div>
                          <div className="text-sm text-gray-500">Profile Strength</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${profileStrength}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Basic Info</span>
                        <span>Complete Profile</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-5">
                        <div className="flex items-center mb-3">
                          <GraduationCap className="w-5 h-5 text-blue-600 mr-3" />
                          <h4 className="font-semibold text-gray-900">Education</h4>
                        </div>
                        <p className="text-gray-700">{user.education}</p>
                      </div>
                      
                      <div className="bg-indigo-50 rounded-xl p-5">
                        <div className="flex items-center mb-3">
                          <Briefcase className="w-5 h-5 text-indigo-600 mr-3" />
                          <h4 className="font-semibold text-gray-900">Domain Interest</h4>
                        </div>
                        <p className="text-gray-700">{user.domain}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    {user.skills?.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Skills</h4>
                        <div className="flex flex-wrap gap-3">
                          {user.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="group relative px-5 py-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="font-medium text-gray-800">{skill}</span>
                                <Star className="w-4 h-4 text-amber-400 ml-2" fill="currentColor" />
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                Certified Skill
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white mb-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center mb-2">
                    <Shield className="w-6 h-6 text-emerald-400 mr-3" />
                    <h3 className="text-2xl font-bold">Why Companies Trust Internadda</h3>
                  </div>
                  <p className="text-gray-300">We've redefined student-to-professional transition</p>
                </div>
                <div className="hidden md:block">
                  <div className="text-5xl opacity-20">⚡</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-3xl mb-4">🏆</div>
                  <h4 className="font-bold text-lg mb-2">Premium Talent Pool</h4>
                  <p className="text-gray-300 text-sm">Only top 10% of applicants make it through our assessment process</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-3xl mb-4">💼</div>
                  <h4 className="font-bold text-lg mb-2">Direct Hiring</h4>
                  <p className="text-gray-300 text-sm">No middlemen. Direct interviews with company decision-makers</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-3xl mb-4">🎯</div>
                  <h4 className="font-bold text-lg mb-2">Guaranteed Interviews</h4>
                  <p className="text-gray-300 text-sm">Score 70%+ in our assessments and get guaranteed interviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="lg:col-span-4">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
                Your Journey
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Assessments Completed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-blue-600">+25%</div>
                    <div className="text-xs text-gray-500">vs last month</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">4</div>
                      <div className="text-sm text-gray-600">Skills Certified</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-emerald-600">+2 New</div>
                    <div className="text-xs text-gray-500">this month</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">245</div>
                      <div className="text-sm text-gray-600">Network Score</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-purple-600">Top 15%</div>
                    <div className="text-xs text-gray-500">in your cohort</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
              <h3 className="text-lg font-bold mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <span className="font-bold">1</span>
                    </div>
                    <span className="text-sm">Complete Profile</span>
                  </div>
                  {profileStrength < 100 ? (
                    <div className="text-xs bg-white/20 px-2 py-1 rounded">Pending</div>
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <span className="font-bold">2</span>
                    </div>
                    <span className="text-sm">Skill Assessment</span>
                  </div>
                  <div className="text-xs bg-emerald-400/30 px-2 py-1 rounded">Complete</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <span className="font-bold">3</span>
                    </div>
                    <span className="text-sm">Get Interview Ready</span>
                  </div>
                  <div className="text-xs bg-amber-400/30 px-2 py-1 rounded">In Progress</div>
                </div>
              </div>
              
              <Link
                to="/internships"
                className="mt-6 w-full block text-center bg-white text-blue-600 px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                Explore Premium Opportunities
              </Link>
            </div>

            {/* Company Trust */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Trusted By Industry Leaders</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">Google</div>
                    <div className="text-sm text-gray-500">15 placements this year</div>
                  </div>
                  <div className="text-2xl">🔵</div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">Microsoft</div>
                    <div className="text-sm text-gray-500">12 placements this year</div>
                  </div>
                  <div className="text-2xl">🔴</div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">Amazon</div>
                    <div className="text-sm text-gray-500">18 placements this year</div>
                  </div>
                  <div className="text-2xl">🟡</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <div className="text-sm text-gray-500 mb-2">Your profile matches 8 premium companies</div>
                <Link
                  to="/matches"
                  className="text-blue-600 font-semibold text-sm hover:text-blue-700"
                >
                  View all matches →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 mb-12">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl overflow-hidden">
            <div className="p-10 text-center text-white">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl font-bold mb-4">Ready for Your Next Career Leap?</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who've transformed their careers through Internadda's premium network
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/assessments"
                  className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Take Premium Assessment
                </Link>
                <Link
                  to="/internships"
                  className="bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-900 transition-colors"
                >
                  Browse Top Internships
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-sm text-gray-500">© 2024 Internadda. All rights reserved.</div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Contact Support</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center"
              >
                <span>Logout</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                IA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
