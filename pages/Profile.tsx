import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { MOCK_INTERNSHIPS } from '../constants';
import { Briefcase, Calendar, CheckCircle2, MessageSquare, Clock, Award, Star, Users, Shield, Trophy } from 'lucide-react';

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
  const [qualifiedAssessments, setQualifiedAssessments] = useState<any[]>([]);

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

    // Get qualified assessments (score >= 60%)
    if (user.completedAssessments) {
      const qualified = user.completedAssessments.filter((a: any) => a.qualifiedForInterview);
      setQualifiedAssessments(qualified);
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

  const getAppliedInternships = () => {
    if (!user.appliedInternships || user.appliedInternships.length === 0) {
      return [];
    }
    
    return user.appliedInternships.map(id => {
      const internship = MOCK_INTERNSHIPS.find(i => i.id === id);
      const assessment = user.completedAssessments?.find((a: any) => a.internshipId === id);
      
      return {
        ...internship,
        assessment
      };
    }).filter(item => item !== undefined);
  };

  const appliedInternships = getAppliedInternships();

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

                    {/* Applied Internships */}
                    {appliedInternships.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <Briefcase size={20} className="text-indigo-600" />
                          Applied Internships ({appliedInternships.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {appliedInternships.slice(0, 2).map((internship: any, index: number) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-bold text-slate-900">{internship.title}</h5>
                                {internship.assessment?.qualifiedForInterview && (
                                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">
                                    Interview Qualified
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{internship.company}</p>
                              {internship.assessment && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-slate-500">Score: {internship.assessment.score}%</span>
                                  {internship.assessment.qualifiedForInterview && (
                                    <Link 
                                      to={`/test/real/${internship.id}`}
                                      className="text-indigo-600 font-medium hover:underline"
                                    >
                                      View Details →
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {appliedInternships.length > 2 && (
                          <Link to="/internships" className="text-indigo-600 text-sm font-medium mt-2 inline-block">
                            View all {appliedInternships.length} applications →
                          </Link>
                        )}
                      </div>
                    )}

                    {/* Interview Eligibility Status */}
                    {qualifiedAssessments.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <Calendar size={20} className="text-emerald-600" />
                          Interview Qualified Positions
                        </h4>
                        <div className="space-y-4">
                          {qualifiedAssessments.map((assessment: any, index: number) => (
                            <div key={index} className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-5">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <h5 className="font-bold text-slate-900">{assessment.internshipTitle}</h5>
                                  <p className="text-sm text-slate-600">{assessment.company}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm font-medium text-slate-700">
                                      Score: <span className="font-bold text-emerald-600">{assessment.score}%</span>
                                    </span>
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">
                                      Interview Eligible
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-slate-500">Assessment Date</p>
                                  <p className="text-sm font-medium text-slate-700">
                                    {new Date(assessment.date).toLocaleDateString('en-IN')}
                                  </p>
                                  <div className="mt-2 text-xs text-slate-500">
                                    Awaiting interview schedule
                                  </div>
                                </div>
                              </div>
                              
                              {/* Status Message */}
                              <div className="mt-4 pt-4 border-t border-emerald-100">
                                <div className="flex items-start gap-3">
                                  <MessageSquare size={16} className="text-blue-500 mt-0.5" />
                                  <div className="text-sm text-slate-700">
                                    <p>
                                      <strong>You will receive an email</strong> from our team within 24-48 hours 
                                      to schedule your interview with <strong>{assessment.company}</strong>.
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                      Check your email at <span className="font-medium">{user.email}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="text-center p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300">
                        <div className="text-3xl font-bold text-indigo-600">
                          {user.completedAssessments?.length || 0}
                        </div>
                        <div className="text-sm text-slate-600">Tests Taken</div>
                      </div>
                      <div className="text-center p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300">
                        <div className="text-3xl font-bold text-emerald-600">
                          {appliedInternships.length}
                        </div>
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
            {/* Profile Tips */}
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
                {qualifiedAssessments.length > 0 && (
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 shrink-0"></div>
                    <p>You've qualified for interviews! Check your email regularly for scheduling details.</p>
                  </li>
                )}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link to="/settings" className="text-indigo-600 text-sm font-bold hover:underline">
                  Update Profile Now →
                </Link>
              </div>
            </div>

            {/* Interview Status Card */}
            {qualifiedAssessments.length > 0 && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Trophy className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Interview Qualified! 🎉</h3>
                    <p className="text-sm text-slate-600">You've cleared the assessment round</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {qualifiedAssessments.map((assessment: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-emerald-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900">{assessment.internshipTitle}</h4>
                          <p className="text-sm text-slate-600">{assessment.company}</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold">
                          Score: {assessment.score}%
                        </span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={14} />
                        <span>Interview email will be sent within 24-48 hours</span>
                      </div>
                      
                      <div className="mt-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                        💡 <strong>Next Step:</strong> Check your email for interview scheduling details from hiring@arjunai.com
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

                <div className="flex items-start gap-3">
                  <div className="text-2xl">👨‍💼</div>
                  <div>
                    <div className="font-medium">Personal Coordination</div>
                    <div className="text-sm text-slate-300">We personally schedule your interviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-6">Your Achievements</h3>
              <div className="space-y-4">
                {user.completedAssessments && user.completedAssessments.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Award className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Assessment Master</div>
                      <div className="text-sm text-slate-500">{user.completedAssessments.length} tests completed</div>
                    </div>
                  </div>
                )}

                {qualifiedAssessments.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Star className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Interview Qualified</div>
                      <div className="text-sm text-slate-500">{qualifiedAssessments.length} positions secured</div>
                    </div>
                  </div>
                )}

                {appliedInternships.length >= 3 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Users className="text-amber-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Active Applicant</div>
                      <div className="text-sm text-slate-500">{appliedInternships.length} applications submitted</div>
                    </div>
                  </div>
                )}

                {profileStrength === 100 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Shield className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Profile Complete</div>
                      <div className="text-sm text-slate-500">100% profile strength achieved</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          {qualifiedAssessments.length > 0 ? (
            <>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Congratulations on Your Achievement! 🎉</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  You've qualified for interviews with our partner companies. Our team will contact you shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/internships"
                    className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                  >
                    Browse More Opportunities
                  </Link>
                  <button className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors">
                    Check Your Email
                  </button>
                </div>
              </div>
              <p className="text-slate-600 mb-8 text-lg">
                Keep an eye on your inbox at <span className="font-bold">{user.email}</span> for interview scheduling details.
              </p>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline transition-colors"
          >
            Logout from your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
