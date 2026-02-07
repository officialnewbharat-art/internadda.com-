import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { ShieldCheck, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Login Gatekeeper
  if (!user) return <Navigate to="/login" replace />;

  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);
  const [collegeName, setCollegeName] = useState("");

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Personalized Details */}
        <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase mb-6">
            <ShieldCheck size={14} /> Official Application
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 mb-2">Apply for {internship.title}</h1>
          <p className="text-slate-500 mb-8">Personalized program for <span className="text-indigo-600 font-bold">{user.name}</span></p>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Confirm Your Details</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Name</p>
                  <p className="font-bold text-slate-700">{user.name}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
                  <p className="font-bold text-slate-700 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">College/University Name</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Enter your college name"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700"
                />
              </div>
            </div>

            <button 
              onClick={() => navigate(`/payment/${id}`)}
              disabled={!collegeName}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-5 rounded-[20px] font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all"
            >
              Continue to Secure Payment <ArrowRight size={22} />
            </button>
          </div>
        </div>

        {/* Right Side: Trust & Guaranteed Section */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[32px] p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" /> Guaranteed Internship
            </h3>
            <ul className="space-y-4">
              {[
                "Government Recognized MSME Certificate",
                "100% Money Back if not selected",
                "Professional Training & Live Projects",
                "Direct Interview with Hiring Managers"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" /> {text}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">One-time Enrollment Fee</p>
                <p className="text-3xl font-black">₹199</p>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/MSME_Logo.png/640px-MSME_Logo.png" className="h-12 opacity-80 grayscale invert" alt="MSME" />
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <p className="text-emerald-800 text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" /> Trust-Verify: 100% Secure Transaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
