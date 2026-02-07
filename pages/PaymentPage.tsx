import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

interface PaymentStatus {
  status: 'pending' | 'success' | 'failed';
  orderId?: string;
  transactionId?: string;
  amount?: number;
}

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: 'pending' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  // 1. Check existing payment and LISTEN for changes from other tabs/windows
  useEffect(() => {
    const checkPayment = () => {
      const paymentData = localStorage.getItem(`payment_${id}`);
      if (paymentData) {
        const data = JSON.parse(paymentData);
        if (data.status === 'success') {
          setPaymentVerified(true);
          setPaymentStatus({ status: 'success', ...data });
        }
      }
    };

    // Check on mount
    checkPayment();

    // Listener for cross-tab updates (important for Cashfree redirects)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `payment_${id}`) {
        checkPayment();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id]);

  // 2. Redirect automatically when verified
  useEffect(() => {
    if (paymentVerified) {
      const timer = setTimeout(() => {
        navigate(`/test/real/${id}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentVerified, id, navigate]);

  const handlePaymentSuccess = (data: any) => {
    setIsProcessing(false);
    setPaymentStatus({ status: 'success', ...data });
    setPaymentVerified(true);
  };

  const initiatePayment = async () => {
    setIsProcessing(true);
    
    try {
      const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const paymentUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&order_amount=199`;
      
      const paymentWindow = window.open(paymentUrl, 'CashfreePayment', 'width=500,height=700');
      
      if (!paymentWindow) {
        alert('Please allow popups to continue with payment');
        setIsProcessing(false);
        return;
      }

      // LIVE TRACKING LOOP
      const checkPaymentInterval = setInterval(() => {
        // A. Check if success data was written to storage by the payment flow
        const paymentData = localStorage.getItem(`payment_${id}`);
        if (paymentData) {
          const data = JSON.parse(paymentData);
          if (data.status === 'success') {
            clearInterval(checkPaymentInterval);
            handlePaymentSuccess(data);
          }
        }

        // B. If window is closed manually by user without success
        if (paymentWindow.closed && !paymentVerified) {
          clearInterval(checkPaymentInterval);
          setIsProcessing(false);
        }
      }, 1500);

      // Timeout after 10 minutes
      setTimeout(() => clearInterval(checkPaymentInterval), 600000);
      
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment initiation failed. Please try again.');
    }
  };

  const handleStartTest = () => {
    navigate(`/test/real/${id}`);
  };

  if (paymentVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-center p-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful! ✅</h2>
            <p className="text-slate-500 mb-6">Redirecting you to the assessment...</p>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-bold text-slate-700">{internship.title}</p>
              <p className="text-xs text-slate-500 mt-1">Order ID: {paymentStatus.orderId}</p>
            </div>
            
            <button
              onClick={handleStartTest}
              className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition-all"
            >
              Start Assessment Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-indigo-600 p-4 text-center text-white text-sm font-bold flex items-center justify-center gap-2">
            <ShieldCheck size={18} /> Secure Professional Payment Gateway
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                  Unlock Your Internship. 🚀
                </h1>
                <p className="text-slate-500 leading-relaxed">
                  Join <strong>{internship.company}</strong>. Our processing fee covers the MSME certification and direct interview scheduling.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Award className="text-indigo-600" />, text: "Verified MSME Certificate" },
                  { icon: <CheckCircle className="text-indigo-600" />, text: "Direct Interview Slot" },
                  { icon: <Lock className="text-indigo-600" />, text: "100% Secure Transaction" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    {item.icon}
                    <span className="text-sm font-bold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-[30px] p-8 border border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="mb-8">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Amount to Pay</span>
                <div className="text-5xl font-black text-slate-900 mt-2">₹199</div>
              </div>

              {isProcessing ? (
                <div className="w-full flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-slate-900 font-bold">Waiting for Payment...</p>
                  <p className="text-sm text-slate-500 mt-2">Complete the transaction in the opened window</p>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <button
                    onClick={initiatePayment}
                    className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                  >
                    <img 
                      src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
                      alt="Cashfree" 
                      className="w-8 h-8"
                    />
                    <div className="text-left">
                      <div className="text-lg">Pay ₹199 Now</div>
                      <div className="text-[10px] opacity-80 uppercase tracking-tighter">Secure via Cashfree</div>
                    </div>
                  </button>
                  
                  <div className="grid grid-cols-3 gap-2 opacity-60">
                    {['UPI', 'Card', 'Wallet'].map(m => (
                      <div key={m} className="text-[10px] font-bold py-1 border border-slate-300 rounded text-slate-500">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
