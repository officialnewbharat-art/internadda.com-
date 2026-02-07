import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. Get Internship ID from the last state or URL
    // Humne PaymentPage me ORD_{id}_{timestamp} format use kiya hai
    const orderId = searchParams.get('order_id') || "";
    const internshipId = orderId.split('_')[1] || "1"; // Fallback to 1 if not found

    // 2. Set the Success Flag in LocalStorage
    const successData = {
      status: 'success',
      orderId: orderId,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(successData));
    localStorage.setItem('last_payment_status', 'success');

    // 3. SEEDHA TEST PAR REDIRECT (No Dashboard)
    const timer = setTimeout(() => {
      navigate(`/test/real/${internshipId}`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Payment Verified! ✅</h2>
        <p className="text-slate-500 mt-2">Opening your skill assessment...</p>
        <div className="mt-6">
           <Loader2 className="animate-spin text-indigo-600 mx-auto" size={32} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
