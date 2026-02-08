import React, { useState, useEffect } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS } from '../constants';
import { Search, RotateCcw, ShieldCheck, Award, Zap, BadgeCheck } from 'lucide-react';

const InternshipsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [filteredInternships, setFilteredInternships] = useState(MOCK_INTERNSHIPS);

  const categories = ['All', 'Python', 'Web Development', 'Data Science', 'Marketing', 'Design', 'Finance'];
  const types = ['All', 'Remote', 'On-site', 'Hybrid'];

  useEffect(() => {
    let results = MOCK_INTERNSHIPS;

    if (search) {
      results = results.filter(internship =>
        internship.title.toLowerCase().includes(search.toLowerCase()) ||
        internship.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (selectedCategory !== 'All') {
      results = results.filter(internship => internship.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      results = results.filter(internship => internship.type === selectedType);
    }

    setFilteredInternships(results);
  }, [search, selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Refined Hero Section */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
              Verified <span className="text-indigo-500">Professional</span> Internships
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
              Join 7,000+ students in our guaranteed internship program. 
              Get certified by MSME recognized partners.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by role or skills (e.g. React, Python)..."
                className="w-full pl-14 pr-6 py-5 rounded-2xl text-slate-900 bg-white shadow-2xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-bold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-10">
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
                <ShieldCheck className="text-emerald-500" size={16} /> MSME CERTIFIED
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
                <Award className="text-amber-500" size={16} /> GUARANTEED INTERNSHIP
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
                <Zap className="text-indigo-500" size={16} /> 100% REFUND POLICY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Filters - Removed Stipend */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 w-full">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Domain</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex-1 lg:w-48">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Work Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 text-sm outline-none"
                >
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedType('All'); }}
                className="mt-6 p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Programs</h2>
            <p className="text-slate-500 font-medium">Hand-picked opportunities for your career growth</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-2xl font-black text-indigo-600">{filteredInternships.length}</span>
            <p className="text-[10px] font-black text-slate-400 uppercase">Open Slots Found</p>
          </div>
        </div>

        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map(internship => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-400">No matching internships found.</h3>
            <button onClick={() => {setSearch(''); setSelectedCategory('All');}} className="mt-4 text-indigo-600 font-bold underline">Clear all filters</button>
          </div>
        )}

        {/* Professional Trust Footer */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 bg-indigo-900 rounded-[40px] p-10 md:p-16 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-6">Why start with InternAdda?</h3>
            <div className="space-y-6">
              {[
                { icon: <BadgeCheck className="text-emerald-400" />, title: "Personalized Skill Path", desc: "Every assessment is tailored to the specific card you select." },
                { icon: <BadgeCheck className="text-emerald-400" />, title: "One-Time ₹199 Fee", desc: "AI-Based Interview Matching with Partner Companies." },
                { icon: <BadgeCheck className="text-emerald-400" />, title: "Direct Placement", desc: "Skip the queue and talk directly to hiring managers at top startups." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-indigo-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center relative">
             <div className="absolute w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
             <img src="https://iili.io/fbAXw2p.md.png" className="w-48 h-48 object-contain brightness-0 invert opacity-20" alt="Trust" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;
