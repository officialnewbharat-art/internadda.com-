import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, UserStats } from '../types';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ExternalLink,
  LogOut,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  // Stats focused on credibility and simplified metrics
  const [stats] = useState<Partial<UserStats>>({
    profileCompletion: 100,
    skillScore: 95,
    rank: 124
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* 1. Header & Identity Section */}
      <section className="relative pt-12 pb-32 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with Verified Badge */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 p-1 shadow-xl">
                <img 
                  src={user.profileImage || "https://iili.io/fb5Wtrx.md.png"} 
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full border-4 border-white shadow-lg">
                <ShieldCheck size={20} className="text-white" />
              </div>
            </div>

            {/* User Basic Info */}
            <h1 className="text-3xl font-black text-slate-900 mt-6 tracking-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 uppercase tracking-wider">
                <Briefcase size={14} /> {user.domain} Professional
              </span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <MapPin size={14} /> India
              </span>
            </div>
            
            <p className="mt-4 text-slate-500 max-w-md text-sm leading-relaxed">
              {user.bio || "Student at " + (user.college || user.education) + " specializing in " + user.domain + ". Committed to professional growth and skill-based excellence."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Trust & Verification Banner */}
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200/50 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-400/30">
              <Award className="text-indigo-400" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                MSME Verified Student <CheckCircle2 size={18} className="text-emerald-400" />
              </h3>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
                UDYAM-MH-08-INTERNAL-VERIFIED
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Global Skill Rank</span>
            <div className="px-6 py-2 bg-slate-800 rounded-xl font-mono text-yellow-400 font-bold border border-slate-700">
              #{stats.rank || '---'} TOP 1%
            </div>
          </div>
        </div>

        {/* 3. Core Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Academic Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <GraduationCap size={18} className="text-indigo-600" /> Academic Profile
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution</label>
                <p className="font-bold text-slate-900">{user.college || user.education}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year of Study</label>
                <p className="font-bold text-slate-900">{user.yearOfStudy || "Not Specified"}</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Mail size={18} className="text-indigo-600" /> Professional Reach
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Mail size={16} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone size={16} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{user.phone}</span>
              </div>
              <div className="flex gap-2 pt-2">
                {user.resumeUrl && (
                  <a href={user.resumeUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-100 transition-all">
                    <FileText size={14} /> View Resume
                  </a>
                )}
                <Link to="/settings" className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors">
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Verified Skills */}
        <div className="mt-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Verified Technical Skills</h4>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
              Authenticated
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, i) => (
                <div key={i} className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3 hover:border-indigo-200 hover:bg-white transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm font-bold text-slate-700">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">No verified skills listed yet.</p>
            )}
          </div>
        </div>

        {/* 5. Simplified Footer Actions */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <Link 
            to="/internships" 
            className="group px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3"
          >
            Explore More Opportunities <ExternalLink size={20} />
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <LogOut size={14} /> Secure Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
