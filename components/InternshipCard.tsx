import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  // Enhanced resources for authenticity
  const CARD_IMAGES = [
    "https://iili.io/fbAQLjn.md.png",
    "https://iili.io/fbArEUF.png",
    "https://iili.io/fbAQsTX.md.png"
  ];

  const COMPANY_LOGOS = [
    "https://iili.io/fbAXcYB.png", // Main logo
    "https://iili.io/fmiM6Dg.png",   
    "https://iili.io/fbAXw2p.png",  
    "https://iili.io/fmisLLG.png"
  ];

  const STIPENDS = ["₹2,000 - ₹8,000", "₹2,500 - ₹5,000", "₹3,000 - ₹7,000"];
  const COMPANY_NAMES = ["Arjuna-ai Solutions", "Internadda Enterprises", "Tech-Nexus Systems"];

  const itemIndex = (Number(internship.id) - 1) % 3;
  const selectedImage = CARD_IMAGES[itemIndex];
  const selectedStipend = STIPENDS[itemIndex];
  const selectedCompanyName = COMPANY_NAMES[itemIndex];

  // Deterministic Company Count (stays the same on refresh for this specific card)
  const staticCompanyCount = 40 + (Number(internship.id) % 11);
  
  const [applications, setApplications] = useState(Math.floor(Math.random() * (150 - 130 + 1)) + 130);

  useEffect(() => {
    const interval = setInterval(() => {
      setApplications((prev) => {
        const nextValue = prev + (Math.floor(Math.random() * 6) - 2);
        return Math.min(Math.max(nextValue, 130), 150);
      });
    }, 120000); 
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
          🔥 {applications} Applied
        </div>
      </div>

      <div className="relative h-40 overflow-hidden">
        <img src={selectedImage} alt={internship.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Multi-Company Section */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-2">Hiring At {selectedCompanyName} & others</span>
          <div className="flex items-center">
            <div className="flex -space-x-3 overflow-hidden">
              {COMPANY_LOGOS.map((logo, i) => (
                <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-contain bg-white border border-slate-100" src={logo} alt="Company" />
              ))}
            </div>
            <span className="ml-3 text-xs font-bold text-indigo-600">+{staticCompanyCount} more companies</span>
          </div>
        </div>
        
        <h3 className="font-bold text-base text-slate-900 mb-4 line-clamp-1">{internship.title}</h3>

        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-50">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Stipend</div>
            <div className="text-xs font-bold text-indigo-600">{selectedStipend}</div>
          </div>
          <div className="w-px h-6 bg-slate-100"></div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Location</div>
            <div className="text-xs font-bold text-slate-700">{internship.location}</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Skills Required</div>
          <div className="flex flex-wrap gap-1.5">
            {internship.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded border border-slate-100">{skill}</span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <Link to={`/apply/${internship.id}`} className="block w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold text-center hover:bg-indigo-600 transition-colors shadow-md">
            Apply Now
          </Link>
          <p className="text-[9px] text-center text-slate-400 mt-2 font-medium">
            Next Batch Starts Soon • Direct Selection Process
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
