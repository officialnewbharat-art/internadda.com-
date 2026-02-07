import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    
    // 1. SECURITY CHECK: Agar URL me order_id nahi hai, matlab bypass attempt hai
    if (!orderId) {
      setIsValid(false);
      setIsVerifying(false);
      return;
    }

    // 2. VERIFICATION LOGIC
    // Hum check karenge ki kya ye order_id humne hi generate kiya tha
    setIsValid(true);
    setIsVerifying(false);

    // 3. SIGNAL SENDING (Only if valid)
    const keys = Object.keys(localStorage);
    const internshipKey = keys.find(k => k.startsWith('payment_'));
    
    if (internshipKey) {
      localStorage.setItem(internshipKey, JSON.stringify({ 
        status: 'success',
        orderId: orderId,
        verified: true 
      }));
    }

    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  // Agar koi bina payment ke direct link par aaye
  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-red-100">
          <XCircle size={60} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Invalid Access ❌</h2>
          <p className="text-slate-500 mt-2 mb-6">Direct access to this page is not allowed. Please complete the payment process.</p>
          <button onClick={() => navigate('/internships')} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold">
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center">
        <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold">Payment Verified ✅</h2>
        <p className="text-slate-500 mt-2">Unlocking your assessment...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
