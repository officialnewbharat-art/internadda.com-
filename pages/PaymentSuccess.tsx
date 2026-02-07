import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'denied'>('verifying');

  useEffect(() => {
    // 1. URL se order_id check karo
    const orderIdFromUrl = searchParams.get('order_id');
    // 2. Local storage se active token check karo
    const activeToken = localStorage.getItem('active_payment_token');

    // SECURITY: Agar dono me se kuch bhi nahi hai, toh deny access
    if (!orderIdFromUrl && !activeToken) {
      setStatus('denied');
      return;
    }

    // 3. Internship ID extract karna
    const effectiveOrder = orderIdFromUrl || activeToken || "";
    const internshipId = effectiveOrder.split('_')[1] || "1";

    // 4. Payment SUCCESS mark karna (Test unlock ke liye)
    const verificationData = {
      status: 'success',
      orderId: effectiveOrder,
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(verificationData));
    
    // Cleanup temporary token
    localStorage.removeItem('active_payment_token');
    
    setStatus('success');

    // 5. SEEDHA TEST PAR REDIRECT (Fast)
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
          <p className="text-slate-500 mt-2 leading-relaxed">
            Bhai, direct entry allowed nahi hai. Payment complete hone ke baad system automatically yahan bhejta hai.
          </p>
          <button onClick={() => navigate('/internships')} className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold w-full">
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12">
        <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Payment Verified! ✅</h2>
        <p className="text-slate-500 mt-3 font-medium">Unlocking your professional test environment...</p>
        <div className="mt-8">
           <Loader2 className="animate-spin text-indigo-600 mx-auto" size={40} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
