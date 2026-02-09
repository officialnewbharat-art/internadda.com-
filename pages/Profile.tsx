import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { MOCK_INTERNSHIPS } from '../constants';
import { Briefcase, Calendar, CheckCircle2, Clock, Award, Star, Users } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [profileStrength, setProfileStrength] = useState(0);
  const [qualifiedAssessments, setQualifiedAssessments] = useState<any[]>([]);

  useEffect(() => {
    // Calculate profile strength
    let strength = 0;
    if (user.name) strength += 20;
    if (user.email) strength += 20;
    if (user.phone) strength += 20;
    if (user.education) strength += 20;
    if (user.domain) strength += 10;
    if (user.skills?.length > 0) strength += 10;
    
    setProfileStrength(Math.min(strength, 100));
    
    // Get qualified assessments
    if (user.completedAssessments) {
      const qualified = user.completedAssessments.filter((a: any) => a.qualifiedForInterview);
      setQualifiedAssessments(qualified);
    }
  }, [user]);

  const getAppliedInternships = () => {
    if (!user.appliedInternships?.length) return [];
    
    return user.appliedInternships.map(id => {
      const internship = MOCK_INTERNSHIPS.find(i => i.id === id);
      const assessment = user.completedAssessments?.find((a: any) => a.internshipId === id);
      return internship ? { ...internship, assessment } : null;
    }).filter(Boolean);
  };

  const appliedInternships = getAppliedInternships();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile Dashboard</h1>
          <p className="text-gray-600">Track your progress and applications</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                      <div className="text-2xl font-bold text-indigo-600">
                        {user.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
                    <div className="space-y-1 mb-4">
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-gray-600">{user.phone}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {user.education}
                      </span>
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        {user.domain}
                      </span>
                    </div>

                    {/* Skills */}
                    {user.skills?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Strength */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Profile Strength</span>
                    <span className="text-sm font-bold text-indigo-600">{profileStrength}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${profileStrength}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applied Internships */}
            {appliedInternships.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Applied Internships</h3>
                  <span className="text-sm text-gray-500">{appliedInternships.length} applied</span>
                </div>
                <div className="space-y-4">
                  {appliedInternships.map((internship: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{internship.title}</h4>
                          <p className="text-sm text-gray-600">{internship.company}</p>
                        </div>
                        {internship.assessment?.qualifiedForInterview ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Interview Qualified
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">Under Review</span>
                        )}
                      </div>
                      {internship.assessment && (
                        <div className="mt-2 text-sm text-gray-600">
                          Score: {internship.assessment.score}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Status */}
            {qualifiedAssessments.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Interview Status</h3>
                <div className="space-y-4">
                  {qualifiedAssessments.map((assessment: any, index: number) => (
                    <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{assessment.internshipTitle}</h4>
                          <p className="text-sm text-gray-600">{assessment.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{assessment.score}%</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Awaiting interview schedule
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Applications</span>
                  </div>
                  <span className="font-bold text-gray-900">{appliedInternships.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Tests Taken</span>
                  </div>
                  <span className="font-bold text-gray-900">{user.completedAssessments?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">Interviews</span>
                  </div>
                  <span className="font-bold text-gray-900">{qualifiedAssessments.length}</span>
                </div>
              </div>
            </div>

            {/* Profile Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Profile Tips</h3>
              <ul className="space-y-3">
                {profileStrength < 100 && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Complete your profile for better recommendations
                  </li>
                )}
                <li className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Add specific technical skills to increase visibility
                </li>
                <li className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Keep contact information updated
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/internships"
                  className="w-full block text-center bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700"
                >
                  Browse Internships
                </Link>
                <Link
                  to="/settings"
                  className="w-full block text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Need help? Contact support@internadda.com
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
