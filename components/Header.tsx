import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Briefcase, ChevronRight, 
  Settings, LogOut, User as UserIcon, Home as HomeIcon, 
  Info, BookOpen, ChevronDown
} from "lucide-react";
import { User } from "../types";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = () => setIsProfileOpen(false);
    if (isProfileOpen) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Internships", path: "/internships", icon: Briefcase },
    { name: "Courses", path: "https://courses.internadda.com/", icon: BookOpen, isExternal: true },
    { name: "About Us", path: "/about", icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "bg-white shadow-md py-1" : "bg-white/90 backdrop-blur-md py-2"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
              <img 
                src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                alt="Internadda Logo" 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-slate-900 group-hover:text-indigo-600 transition-colors">
                INTERN<span className="text-indigo-600">ADDA</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                India's Adda for Internships
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-slate-600 transition-all hover:text-indigo-600 py-2"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold transition-all hover:text-indigo-600 relative py-2 ${
                    isActive(link.path) ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600" : "text-slate-600"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
                  className="flex items-center space-x-3 pl-4 border-l border-slate-200 group"
                >
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">{user.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{user.domain || 'Intern'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center overflow-hidden group-hover:border-indigo-600 transition-colors">
                    <UserIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                      <UserIcon size={18} className="text-indigo-600" /> View Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                      <Settings size={18} className="text-indigo-600" /> Settings
                    </Link>
                    <div className="my-2 border-t border-slate-100"></div>
                    <button
                      onClick={() => { onLogout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 hover:-translate-y-0.5">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 z-[110] transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div className={`absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg">INTERNADDA</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-tighter uppercase">India's Adda for Internships</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-lg text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl transition-all text-slate-600 hover:bg-slate-50"
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className="w-5 h-5" />
                      <span className="font-bold text-sm">{link.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      isActive(link.path) ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className="w-5 h-5" />
                      <span className="font-bold text-sm">{link.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive(link.path) ? 'translate-x-1' : ''}`} />
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="p-6 border-t bg-slate-50/50">
            {user ? (
              <div className="space-y-3">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 p-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm shadow-sm">
                  <UserIcon className="w-5 h-5 text-indigo-600" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 py-4 text-red-600 rounded-xl font-bold text-sm border-2 border-red-50 border-dashed hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3.5 text-center text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="py-3.5 text-center text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-lg">
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
