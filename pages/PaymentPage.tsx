import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const checkInterval = useRef<NodeJS.Timeout | null>(null);

  // 1. Storage Listener: Jab doosra tab (Success Page) localStorage update karega
  useEffect(() => {
    const handleSync = (e: StorageEvent) => {
      if (e.key === `payment_${id}`) {
        const data = JSON.parse(e.newValue || '{}');
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
    // 1 second ke andar redirect
    setTimeout(() => {
      navigate(`/test/real/${id}`);
    }, 1000);
  };

  const initiatePayment = () => {
    setIsProcessing(true);
    const orderId = `ORD_${Date.now()}`;
    
    // Aapne ₹10 set kiya hai toh wo yahan automatic handle hoga
    const paymentUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}`;
    const paymentWindow = window.open(paymentUrl, 'CashfreePayment', 'width=500,height=720');

    if (!paymentWindow) {
      alert('Please allow popups!');
      setIsProcessing(false);
      return;
    }

    // 2. Fast Polling: Har 800ms mein check karega (Very Fast)
    checkInterval.current = setInterval(() => {
      const stored = localStorage.getItem(`payment_${id}`);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.status === 'success') {
          triggerSuccess();
        }
      }

      if (paymentWindow.closed) {
        clearInterval(checkInterval.current!);
        // Ek aakhri baar check
        const lastCheck = localStorage.getItem(`payment_${id}`);
        if (lastCheck && JSON.parse(lastCheck).status === 'success') {
          triggerSuccess();
        } else {
          setIsProcessing(false);
        }
      }
    }, 800);
  };

  if (paymentVerified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <CheckCircle size={60} className="text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Payment Successful! ✅</h2>
          <p className="text-slate-500">Redirecting to Test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-8 text-center border border-slate-100">
        <h1 className="text-xl font-bold mb-6">Complete Payment</h1>
        
        <div className="bg-slate-50 rounded-2xl py-6 mb-6">
          <p className="text-xs text-slate-400 font-bold uppercase">Payable Amount</p>
          <div className="text-5xl font-black text-slate-900">₹10</div> 
          <p className="text-[10px] text-indigo-600 mt-2">Testing Mode Active</p>
        </div>

        {isProcessing ? (
          <div className="py-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-600">Completing Transaction...</p>
          </div>
        ) : (
          <button
            onClick={initiatePayment}
            className="w-full bg-[#41478a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95"
          >
            <div className="text-lg">Pay Now</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
