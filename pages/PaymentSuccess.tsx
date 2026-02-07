import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'denied'>('verifying');

  useEffect(() => {
    // 1. Get order_id from URL (Cashfree adds this automatically)
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      // Direct access attempt (Bypass prevention)
      setStatus('denied');
      return;
    }

    // 2. Extract Internship ID from Order ID (Format: ORD_{internshipId}_{timestamp})
    const parts = orderId.split('_');
    const internshipId = parts[1] || "1";

    // 3. Mark as Paid in LocalStorage
    const verificationData = {
      status: 'success',
      orderId: orderId,
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(verificationData));
    localStorage.setItem('last_active_order', orderId);
    
    setStatus('success');

    // 4. Instant Redirect to Test
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
          <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-slate-500 mt-2">Bypass attempts are not allowed. Please complete the payment first.</p>
          <button onClick={() => navigate('/internships')} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Back to Internships</button>
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
        <h2 className="text-2xl font-bold">Payment Verified! ✅</h2>
        <p className="text-slate-500 mt-2">Unlocking your professional assessment...</p>
        <div className="mt-6 flex justify-center">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
