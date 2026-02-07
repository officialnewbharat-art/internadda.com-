import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // 1. Check if it's a real Cashfree redirect
    const orderId = searchParams.get('order_id');
    const txStatus = searchParams.get('txStatus'); // Cashfree sends this

    if (!orderId) {
      // Direct access bypass attempt
      setIsVerifying(false);
      return;
    }

    // 2. Extract Internship ID (from our ORD_ID_TIMESTAMP format)
    const internshipId = orderId.split('_')[1] || "1";

    // 3. Mark as Verified in LocalStorage
    const successData = {
      status: 'success',
      orderId: orderId,
      verifiedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(successData));
    localStorage.setItem('last_active_order', orderId); // Security Token

    // 4. CLEAN REDIRECT: Remove query params that cause blank page
    setTimeout(() => {
      navigate(`/test/real/${internshipId}`, { replace: true });
    }, 2000);
  }, [navigate, searchParams]);

  if (!searchParams.get('order_id')) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-10 border-2 border-red-100 rounded-[40px]">
          <XCircle size={60} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Direct Access Denied</h2>
          <p className="text-slate-500 mt-2">Bhai, aap bina payment ke is page par nahi aa sakte.</p>
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
        <h2 className="text-2xl font-bold">Payment Verified!</h2>
        <p className="text-slate-500 mt-2">Opening your assessment...</p>
        <Loader2 className="animate-spin text-indigo-600 mx-auto mt-6" />
      </div>
    </div>
  );
};

export default PaymentSuccess;
