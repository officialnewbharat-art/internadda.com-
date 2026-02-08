import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Loader2, 
  Lock, 
  CheckCircle, 
  Award, 
  Building2, 
  Shield, 
  Zap, 
  Clock, 
  Users, 
  BadgeCheck, 
  IndianRupee, 
  MessageSquare 
} from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Safety check for internship data
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initiatePayment = () => {
    setIsProcessing(true);
    
    // Gatekeeper Logic: Generate a unique token for this session
    const orderId = `ORD_${id}_${Date.now()}`;
    localStorage.setItem('active_payment_token', orderId);
    
    // Cashfree Production Integration
    const returnUrl = encodeURIComponent(`${window.location.origin}/#/payment-success`);
    const cashfreeUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&return_url=${returnUrl}`;

    setTimeout(() => {
      window.location.href = cashfreeUrl;
    }, 800);
  };

  const recentFeedback = [
    { name: "Aditi V.", text: "The assessment questions were high quality. Definitely prepares you for the actual interview." },
    { name: "Sahil M.", text: "Smooth onboarding process. Received my schedule within the promised timeline." },
    { name: "Priya K.", text: "Highly professional environment. The certification adds real value to the resume." }
  ];

  if (!internship) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-md">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                <span className="text-xs font-medium text-slate-600 mt-2">Apply</span>
              </div>
              <div className="flex-1 h-1 bg-indigo-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200 animate-pulse">2</div>
                <span className="text-xs font-medium text-slate-600 mt-2">Enrollment</span>
              </div>
              <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold">3</div>
                <span className="text-xs font-medium text-slate-400 mt-2">Assessment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Award size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{internship.title}</h2>
                    <p className="text-slate-600 font-medium tracking-tight">Professional Assessment & Hiring Module</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">{internship.category}</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">Active Opening</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-slate-900">₹199</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">One-time Processing</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Program Inclusions:</h3>
                {[
                  "Advanced 25-Question Technical Assessment",
                  "Direct Interview Scheduling with Partner Firms",
                  "MSME-Verified Experience Certificate",
                  "6 Months Career Support & Guidance",
                  "Verified Internship Opening Access"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Feedback Section */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <MessageSquare size={120} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2">
                <Zap size={14} /> Recent Intern Feedback
              </h3>
              <div className="space-y-6 relative z-10">
                {recentFeedback.map((fb, i) => (
                  <div key={i} className="border-l-2 border-slate-800 pl-4 py-1">
                    <p className="text-sm italic text-slate-300 mb-2 leading-relaxed">"{fb.text}"</p>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      {fb.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <ShieldCheck className="text-indigo-600 shrink-0" size={24} />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Verified Secure</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">256-bit Encryption</div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <Building2 className="text-slate-600 shrink-0" size={24} />
                <div>
                  <div className="font-bold text-slate-900 text-sm">MSME Registered</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Authorized Hub</div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Column */}
          <div className="lg:col-span-2 sticky top-24">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
              
              <h1 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Checkout Summary</h1>
              
              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold uppercase">Processing Fee</span>
                  <span className="font-black text-slate-900">₹199</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold uppercase">Assessment Access</span>
                  <span className="font-bold text-emerald-600">INCLUDED</span>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Payable</div>
                    <div className="text-5xl font-black text-slate-900 leading-none">₹199</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1">
                      <Lock size={10} /> Secure
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={initiatePayment}
                disabled={isProcessing}
                className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <IndianRupee size={24} />
                    Pay ₹199 Now
                  </>
                )}
              </button>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex justify-center items-center gap-4 opacity-30 grayscale">
                  <div className="font-black text-xs">VISA</div>
                  <div className="font-black text-xs">MASTERCARD</div>
                  <div className="font-black text-xs">UPI</div>
                  <div className="font-black text-xs">RUPAY</div>
                </div>
                <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">
                  Secure checkout powered by Cashfree
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button onClick={() => navigate(-1)} className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                ← Return to Details
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span className="text-[10px] font-black uppercase">48h Response</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span className="text-[10px] font-black uppercase">12,000+ Interns</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck size={16} />
            <span className="text-[10px] font-black uppercase">MSME Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
