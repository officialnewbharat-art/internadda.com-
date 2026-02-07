import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'denied'>('verifying');

  useEffect(() => {
    const orderIdFromUrl = searchParams.get('order_id');
    const activeToken = localStorage.getItem('active_payment_token');

    if (!orderIdFromUrl && !activeToken) {
      setStatus('denied');
      return;
    }

    const effectiveOrder = orderIdFromUrl || activeToken || "";
    const internshipId = effectiveOrder.split('_')[1] || "1";

    // Domain independent Secure Access Token
    const secureAccessToken = btoa(`secure_access_${internshipId}_${Date.now()}`);

    const verificationData = {
      status: 'success',
      orderId: effectiveOrder,
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(verificationData));
    localStorage.setItem(`test_access_token_${internshipId}`, secureAccessToken);
    localStorage.removeItem('active_payment_token');
    
    setStatus('success');

    setTimeout(() => {
      // Relative navigation: Har domain pe kaam karega
      navigate(`/test/real/${internshipId}`, { replace: true });
    }, 2000);
  }, [navigate, searchParams]);

  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 text-center">
        <div className="max-w-md w-full p-10 border-2 border-red-500/10 rounded-[40px] bg-red-50/50">
          <XCircle size={60} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900">Access Denied</h2>
          <p className="text-slate-500 mt-2 font-medium">Bhai, direct access block hai. Payment ke baad hi entry milegi.</p>
          <button onClick={() => navigate('/internships')} className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-bold w-full">Back to Internships</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12">
        <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={40} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Payment Success!</h2>
        <p className="text-slate-500 mt-3 font-medium">Setting up your secure test environment...</p>
        <div className="mt-8"><Loader2 className="animate-spin text-indigo-600 mx-auto" size={32} /></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
