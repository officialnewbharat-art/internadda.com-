import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const checkInterval = useRef<NodeJS.Timeout | null>(null);

  // 1. THE FAST TRACKER: Listen for storage events from any window
  useEffect(() => {
    const handleSync = (e: StorageEvent) => {
      if (e.key === `payment_${id}` && e.newValue) {
        const data = JSON.parse(e.newValue);
        if (data.status === 'success') {
          triggerSuccess();
        }
      }
    };

    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, [id]);

  const triggerSuccess = () => {
    if (checkInterval.current) clearInterval(checkInterval.current);
    setPaymentVerified(true);
    setIsProcessing(false);
    // Instant redirect after showing success UI for 1.5s
    setTimeout(() => {
      navigate(`/test/real/${id}`);
    }, 1500);
  };

  const initiatePayment = () => {
    setIsProcessing(true);
    const orderId = `ORD_${Date.now()}`;
    
    // Open Cashfree
    const paymentUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&order_amount=199`;
    const paymentWindow = window.open(paymentUrl, 'CashfreePayment', 'width=500,height=720,top=100,left=100');

    if (!paymentWindow) {
      alert('Please allow popups to complete payment');
      setIsProcessing(false);
      return;
    }

    // 2. THE WATCHDOG: Poll local storage every 1 second (Fastest way)
    checkInterval.current = setInterval(() => {
      const stored = localStorage.getItem(`payment_${id}`);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.status === 'success') {
          triggerSuccess();
        }
      }

      // If they closed the window without finishing
      if (paymentWindow.closed && !paymentVerified) {
        if (checkInterval.current) clearInterval(checkInterval.current);
        // Final check just in case it closed exactly as it succeeded
        const finalCheck = localStorage.getItem(`payment_${id}`);
        if (finalCheck && JSON.parse(finalCheck).status === 'success') {
          triggerSuccess();
        } else {
          setIsProcessing(false);
        }
      }
    }, 1000);
  };

  if (paymentVerified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Received! ✅</h2>
          <p className="text-slate-500 font-medium">Setting up your Final Test environment...</p>
          <div className="mt-8 flex justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={32} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 py-3 text-center text-white text-[10px] font-black uppercase tracking-[0.2em]">
          Official Internship Assessment
        </div>
        
        <div className="p-10 text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{internship.title}</h1>
            <p className="text-slate-400 text-sm font-medium">Application Processing Fee</p>
          </div>

          <div className="bg-slate-50 rounded-3xl py-8 mb-8 border border-slate-100">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Amount</div>
            <div className="text-6xl font-black text-slate-900">₹199</div>
            <div className="text-emerald-600 text-xs font-bold mt-2 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> 100% Secure Transaction
            </div>
          </div>

          {isProcessing ? (
            <div className="space-y-4 py-4">
              <div className="relative flex justify-center">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-indigo-600">LIVE</div>
              </div>
              <p className="font-bold text-slate-800">Waiting for Payment...</p>
              <p className="text-xs text-slate-500 bg-indigo-50 py-2 rounded-lg">
                Please complete the process in the popup window
              </p>
            </div>
          ) : (
            <button
              onClick={initiatePayment}
              className="w-full bg-[#41478a] hover:bg-[#32386e] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              <img src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" className="w-8 h-8" alt="CF" />
              <div className="text-left">
                <div className="text-xl leading-none">Pay ₹199</div>
                <div className="text-[10px] opacity-70 mt-1 uppercase tracking-tighter">Instant Test Unlock</div>
              </div>
            </button>
          )}

          <div className="mt-10 grid grid-cols-3 gap-2 opacity-40 grayscale">
            {['UPI', 'CARD', 'NET'].map(m => (
              <div key={m} className="text-[9px] font-black border border-slate-300 py-1 rounded-md">{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
