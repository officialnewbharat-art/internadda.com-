
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';

const InternshipDetail: React.FC = () => {
  const { id } = useParams();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img src={internship.image} className="w-full h-full object-cover" alt={internship.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
            <div>
              <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
                {internship.category}
              </span>
              <h1 className="text-4xl font-black text-white tracking-tight">{internship.title}</h1>
            </div>
          </div>
        </div>

        <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
              <p className="text-slate-500 leading-loose">
                {internship.description} This is a unique opportunity for aspiring developers to gain hands-on experience in a professional environment. You will be working directly with senior architects and product managers to deliver impact.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Skills Required</h3>
              <div className="flex flex-wrap gap-3">
                {internship.skills.map(skill => (
                  <span key={skill} className="bg-slate-50 text-slate-600 px-5 py-2 rounded-xl text-sm font-bold border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Key Responsibilities</h3>
              <ul className="space-y-4 text-slate-500 list-disc pl-5">
                <li>Collaborate with cross-functional teams to define features.</li>
                <li>Write clean, modular, and reusable code.</li>
                <li>Perform unit tests and optimize performance.</li>
                <li>Participate in daily stand-ups and sprint planning.</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-1 space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stipend</span>
                <p className="text-lg font-black text-slate-900">{internship.stipend}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</span>
                <p className="text-lg font-black text-slate-900">{internship.location}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                <p className="text-lg font-black text-slate-900">6 Months</p>
              </div>

              <div className="pt-6 border-t border-slate-200 space-y-4">
                <Link 
                  to={`/test/real/${id}`}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center block shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Apply Now (₹199)
                </Link>
                <Link 
                  to={`/test/practice/${id}`}
                  className="w-full border-2 border-indigo-600 text-indigo-600 py-4 rounded-2xl font-bold text-center block hover:bg-indigo-50 transition-all"
                >
                  Free Practice Test
                </Link>
              </div>
            </div>

            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-xs text-emerald-800 font-medium">
                🎯 Over <strong>200 students</strong> have applied for this position in the last 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
