import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Mail, MapPin, ChevronRight, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const teamMembers = [
    { 
      name: 'Lucky Tiwari', 
      role: 'Founder & CEO', 
      image: "https://iili.io/fpVtSXS.md.png" 
    },
    { 
      name: 'Vikash Yadav', 
      role: 'Co-Founder & PR head', 
      image: "https://iili.io/fpVtDhB.png" 
    }
  ];

  const socials = [
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={18} />, 
      url: 'https://www.linkedin.com/company/internadda-india',
      hoverClass: 'hover:bg-[#0077B5]' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={18} />, 
      url: 'https://www.instagram.com/internadda.india',
      hoverClass: 'hover:bg-[#E4405F]' 
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={18} />, 
      url: 'https://www.youtube.com/@theinternadda',
      hoverClass: 'hover:bg-[#FF0000]' 
    }
  ];

  const popularSearches = [
    { name: "Internships in India", path: "/internships" },
    { name: "Remote Python Internships", path: "/internships" },
    { name: "Web Development Internships", path: "/internships" },
    { name: "Data Science Internships", path: "/internships" },
    { name: "Marketing Internships", path: "/internships" },
    { name: "Online Courses with Certificates", path: "https://courses.internadda.com/" },
    { name: "Internships in Delhi", path: "/internships" },
    { name: "Summer Internships 2024", path: "/internships" }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Info - Centered on Mobile */}
          <div className="lg:col-span-2 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w200"
                  alt="Internadda"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-white block">Internadda</span>
                <p className="text-xs text-slate-400">India's Adda for Internships</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting talented students with premium internship opportunities. 
              As an MSME certified platform, we've helped 7,000+ students launch 
              their professional careers with top-tier companies.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700">
                MSME CERTIFIED
              </div>
              <div className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700">
                STARTUP INDIA
              </div>
            </div>
          </div>

          {/* Links Section - Centered on Mobile */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><Link to="/internships" className="text-slate-400 hover:text-white transition-all text-sm block">Browse Internships</Link></li>
                <li><Link to="/tests" className="text-slate-400 hover:text-white transition-all text-sm block">Practice Tests</Link></li>
                <li><Link to="/hiring" className="text-slate-400 hover:text-white transition-all text-sm block">Hiring Process</Link></li>
                <li><Link to="/stories" className="text-slate-400 hover:text-white transition-all text-sm block">Success Stories</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-slate-400 hover:text-white transition-all text-sm block">About Us</Link></li>
                <li><Link to="/team" className="text-slate-400 hover:text-white transition-all text-sm block">Our Team</Link></li>
                <li><Link to="/faq" className="text-slate-400 hover:text-white transition-all text-sm block">Support FAQ</Link></li>
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-all text-sm block">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Leadership Section - Centered on Mobile */}
          <div className="lg:block">
            <h3 className="text-white font-semibold text-lg mb-6 text-center md:text-left">Our Leadership</h3>
            <div className="space-y-4 flex flex-col items-center md:items-start">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800 w-full max-w-[250px] md:max-w-none">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                  />
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{member.name}</div>
                    <div className="text-[10px] text-slate-400">{member.role}</div>
                  </div>
                </div>
              ))}
              <Link to="/team" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 mt-2 justify-center md:justify-start">
                Meet the full team <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* SEO - Popular Searches Section - Centered on Mobile */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center md:text-left">
          <h4 className="text-white font-bold text-sm mb-6 flex items-center justify-center md:justify-start gap-2">
            <Globe size={16} className="text-indigo-400" /> Popular Internship Searches
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start">
            {popularSearches.map((search, idx) => (
              search.path.startsWith('http') ? (
                <a key={idx} href={search.path} target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-500 hover:text-indigo-400 transition-colors">
                  {search.name}
                </a>
              ) : (
                <Link key={idx} to={search.path} className="text-[12px] text-slate-500 hover:text-indigo-400 transition-colors">
                  {search.name}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Contact & Newsletter Bar - Centered on Mobile */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="text-center md:text-left space-y-3">
            <h4 className="text-white font-bold text-sm mb-4">Contact Support</h4>
            <a href="mailto:support@internadda.com" className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <Mail size={16} className="text-indigo-400" /> support@internadda.com
            </a>
            <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400">
              <MapPin size={16} className="text-indigo-400" /> Delhi, India
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h4 className="text-white font-bold text-sm mb-4">Follow Our Journey</h4>
            <div className="flex gap-4">
              {socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 shadow-lg ${social.hoverClass}`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-white font-bold text-sm mb-4">Career Updates</h4>
            <div className="flex w-full max-w-xs">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-slate-800 border-none rounded-l-lg px-4 py-2 text-xs w-full focus:ring-1 focus:ring-indigo-500 text-white"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-r-lg text-white text-xs font-bold transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered on Mobile */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[11px] text-slate-500">
            © {currentYear} Internadda Platform. All rights reserved. 
            <span className="hidden md:inline ml-2">| UDYAM-MH-08-XXXXXX</span>
          </p>
          <div className="flex gap-6 text-[11px] text-slate-500">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
