import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'denied'>('verifying');

  useEffect(() => {
    const orderId = searchParams.get('order_id');

    if (!orderId || !orderId.startsWith('ORD_')) {
      setStatus('denied');
      return;
    }

    // Extraction: ORD_{internshipId}_{timestamp}
    const parts = orderId.split('_');
    const internshipId = parts[1];

    // LocalStorage me success data set karna
    const verificationData = {
      status: 'success',
      orderId: orderId,
      token: parts[2], // Time-based token
      verifiedAt: new Date().toISOString()
    };

    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(verificationData));
    setStatus('success');

    // Turant redirect to test (very fast)
    setTimeout(() => {
      navigate(`/test/real/${internshipId}`, { replace: true });
    }, 1000);
  }, [navigate, searchParams]);

  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 text-center">
        <div className="max-w-md w-full p-10 border-2 border-red-100 rounded-3xl">
          <XCircle size={60} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Access Denied ❌</h2>
          <p className="text-slate-500 mt-2">Bhai, direct entry allowed nahi hai. Pehle pay karo.</p>
          <button onClick={() => navigate('/internships')} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Internships Dekho</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <CheckCircle size={50} className="text-emerald-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold">Payment Verified!</h2>
        <p className="text-slate-500">Redirecting to your test...</p>
        <Loader2 className="animate-spin text-indigo-600 mx-auto mt-4" />
      </div>
    </div>
  );
};
