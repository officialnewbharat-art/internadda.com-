import React, { useState, useEffect } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS } from '../constants';
import { Search, RotateCcw, ShieldCheck, Award, Zap, ChevronDown } from 'lucide-react';

const InternshipsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [filteredInternships, setFilteredInternships] = useState(MOCK_INTERNSHIPS);

  const categories = ['All', 'Python', 'Web Development', 'Data Science', 'Marketing', 'Design', 'Finance'];

  useEffect(() => {
    let results = MOCK_INTERNSHIPS;
    if (search) {
      results = results.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      results = results.filter(i => i.category === selectedCategory);
    }
    setFilteredInternships(results);
    setVisibleCount(6); // Reset count on filter
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-slate-900 text-white py-16 lg:py-24 text-center px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">Professional <span className="text-indigo-500">Internships</span></h1>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">India's most trusted MSME-certified hiring ecosystem.</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text" placeholder="Search roles..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl text-slate-900 font-bold outline-none"
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="p-3 text-slate-500"><RotateCcw size={20}/></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.slice(0, visibleCount).map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>

        {visibleCount < filteredInternships.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="group flex items-center gap-3 px-10 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-md"
            >
              Load More Internships <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipsPage;
