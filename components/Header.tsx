import React, { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Scroll effect - throttled
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock - fixed version
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = 'auto';
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = 'auto';
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Prevent iOS bounce effect on mobile
  useEffect(() => {
    const preventTouchMove = (e: TouchEvent) => {
      if (mobileMenuOpen) {
        e.preventDefault();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
    }
    
    return () => {
      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Internships", path: "/internships", icon: Briefcase },
    { name: "Courses", path: "https://courses.internadda.com/", icon: BookOpen, isExternal: true },
    { name: "About Us", path: "/about", icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out ${
        scrolled || mobileMenuOpen ? "bg-white shadow-sm py-2" : "bg-white/95 backdrop-blur-sm py-3"
      }`}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)', // GPU acceleration
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          <Link 
            to="/" 
            className="flex items-center space-x-2 md:space-x-3 group outline-none"
            aria-label="Internadda Home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden">
              <img 
                src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                alt="Internadda Logo" 
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-200"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-gray-900 group-hover:text-indigo-600 transition-colors">
                INTERN<span className="text-indigo-600">ADDA</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
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
                  className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors py-2 px-1 outline-none"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative py-2 px-1 outline-none ${
                    isActive(link.path) 
                      ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full" 
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setIsProfileOpen(prev => !prev); 
                  }}
                  className="flex items-center space-x-3 pl-4 border-l border-gray-200 group outline-none"
                  aria-label="User menu"
                >
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 truncate max-w-[120px]">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {user.domain || 'Intern'}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden group-hover:border-indigo-200 transition-colors">
                    <UserIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                    style={{
                      animation: 'fadeIn 150ms ease-out',
                      transformOrigin: 'top right'
                    }}
                  >
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors outline-none"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserIcon size={16} className="text-indigo-600" /> 
                      View Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors outline-none"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={16} className="text-indigo-600" /> 
                      Settings
                    </Link>
                    <div className="my-2 border-t border-gray-100"></div>
                    <button
                      onClick={() => { onLogout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors outline-none text-left"
                    >
                      <LogOut size={16} /> 
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors outline-none"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm outline-none"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        ref={menuRef}
      >
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        
        <div 
          className={`absolute right-0 top-0 h-full w-72 bg-white flex flex-col transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg">INTERNADDA</span>
              <span className="text-xs font-medium text-gray-400 mt-0.5">
                India's Adda for Internships
              </span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 overscroll-contain">
            <div className="px-4 space-y-1">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 outline-none"
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-sm">{link.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors outline-none ${
                      isActive(link.path) 
                        ? "bg-indigo-50 text-indigo-600" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <link.icon className={`w-5 h-5 ${isActive(link.path) ? 'text-indigo-500' : 'text-gray-400'}`} />
                      <span className="font-medium text-sm">{link.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive(link.path) ? 'text-indigo-400' : 'text-gray-300'}`} />
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 bg-gray-50/50">
            {user ? (
              <div className="space-y-3">
                <Link 
                  to="/profile" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm outline-none"
                >
                  <UserIcon className="w-5 h-5 text-indigo-600" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 py-3 text-red-600 rounded-lg font-medium text-sm border border-red-100 hover:bg-red-50 transition-colors outline-none"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-3 text-center text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg outline-none"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-3 text-center text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors outline-none"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        /* Prevent body scroll on mobile when menu is open */
        body.no-scroll {
          overflow: hidden !important;
          position: fixed;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </header>
  );
};

export default Header;
