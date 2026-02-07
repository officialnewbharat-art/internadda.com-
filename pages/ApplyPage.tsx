import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants'; 
import { ShieldCheck, Clock, CheckCircle, Lock, BadgeCheck } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    resume: null as File | null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setFormData(prev => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        // Pre-filling education/college if it exists in user profile
        college: userData.education || userData.college || ''
      }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirecting to the specific payment page for this internship ID
    navigate(`/payment/${id}`);
  };

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-indigo-100 p-2 rounded-lg">
                 <BadgeCheck className="text-indigo-600" size={24} />
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-slate-900 leading-tight">Apply for {internship.title}</h2>
                 <p className="text-slate-500 text-sm">Personalized Application • Verified Profile</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    readOnly 
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">College / University</label>
                <input 
                  type="text" 
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Enter your college name"
                  required
                />
              </div>

              <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-center group">
                <input type="file" className="hidden" id="resume-upload" required />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="text-slate-600 font-bold text-sm group-hover:text-indigo-600">Upload Your Resume</div>
                  <div className="text-slate-400 text-xs mt-1">PDF format required for verification</div>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Proceed to Secure Payment <CheckCircle size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-6 tracking-widest">Application Summary</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">
                {internship.icon || '🚀'}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{internship.title}</div>
                <div className="text-xs text-slate-500">{internship.company}</div>
              </div>
            </div>
            <div className="space-y-4 border-t border-slate-50 pt-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Stipend</span>
                <span className="font-bold text-indigo-600">{internship.stipend}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Location</span>
                <span className="font-bold text-slate-700">{internship.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white space-y-5 shadow-xl shadow-indigo-100">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-indigo-200 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold">Data Pre-filled</p>
                <p className="text-xs text-indigo-100 opacity-80">We've used your profile to save you time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
