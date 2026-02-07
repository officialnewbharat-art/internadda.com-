import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

interface PaymentStatus {
  status: 'pending' | 'success' | 'failed';
  orderId?: string;
  transactionId?: string;
}

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  // 1. MONITOR STORAGE AND URL CHANGES
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Catch success from other tabs (Cashfree Response Page)
      if (e.key === `payment_${id}`) {
        const data = JSON.parse(e.newValue || '{}');
        if (data.status === 'success') {
          setPaymentVerified(true);
          setTimeout(() => navigate(`/test/real/${id}`), 1500);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id, navigate]);

  const initiatePayment = async () => {
    setIsProcessing(true);
    const orderId = `ORD_${Date.now()}`;
    
    // Use the exact Cashfree form URL provided
    const paymentUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&order_amount=199`;
    const paymentWindow = window.open(paymentUrl, 'CashfreePayment', 'width=500,height=700');

    if (!paymentWindow) {
      alert('Please allow popups to complete payment');
      setIsProcessing(false);
      return;
    }

    // 2. LIVE TRACKING LOOP
    const checkPaymentInterval = setInterval(() => {
      try {
        // Check if the user has reached the Cashfree Response URL you mentioned
        // This works if the redirect happens within the same domain/origin setup
        const currentUrl = paymentWindow.location.href;
        if (currentUrl.includes('/forms/response/')) {
          clearInterval(checkPaymentInterval);
          finalizeSuccess(orderId);
        }
      } catch (e) {
        // Cross-origin might block URL reading, so we fall back to localStorage check
        const data = JSON.parse(localStorage.getItem(`payment_${id}`) || '{}');
        if (data.status === 'success') {
          clearInterval(checkPaymentInterval);
          setPaymentVerified(true);
          navigate(`/test/real/${id}`);
        }
      }

      // If user closes window manually
      if (paymentWindow.closed) {
        clearInterval(checkPaymentInterval);
        setIsProcessing(false);
      }
    }, 2000);
  };

  const finalizeSuccess = (orderId: string) => {
    const successData = {
      status: 'success',
      orderId: orderId,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`payment_${id}`, JSON.stringify(successData));
    setPaymentVerified(true);
    navigate(`/test/real/${id}`);
  };

  if (paymentVerified) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-xl border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Payment Successful!</h2>
          <p className="text-slate-500 mt-2">Redirecting to your final exam...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-4 text-center text-white text-xs font-bold uppercase tracking-widest">
          Secure Payment Gateway
        </div>
        <div className="p-10 text-center">
          <div className="mb-8">
            <span className="text-slate-400 text-xs font-bold uppercase">Amount Payable</span>
            <div className="text-5xl font-black text-slate-900 mt-1">₹199</div>
          </div>

          {isProcessing ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
              <p className="font-bold text-slate-700">Waiting for Cashfree...</p>
              <p className="text-xs text-slate-500">Complete payment in the new window</p>
            </div>
          ) : (
            <button
              onClick={initiatePayment}
              className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
            >
              <img src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" className="w-8 h-8" alt="CF" />
              <div className="text-left">
                <div className="text-lg">Pay ₹199 Now</div>
                <div className="text-[10px] opacity-80">PROCEED TO FINAL TEST</div>
              </div>
            </button>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
              <ShieldCheck size={14} className="text-emerald-500" /> MSME SECURED
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
              <Lock size={14} className="text-indigo-500" /> PCI COMPLIANT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
