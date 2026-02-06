import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthPage: React.FC<{ mode: 'login' | 'signup', setUser: (user: any) => void }> = ({ mode, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{name: string, email: string} | null>(null);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '',
    phone: '',
    education: 'Undergraduate',
    domain: 'Technology'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        // Clean phone number
        const cleanedPhone = formData.phone.replace(/\s/g, '');
        
        // Sign up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { 
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { 
              full_name: formData.name,
              phone: cleanedPhone,
              education: formData.education,
              domain: formData.domain
            } 
          }
        });
        
        if (signUpError) throw signUpError;

        // Auto login after signup
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        
        if (loginError) throw loginError;

        // Set success data for animation
        setSuccessData({
          name: formData.name,
          email: formData.email
        });
        setShowSuccess(true);

        // Create user profile
        const loggedInUser: UserProfile = {
          id: loginData.user.id,
          name: formData.name,
          email: formData.email,
          phone: cleanedPhone,
          education: formData.education,
          domain: formData.domain,
          unlockedRealTest: false
        };

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        // Auto navigate to dashboard after animation
        setTimeout(() => {
          setUser(loggedInUser);
          navigate('/dashboard');
        }, 4000);

      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;

        const loggedInUser: UserProfile = {
          id: data.user.id,
          name: data.user.user_metadata.full_name || 'User',
          email: data.user.email || '',
          phone: data.user.user_metadata.phone || '',
          education: data.user.user_metadata.education || 'N/A',
          domain: data.user.user_metadata.domain || 'N/A',
          unlockedRealTest: false
        };

        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        navigate('/dashboard');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    
    // Format as Indian phone number
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
    } else {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
    }
  };

  // Professional Success Animation Component
  if (showSuccess && successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden">
        <div className="relative w-full max-w-lg">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>

          {/* Success Card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20">
              <div className="w-full h-full bg-white rounded-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-8">
              {/* Success Icon with Animation */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center shadow-lg">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center animate-pulse-slow">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-float"
                      style={{
                        left: `${50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                        top: `${50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Welcome to Internadda, {successData.name.split(' ')[0]}!
                </h2>
                
                <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                  Your journey to career success begins now. We're preparing your personalized dashboard...
                </p>

                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">Account Verified Successfully</span>
                </div>
              </div>

              {/* User Info Card */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-2xl p-6 max-w-xs mx-auto">
                <div className="text-left space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Account Created</div>
                    <div className="font-medium text-slate-800">{successData.email}</div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-sm text-slate-500">Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-emerald-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
                  <svg className="w-5 h-5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Setting up your personalized experience...</span>
                </div>

                <div className="w-full max-w-xs mx-auto">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-progress-bar rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Loading</span>
                    <span>Dashboard</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="pt-4 border-t border-slate-100">
                <div className="inline-flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Your data is protected with enterprise-grade security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-slate-500">Trusted by students from top institutions</p>
            <div className="flex justify-center gap-6 opacity-60">
              {['IIT', 'NIT', 'BITS', 'DU', 'IIM'].map(inst => (
                <div key={inst} className="text-sm font-medium text-slate-600 px-3 py-1 bg-white/50 rounded-lg">
                  {inst}
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-10px) scale(1.1); }
            }
            @keyframes progress-bar {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            @keyframes pulse-slow {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.8; }
            }
            @keyframes spin-slow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-progress-bar {
              animation: progress-bar 4s ease-in-out forwards;
            }
            .animate-pulse-slow {
              animation: pulse-slow 2s ease-in-out infinite;
            }
            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            {/* Professional Logo */}
            <div 
              onClick={() => navigate('/')}
              className="inline-block cursor-pointer mb-6 group"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <img 
                  src="https://drive.google.com/file/d/117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa/view?usp=drive_link" 
                  alt="Internadda" 
                  className="w-16 h-16 rounded-xl object-cover"
                  onError={(e) => {
                    // Professional fallback
                    e.currentTarget.outerHTML = `
                      <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
                        <span class="text-white font-bold text-lg">IA</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              {mode === 'login' ? 'Sign in to continue' : 'Start your career journey today'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input 
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'} outline-none transition-all text-slate-700 placeholder:text-slate-400`}
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={e => {
                    setFormData({...formData, name: e.target.value});
                    setErrors(prev => ({...prev, name: ''}));
                  }}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input 
                required
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'} outline-none transition-all text-slate-700 placeholder:text-slate-400`}
                placeholder="name@email.com" 
                type="email" 
                value={formData.email}
                onChange={e => {
                  setFormData({...formData, email: e.target.value});
                  setErrors(prev => ({...prev, email: ''}));
                }}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-slate-500">🇮🇳 +91</span>
                      <div className="w-px h-4 bg-slate-200"></div>
                    </div>
                    <input 
                      required
                      className={`w-full pl-24 pr-4 py-3 rounded-lg border ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'} outline-none transition-all text-slate-700 placeholder:text-slate-400`}
                      placeholder="987 654 3210" 
                      value={formData.phone}
                      onChange={e => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setFormData({...formData, phone: formatted});
                        setErrors(prev => ({...prev, phone: ''}));
                      }}
                      maxLength={12}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-xs text-slate-400 mt-1">Enter your 10-digit mobile number</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Education</label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 bg-white"
                      value={formData.education}
                      onChange={e => setFormData({...formData, education: e.target.value})}
                    >
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">Post Graduate</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Domain</label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 bg-white"
                      value={formData.domain}
                      onChange={e => setFormData({...formData, domain: e.target.value})}
                    >
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input 
                required
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'} outline-none transition-all text-slate-700 placeholder:text-slate-400`}
                placeholder="••••••••" 
                type="password" 
                value={formData.password}
                onChange={e => {
                  setFormData({...formData, password: e.target.value});
                  setErrors(prev => ({...prev, password: ''}));
                }}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              {mode === 'signup' && (
                <p className="text-xs text-slate-400 mt-1">Must be at least 6 characters</p>
              )}
            </div>

            <button 
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="text-sm text-slate-500 mb-4">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">
                    Sign up now
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">
                    Sign in here
                  </Link>
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Enterprise-grade security & privacy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
