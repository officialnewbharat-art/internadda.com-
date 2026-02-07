import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, Lock } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);

// PaymentPage.tsx ke andar initiatePayment function ko aise update karein:

const initiatePayment = () => {
  setIsProcessing(true);
  const internshipId = id || "1"; 
  const orderId = `ORD_${internshipId}_${Date.now()}`;
  
  // SUCCESS REDIRECT KE LIYE TOKEN SAVE KARNA
  localStorage.setItem('active_payment_token', orderId);

  const returnUrl = encodeURIComponent(`https://internadda-com-tau.vercel.app/#/payment-success`);
  
  // Same Window redirect
  window.location.href = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&return_url=${returnUrl}`;
};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-8 text-center border border-slate-100">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Final Step</h1>
        <p className="text-slate-500 mb-6">Unlock assessment for {internship.title}</p>
        
        <div className="bg-indigo-50 rounded-2xl py-8 mb-8">
          <div className="text-5xl font-black text-slate-900">₹10</div>
          <p className="text-xs text-indigo-600 font-bold mt-2 uppercase tracking-widest">Secure Payment</p>
        </div>

        <button
          onClick={initiatePayment}
          disabled={isProcessing}
          className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : "Pay & Start Test Now"}
        </button>

        <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
          <ShieldCheck size={16} /> <Lock size={16} />
          <span className="text-[10px] font-bold">PCI DSS COMPLIANT</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
