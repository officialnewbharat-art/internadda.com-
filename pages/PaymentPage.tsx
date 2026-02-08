import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, Lock, CheckCircle, Star, Award, Building2, UserCheck } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = () => {
    setIsProcessing(true);
    const orderId = `ORD_${id}_${Date.now()}`;
    localStorage.setItem('active_payment_token', orderId);
    const returnUrl = encodeURIComponent(`${window.location.origin}/#/payment-success`);
    window.location.href = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&return_url=${returnUrl}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Trust & Details Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><Award size={24}/></div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Professional Certification</h2>
                <p className="text-sm text-slate-500">Internadda Ecosystem • MSME Verified</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Government Registered Internship Provider",
                "Direct interview scheduling with partner firms",
                "Industry-recognized professional certificate",
                "Dedicated mentor support for 6 months"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700 font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 mb-1"><Building2 size={16}/> <span className="text-xs font-bold uppercase">Partners</span></div>
                <div className="text-lg font-black">150+ Companies</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-1"><UserCheck size={16}/> <span className="text-xs font-bold uppercase">Success</span></div>
                <div className="text-lg font-black">98.2% Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex gap-1 mb-4 text-amber-400"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
              <p className="text-lg italic font-medium leading-relaxed">"The assessment was tough but fair. Within 48 hours of paying the fee, I had my interview scheduled and got the offer letter!"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
                <div>
                  <div className="font-bold text-sm">Rahul S.</div>
                  <div className="text-xs text-slate-500 uppercase">Delhi University Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Column */}
        <div className="lg:col-span-2 sticky top-24">
          <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-slate-100">
            <h1 className="text-2xl font-black text-slate-900 mb-6">Order Summary</h1>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold uppercase">Internship Program</span>
                <span className="text-slate-900 font-black">{internship.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold uppercase">Processing Fee</span>
                <span className="text-slate-900 font-black">₹199</span>
              </div>
              <div className="h-px bg-slate-100 my-4"></div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payable Amount</div>
                  <div className="text-4xl font-black text-slate-900">₹199</div>
                </div>
                <div className="text-emerald-600 text-xs font-bold flex items-center gap-1 mb-1 bg-emerald-50 px-2 py-1 rounded">
                  <ShieldCheck size={14}/> 100% Secured
                </div>
              </div>
            </div>

            <button
              onClick={initiatePayment} disabled={isProcessing}
              className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : "Complete Enrollment"}
            </button>

            <div className="mt-8 flex justify-center items-center gap-6 opacity-40">
              <Lock size={24}/> <span className="font-mono font-bold text-xs">AES-256 SSL ENCRYPTED</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-6 font-bold uppercase tracking-tighter">
              Refund available if no interview is scheduled in 48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
