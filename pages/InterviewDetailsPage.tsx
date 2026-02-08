import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Video, User, Building, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const InterviewDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get interview details from localStorage
    const interviewData = localStorage.getItem(`interview_${id}`);
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (interviewData) {
      const parsedData = JSON.parse(interviewData);
      setInterview(parsedData);
      
      // Update user's applied internships
      if (!userData.appliedInternships) {
        userData.appliedInternships = [];
      }
      if (!userData.appliedInternships.includes(id)) {
        userData.appliedInternships.push(id);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Calendar className="text-slate-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No Interview Scheduled</h2>
          <p className="text-slate-600 mb-6">You haven't scheduled an interview for this position yet.</p>
          <Link to="/internships" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Browse Internships
          </Link>
        </div>
      </div>
    );
  }

  const interviewDate = new Date(interview.interviewDate);
  const formattedDate = interviewDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = interviewDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle className="text-emerald-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Interview Scheduled! 🎉</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Congratulations! Your performance impressed {interview.company}'s hiring team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Interview Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{interview.internshipTitle}</h2>
                  <div className="flex items-center gap-2">
                    <Building size={18} className="text-slate-400" />
                    <span className="text-lg font-medium text-slate-700">{interview.company}</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm">
                  CONFIRMED
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Calendar className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Date</div>
                    <div className="text-lg font-bold text-slate-900">{formattedDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Time</div>
                    <div className="text-lg font-bold text-slate-900">{formattedTime} IST</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Video className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Platform</div>
                    <div className="text-lg font-bold text-slate-900">Google Meet</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <User className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Interviewer</div>
                    <div className="text-lg font-bold text-slate-900">{interview.interviewer}</div>
                  </div>
                </div>
              </div>

              {/* Meeting Link */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 mb-8">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Video className="text-indigo-600" size={20} />
                  Virtual Meeting Link
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                    <code className="text-sm text-indigo-600 break-all">{interview.interviewLink}</code>
                  </div>
                  <a
                    href={interview.interviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors whitespace-nowrap"
                  >
                    Join Meeting
                  </a>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  ⚠️ Please join 5 minutes before the scheduled time. Test your microphone and camera beforehand.
                </p>
              </div>

              {/* Preparation Tips */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Preparation Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Review the job description and required skills",
                    "Prepare 2-3 questions about the role/company",
                    "Have your portfolio and projects ready to share",
                    "Test your internet connection and equipment",
                    "Find a quiet, well-lit space for the interview",
                    "Review your resume and be ready to discuss experience"
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-slate-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Next Steps */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="text-slate-600" size={20} />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-slate-400" size={18} />
                  <div>
                    <div className="text-sm text-slate-500">Hiring Email</div>
                    <div className="font-medium text-slate-900">hiring@arjunai.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-slate-400" size={18} />
                  <div>
                    <div className="text-sm text-slate-500">Support Phone</div>
                    <div className="font-medium text-slate-900">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-slate-400" size={18} />
                  <div>
                    <div className="text-sm text-slate-500">Company Address</div>
                    <div className="font-medium text-slate-900">Bengaluru, Karnataka</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl text-white p-6">
              <h3 className="font-bold mb-6 text-lg">Next Steps Timeline</h3>
              <div className="space-y-4">
                {[
                  { time: "Within 24h", text: "Interview confirmation email" },
                  { time: "1 day before", text: "Reminder email with tips" },
                  { time: "Day of interview", text: "Join link becomes active 30min before" },
                  { time: "Within 48h after", text: "Interview feedback and next steps" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{step.time}</div>
                      <div className="text-slate-300 text-sm">{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
              <h3 className="font-bold text-amber-900 mb-3">Need Help?</h3>
              <p className="text-amber-800 text-sm mb-4">
                If you haven't received the confirmation email within 6 hours, check your spam folder or contact support.
              </p>
              <button className="w-full bg-amber-100 text-amber-800 py-3 rounded-xl font-bold hover:bg-amber-200 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link 
            to="/profile" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            View Your Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailsPage;
