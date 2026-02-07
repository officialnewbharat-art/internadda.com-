import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. URL se internship ID nikaalna (agar available ho) ya last pending payment check karna
    const urlOrderId = searchParams.get('order_id');
    
    // 2. SABSE JARURI: LocalStorage update karna taaki main tab ko pata chale
    // Hum 'last_payment_id' ya logic use karke sahi internship ID target karte hain
    const keys = Object.keys(localStorage);
    const internshipKey = keys.find(key => key.startsWith('payment_')) || 'payment_default';

    const successData = {
      status: 'success',
      orderId: urlOrderId || `ORD_${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    // Ye line main tab ka 'storage' listener trigger karegi
    localStorage.setItem(internshipKey, JSON.stringify(successData));
    
    // Backup: Pure app ko batane ke liye
    localStorage.setItem('last_payment_status', 'success');

    // 3. Auto-redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden text-center p-10">
          <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <CheckCircle size={48} className="text-emerald-600" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Payment Success! ✅
          </h2>
          
          <p className="text-slate-500 leading-relaxed mb-8 font-medium">
            Your transaction was successful. We've unlocked your professional assessment and updated your dashboard.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
            >
              Go to Dashboard <ArrowRight size={18} />
            </button>
            
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
              Redirecting in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
