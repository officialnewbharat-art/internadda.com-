import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-center p-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Processed</h2>
          
          <p className="text-slate-600 mb-6">
            Your payment has been successfully processed. You can now access premium tests and features.
          </p>
          
          <p className="text-sm text-slate-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
