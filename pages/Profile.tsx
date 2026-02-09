import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { CheckCircle, Shield, Award, TrendingUp, Users, Briefcase, Mail, Phone, GraduationCap, Star, Edit2, LogOut } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [profileStrength, setProfileStrength] = useState(0);

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
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/internships"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Internships
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-xl bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {user.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                    </div>
                    {profileStrength === 100 && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Complete
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <div className="flex items-center space-x-3 mt-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/settings"
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Profile Strength</span>
                        <span className="font-medium">{profileStrength}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${profileStrength}%` }}
                        ></div>
                      </div>
                      {profileStrength < 100 && (
                        <p className="text-sm text-gray-500 mt-2">
                          Complete your profile for better internship matches
                        </p>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-5">
                        <div className="flex items-center mb-3">
                          <GraduationCap className="w-5 h-5 text-gray-600 mr-3" />
                          <h4 className="font-medium text-gray-900">Education</h4>
                        </div>
                        <p className="text-gray-700">{user.education}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-5">
                        <div className="flex items-center mb-3">
                          <Briefcase className="w-5 h-5 text-gray-600 mr-3" />
                          <h4 className="font-medium text-gray-900">Domain</h4>
                        </div>
                        <p className="text-gray-700">{user.domain}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    {user.skills?.length > 0 && (
                      <div className="mt-8">
                        <h4 className="font-medium text-gray-900 mb-4">Skills</h4>
                        <div className="flex flex-wrap gap-3">
                          {user.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="font-medium text-gray-800">{skill}</span>
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

            {/* Trust Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">How Internadda Works</h3>
                <p className="text-gray-600 mt-2">A transparent process for your career growth</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Complete Profile</h4>
                  <p className="text-gray-600 text-sm">Fill your details to get personalized recommendations</p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Take Assessment</h4>
                  <p className="text-gray-600 text-sm">Demonstrate your skills through our evaluation</p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Get Interviews</h4>
                  <p className="text-gray-600 text-sm">Receive interview opportunities based on your performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/assessments"
                  className="flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">Take Assessment</div>
                      <div className="text-sm">Test your skills</div>
                    </div>
                  </div>
                  <span className="text-blue-600">→</span>
                </Link>
                
                <Link
                  to="/internships"
                  className="flex items-center justify-between p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">Browse Internships</div>
                      <div className="text-sm">Find opportunities</div>
                    </div>
                  </div>
                  <span className="text-gray-600">→</span>
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center justify-between p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                      <Edit2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">Edit Profile</div>
                      <div className="text-sm">Update your details</div>
                    </div>
                  </div>
                  <span className="text-gray-600">→</span>
                </Link>
              </div>
            </div>

            {/* Profile Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Profile Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${profileStrength === 100 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <span className="text-gray-700">Profile Details</span>
                  </div>
                  <span className={`font-medium ${profileStrength === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                    {profileStrength === 100 ? 'Complete' : `${profileStrength}%`}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${user.completedAssessments?.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-700">Assessment Taken</span>
                  </div>
                  <span className={`font-medium ${user.completedAssessments?.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                    {user.completedAssessments?.length > 0 ? 'Yes' : 'Not yet'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-gray-700">Member Since</span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our team is here to assist you with your internship journey.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-gray-700">
                  Email: <span className="font-medium">support@internadda.com</span>
                </div>
                <div className="text-sm text-gray-700">
                  Response time: <span className="font-medium">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Begin by taking an assessment to discover your strengths and get matched with relevant internships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/assessments"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                Start Assessment
              </Link>
              <Link
                to="/internships"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors"
              >
                View Internships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
