import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, Lock } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = () => {
    setIsProcessing(true);
    const internshipId = id || "1"; 
    const orderId = `ORD_${internshipId}_${Date.now()}`;
    
    // 1. DYNAMIC ORIGIN DETECTION (internadda.com ya test.internadda.com auto detect karega)
    const currentOrigin = window.location.origin;

    // 2. SUCCESS REDIRECT KE LIYE TOKEN SAVE KARNA
    localStorage.setItem('active_payment_token', orderId);

    // 3. SECURE REDIRECT URL GENERATION
    // Hash routing (#) ke liye path handle kiya gaya hai
    const returnUrl = encodeURIComponent(`${currentOrigin}/#/payment-success`);
    
    // 4. CASHFREE REDIRECT
    // Same Window redirect taaki mobile users ke liye flow smooth rahe
    window.location.href = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&return_url=${returnUrl}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-8 text-center border border-slate-100">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Final Step</h1>
        <p className="text-slate-500 mb-6">Unlock assessment for {internship.title}</p>
        
        <div className="bg-indigo-50 rounded-2xl py-8 mb-8">
          <div className="text-5xl font-black text-slate-900">₹10</div>
          <p className="text-xs text-indigo-600 font-bold mt-2 uppercase tracking-widest">Secure Professional Fee</p>
        </div>

        <button
          onClick={initiatePayment}
          disabled={isProcessing}
          className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-200"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" /> 
              <span>Redirecting to Gateway...</span>
            </>
          ) : (
            "Pay & Start Test Now"
          )}
        </button>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 opacity-60">
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck size={20} className="text-emerald-600" />
            <span className="text-[9px] font-black uppercase">Secure Server</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Lock size={20} className="text-indigo-600" />
            <span className="text-[9px] font-black uppercase">PCI Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
