import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS } from '../constants';

const InternshipsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStipend, setSelectedStipend] = useState('All');
  const [filteredInternships, setFilteredInternships] = useState(MOCK_INTERNSHIPS);

  const categories = ['All', 'Python', 'Web Development', 'Data Science', 'Marketing', 'Design', 'Finance'];
  const types = ['All', 'Remote', 'On-site', 'Hybrid'];
  const stipends = ['All', '₹0-5,000', '₹5,000-10,000', '₹10,000-20,000', '₹20,000+'];

  useEffect(() => {
    let results = MOCK_INTERNSHIPS;

    // Search filter
    if (search) {
      results = results.filter(internship =>
        internship.title.toLowerCase().includes(search.toLowerCase()) ||
        internship.company.toLowerCase().includes(search.toLowerCase()) ||
        internship.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      results = results.filter(internship => internship.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'All') {
      results = results.filter(internship => internship.type === selectedType);
    }

    setFilteredInternships(results);
  }, [search, selectedCategory, selectedType, selectedStipend]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Find Your Dream Internship</h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Browse 500+ verified internships with guaranteed interviews. Start your career journey today.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by role, skill, or company..."
                  className="w-full px-6 py-4 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { text: '🎯 Guaranteed Interview', color: 'bg-emerald-500' },
                { text: '🏛️ MSME Certified', color: 'bg-amber-500' },
                { text: '⚡ 48-Hour Process', color: 'bg-blue-500' },
                { text: '💰 Money-Back Guarantee', color: 'bg-pink-500' }
              ].map((badge, idx) => (
                <div key={idx} className={`${badge.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedType === type
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Stipend Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Stipend</label>
              <div className="flex flex-wrap gap-2">
                {stipends.map(stipend => (
                  <button
                    key={stipend}
                    onClick={() => setSelectedStipend(stipend)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedStipend === stipend
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {stipend}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSelectedStipend('All');
                }}
                className="w-full border-2 border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredInternships.length} Internships Found
            </h2>
            <p className="text-slate-600">Showing opportunities with guaranteed interviews</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white">
              <option>Sort by: Latest</option>
              <option>Sort by: Stipend (High to Low)</option>
              <option>Sort by: Stipend (Low to High)</option>
              <option>Sort by: Application Deadline</option>
            </select>
          </div>
        </div>

        {/* Internships Grid */}
        {filteredInternships.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.map(internship => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                Load More Internships
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">No internships found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">Try adjusting your search filters</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedType('All');
                setSelectedStipend('All');
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Trust Section */}
        <div className="mt-20 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-8 border border-slate-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Students Trust Internadda</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🏛️',
                  title: 'MSME Certified Platform',
                  desc: 'Government recognized and verified platform'
                },
                {
                  icon: '🤝',
                  title: 'Direct Manager Interviews',
                  desc: 'Skip HR rounds, meet decision-makers directly'
                },
                {
                  icon: '💰',
                  title: 'Money-Back Guarantee',
                  desc: '100% refund if you dont get an interview'
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;
