import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Change 'internships' to 'MOCK_INTERNSHIPS' to fix the build error
import { MOCK_INTERNSHIPS } from '../constants'; 
import { ShieldCheck, Clock, CheckCircle, Lock, BadgeCheck } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  // Prefilling state from user data (Assuming you store user info in localStorage)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    resume: null as File | null,
  });

  useEffect(() => {
    // Get user details from localStorage to pre-fill the form
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setFormData(prev => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your submission logic here
    alert("Application submitted successfully!");
    navigate('/dashboard');
  };

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Application Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-indigo-100 p-2 rounded-lg">
                 <BadgeCheck className="text-indigo-600" size={24} />
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-slate-900 leading-tight">Apply for {internship.title}</h2>
                 <p className="text-slate-500 text-sm">Verified Internship • Free Application</p>
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
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    readOnly // Keeping email read-only for trust/security if logged in
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none"
                    placeholder="john@example.com"
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
                <input type="file" className="hidden" id="resume-upload" />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="text-slate-600 font-bold text-sm group-hover:text-indigo-600">Upload Your Resume</div>
                  <div className="text-slate-400 text-xs mt-1">PDF format highly recommended</div>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Submit Secure Application <CheckCircle size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Side Trust & Summary Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-6 tracking-widest">Application Summary</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Clock className="text-indigo-600" size={20} />
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
                <p className="text-sm font-bold">Verified by InternAdda</p>
                <p className="text-xs text-indigo-100 opacity-80">This role has been manually reviewed for authenticity.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="text-indigo-200 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold">Secure Privacy</p>
                <p className="text-xs text-indigo-100 opacity-80">Your profile is only visible to the hiring team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
