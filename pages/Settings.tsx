import React, { useState, useEffect } from 'react';
import { User } from '../types'; 
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient'; // Ensure this path is correct

interface SettingsProps {
  user: User;
  setUser: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user: initialUser, setUser }) => {
  const [localUser, setLocalUser] = useState<User>(initialUser);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialUser.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const navigate = useNavigate();

  const educationLevels = [
    'High School', 'Undergraduate', 'Graduate', 'Post Graduate', 'Doctorate', 'Diploma', 'Other'
  ];

  const domains = [
    'Technology', 'Business', 'Design', 'Marketing', 'Finance', 'Healthcare', 'Engineering', 'Science', 'Arts', 'Other'
  ];

  useEffect(() => {
    setLocalUser(initialUser);
    setSkills(initialUser.skills || []);
  }, [initialUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedUser: User = { 
        ...localUser, 
        skills: skills,
        updatedAt: new Date().toISOString()
      };
      
      // 1. Update Supabase Database
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedUser.name,
          phone: updatedUser.phone,
          education: updatedUser.education,
          domain: updatedUser.domain,
          updated_at: updatedUser.updatedAt
        })
        .eq('id', updatedUser.id); // Matches the UUID in your table

      if (error) throw error;

      // 2. Update localStorage and App State
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLocalUser(updatedUser);
      setSaved(true);
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-slate-100 rounded-lg">←</button>
          <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-indigo-600 rounded-full"></span> Basic Information
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={localUser.name}
                  onChange={(e) => setLocalUser({...localUser, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email (Read Only)</label>
                <input
                  type="email"
                  value={localUser.email}
                  disabled
                  className="w-full px-4 py-2 border bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={localUser.phone}
                  onChange={(e) => setLocalUser({...localUser, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Education</label>
                  <select
                    value={localUser.education}
                    onChange={(e) => setLocalUser({...localUser, education: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  >
                    {educationLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Domain</label>
                  <select
                    value={localUser.domain}
                    onChange={(e) => setLocalUser({...localUser, domain: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  >
                    {domains.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-600 rounded-full"></span> Your Skills
            </h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill (e.g. React)"
                className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button type="button" onClick={addSkill} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Add</button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <p className="text-xs text-slate-500">* All information is stored securely.</p>
            <div className="flex items-center gap-4">
              {saved && <span className="text-emerald-600 font-medium">✓ Saved Successfully</span>}
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
