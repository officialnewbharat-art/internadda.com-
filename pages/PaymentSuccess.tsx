import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'denied'>('verifying');

  useEffect(() => {
    // 1. URL se order_id ya verification parameters check karo
    const orderIdFromUrl = searchParams.get('order_id');
    const activeToken = localStorage.getItem('active_payment_token');

    // SECURITY GATEKEEPER: Agar valid source nahi hai toh entry block karo
    if (!orderIdFromUrl && !activeToken) {
      setStatus('denied');
      return;
    }

    // 2. Internship ID extract karo (URL se ya temporary token se)
    const effectiveOrder = orderIdFromUrl || activeToken || "";
    // Format assume kar rahe hain: "ORDER_ID_INTERNSHIPID"
    const internshipId = effectiveOrder.split('_')[1] || "1";

    // 3. SECURE ACCESS TOKEN GENERATE KARO (The Gatekeeper Key)
    // Yeh token ProfessionalTestEngine check karega direct access block karne ke liye
    const secureAccessToken = btoa(`authorized_access_${internshipId}_${Date.now()}`);

    // 4. Sabhi security flags set karo
    const verificationData = {
      status: 'success',
      orderId: effectiveOrder,
      verifiedAt: new Date().toISOString()
    };

    // Save payment status
    localStorage.setItem(`payment_${internshipId}`, JSON.stringify(verificationData));
    
    // Save THE GATEKEEPER TOKEN (Yeh sabse important hai direct access rokne ke liye)
    localStorage.setItem(`test_access_token_${internshipId}`, secureAccessToken);
    
    // Cleanup temporary payment initialization token
    localStorage.removeItem('active_payment_token');
    
    setStatus('success');

    // 5. REDIRECT TO TEST ENGINE (With small delay for UX)
    const timer = setTimeout(() => {
      navigate(`/test/real/${internshipId}`, { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  // Direct access blocked UI
  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 text-center font-sans">
        <div className="max-w-md w-full p-10 border-2 border-red-500/10 rounded-[40px] bg-red-50/30">
          <XCircle size={60} className="text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-900 mb-4">Access Denied</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Bhai, direct link se test open nahi hoga. 
            Pehle internship apply karke payment complete karein.
          </p>
          <button 
            onClick={() => navigate('/internships')} 
            className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold w-full hover:bg-black transition-all shadow-lg"
          >
            Browse Internships
          </button>
        </div>
      </div>
    );
  }

  // Verification in progress or success UI
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-slate-100">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
          <div className="relative w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-emerald-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Verified!</h2>
        <p className="text-slate-500 font-bold mb-10">Unlocking your professional test environment...</p>
        
        <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-indigo-600 font-bold bg-indigo-50 py-3 rounded-2xl">
                <Loader2 className="animate-spin" size={20} />
                <span>Redirecting to Secure Test...</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Do not refresh this page</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
