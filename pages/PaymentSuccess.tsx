import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'denied'>('verifying');

  useEffect(() => {
    // 1. Sabse pehle URL se order_id check karo
    const orderId = searchParams.get('order_id');
    
    // Agar orderId nahi hai, toh check karo kya humne session me token rakha tha
    const pendingOrder = localStorage.getItem('pending_order_id');

    if (!orderId && !pendingOrder) {
      setStatus('denied');
      return;
    }

    // 2. Internship ID nikaalna (Hamara format: ORD_ID_TIME)
    const effectiveOrder = orderId || pendingOrder || "";
    const internshipId = effectiveOrder.split('_')[1] || "1";

    // 3. Sabse jaruri: Payment Success Mark karna
    const verificationData = {
      status: 'success',
      orderId: effectiveOrder,
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(verificationData));
    
    // Cleanup temporary tokens
    localStorage.removeItem('pending_order_id');
    
    setStatus('success');

    // 4. Test par redirect
    const timer = setTimeout(() => {
      navigate(`/test/real/${internshipId}`, { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 text-center">
        <div className="max-w-md w-full p-10 border-2 border-red-100 rounded-[40px]">
          <XCircle size={60} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Access Denied ❌</h2>
          <p className="text-slate-500 mt-2">Bhai, payment verification fail ho gayi. Please support se contact karein agar aapne pay kar diya hai.</p>
          <button onClick={() => navigate('/internships')} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Try Again</button>
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
        <h2 className="text-2xl font-bold text-slate-900">Payment Successful! ✅</h2>
        <p className="text-slate-500 mt-2">Unlocking your premium assessment...</p>
        <div className="mt-6 flex justify-center">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
