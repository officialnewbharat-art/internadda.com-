import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const OfferLetterPage: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    position: 'Python Developer Intern',
    stipend: '₹15,000 - ₹20,000/month',
    duration: '6 Months',
    location: 'Remote / Hyderabad',
    projects: 'Django/Flask, APIs, Cloud',
    mentorship: 'Senior Python Lead'
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const contact = searchParams.get('contact');
    
    if (name) {
      setFormData(prev => ({ ...prev, name }));
    }
    
    if (contact) {
      setFormData(prev => ({ ...prev, contact }));
    }
  }, [location.search]);

  const generateOfferLetter = () => {
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      params.set(key, value);
    });
    
    // Open offer letter in new tab
    window.open(`/offer-letter.html?${params.toString()}`, '_blank');
  };

  const generateCertificateId = () => {
    const prefix = "INTAD";
    const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
    const timestamp = Date.now().toString().slice(-5);
    return `${prefix}-${randomChars}-${timestamp}`;
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 14);
  const formattedStartDate = startDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const logoUrl = "https://drive.google.com/uc?export=view&id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa";
  const arjunaLogo = "https://drive.google.com/uc?export=view&id=1cOHWWgMaTqBk2EjIhaoJXnmZy-Fudbiq";
  const signatureUrl = "https://drive.google.com/uc?export=view&id=1QazwGaRJjiK9UpQR5KzIOSyanQEwbru0";
  const qrCodeUrl = "https://drive.google.com/uc?export=view&id=1trjD25RAzU0nXIb41FIiGN_ChvBbMLG8";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Generate Your Offer Letter
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create a professional, personalized internship offer letter recognized by 150+ companies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Details *</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  placeholder="Email | Phone"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Position</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    <option value="Python Developer Intern">Python Developer Intern</option>
                    <option value="Web Development Intern">Web Development Intern</option>
                    <option value="Data Science Intern">Data Science Intern</option>
                    <option value="Marketing Intern">Marketing Intern</option>
                    <option value="UI/UX Design Intern">UI/UX Design Intern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Stipend</label>
                  <select
                    value={formData.stipend}
                    onChange={(e) => setFormData({...formData, stipend: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    <option value="₹1,000 - ₹5,000/month">₹1,000 - ₹5,000/month</option>
                    <option value="₹5,000 - ₹10,000/month">₹5,000 - ₹10,000/month</option>
                    <option value="₹10,000 - ₹15,000/month">₹10,000 - ₹15,000/month</option>
                    <option value="₹15,000 - ₹20,000/month">₹15,000 - ₹20,000/month</option>
                    <option value="₹20,000+/month">₹20,000+/month</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="9 Months">9 Months</option>
                    <option value="12 Months">12 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Remote / Hyderabad">Remote / Hyderabad</option>
                    <option value="Remote / Bangalore">Remote / Bangalore</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateOfferLetter}
                disabled={!formData.name || !formData.contact}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Offer Letter
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Preview</h3>
            
            <div className="border border-slate-300 rounded-xl p-6 bg-gradient-to-br from-slate-50 to-white">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-slate-500">Certificate ID</div>
                  <div className="font-mono font-bold text-slate-900 text-lg">
                    {generateCertificateId()}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Name:</span>
                    <span className="font-semibold">{formData.name || 'Your Name'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Position:</span>
                    <span className="font-semibold">{formData.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stipend:</span>
                    <span className="font-semibold">{formData.stipend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-semibold">{formData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Start Date:</span>
                    <span className="font-semibold">{formattedStartDate}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                        <img src={logoUrl} alt="Internadda" className="w-12 h-12 object-contain" />
                      </div>
                      <div className="text-xs text-slate-600">Internadda</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                        <img src={arjunaLogo} alt="ArjunaAI" className="w-12 h-12 object-contain" />
                      </div>
                      <div className="text-xs text-slate-600">ArjunaAI</div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-slate-500 mt-4">
                  Valid from {currentDate}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
              <h4 className="font-bold text-slate-900 mb-3">Features of Your Offer Letter:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  <span>Official Internadda & ArjunaAI branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  <span>QR code for verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  <span>Industry recognized format</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  <span>Print-ready PDF option</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterPage;
