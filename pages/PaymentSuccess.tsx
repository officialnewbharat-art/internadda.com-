import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. URL se Internship ID ya Order ID nikaalna
    const orderId = searchParams.get('order_id');
    
    // 2. SABSE JARURI: LocalStorage Sync for Vercel
    // Hum saari 'payment_' keys ko update kar dete hain taaki koi bhi internship ho, redirect trigger ho jaye
    const successData = {
      status: 'success',
      orderId: orderId || `ORD_${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    // Puraane tab ko signal bhejne ke liye keys scan kar rahe hain
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('payment_')) {
        localStorage.setItem(key, JSON.stringify(successData));
      }
    });

    // Ek generic key bhi set kar dete hain backup ke liye
    localStorage.setItem('last_payment_status', 'success');

    // 3. Fast Redirect to Test if possible, otherwise Dashboard
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Done! ✅</h2>
        <p className="text-slate-500 mb-8">
          Aapka payment successfully receive ho gaya hai. Hum aapka test unlock kar rahe hain...
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold">
            <Loader2 className="animate-spin" size={20} />
            <span>Redirecting to Dashboard...</span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
