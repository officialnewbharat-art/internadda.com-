import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

interface PaymentStatus {
  status: 'pending' | 'success' | 'failed';
  orderId?: string;
  transactionId?: string;
  amount?: number;
}

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: 'pending' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  // Check if payment was already made
  useEffect(() => {
    const checkExistingPayment = () => {
      const paymentData = localStorage.getItem(`payment_${id}`);
      if (paymentData) {
        const data = JSON.parse(paymentData);
        if (data.status === 'success') {
          setPaymentVerified(true);
          setPaymentStatus({ status: 'success', ...data });
        }
      }
    };

    checkExistingPayment();
  }, [id]);

  // Function to handle payment success (to be called from Cashfree callback)
  const handlePaymentSuccess = (orderData: any) => {
    setIsProcessing(false);
    
    // Save payment data to localStorage
    const paymentData = {
      status: 'success',
      orderId: orderData.orderId,
      transactionId: orderData.referenceId,
      amount: orderData.orderAmount,
      timestamp: new Date().toISOString(),
      internshipId: id
    };
    
    localStorage.setItem(`payment_${id}`, JSON.stringify(paymentData));
    localStorage.setItem('lastPayment', JSON.stringify(paymentData));
    
    setPaymentStatus({ status: 'success', ...paymentData });
    setPaymentVerified(true);
    
    // Show success message and redirect to test
    setTimeout(() => {
      navigate(`/test/real/${id}`);
    }, 2000);
  };

  // Function to verify payment (simulate Cashfree verification)
  const verifyPayment = async (orderId: string) => {
    try {
      // In real app, this would be an API call to your backend to verify with Cashfree
      // For demo, simulate successful verification after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { verified: true, orderId, referenceId: `TXN_${Date.now()}` };
    } catch (error) {
      return { verified: false };
    }
  };

  // Function to start payment process
  const initiatePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Generate order ID
      const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // In real app, create order on your backend first
      // For demo, we'll simulate
      
      // Open Cashfree payment in new window/tab
      const paymentWindow = window.open(
        `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&order_amount=199`,
        'CashfreePayment',
        'width=500,height=700'
      );
      
      if (!paymentWindow) {
        alert('Please allow popups to continue with payment');
        setIsProcessing(false);
        return;
      }
      
      // Listen for payment completion (in real app, use webhooks)
      const checkPaymentInterval = setInterval(async () => {
        try {
          // In real app, poll your backend for payment status
          // For demo, check localStorage for payment status
          const paymentData = localStorage.getItem(`payment_${id}`);
          
          if (paymentData) {
            const data = JSON.parse(paymentData);
            if (data.status === 'success') {
              clearInterval(checkPaymentInterval);
              handlePaymentSuccess(data);
            }
          }
        } catch (error) {
          console.error('Payment check error:', error);
        }
      }, 2000);
      
      // Cleanup interval after 5 minutes
      setTimeout(() => {
        clearInterval(checkPaymentInterval);
        if (!paymentVerified) {
          setIsProcessing(false);
        }
      }, 300000);
      
    } catch (error) {
      console.error('Payment initiation error:', error);
      setIsProcessing(false);
      alert('Payment initiation failed. Please try again.');
    }
  };

  const handleStartTest = () => {
    if (paymentVerified) {
      navigate(`/test/real/${id}`);
    } else {
      alert('Please complete payment first.');
    }
  };

  if (paymentVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-center p-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Verified ✅</h2>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-slate-600 mb-2">
                Payment of <span className="font-bold">₹199</span> for <span className="font-bold">{internship.title}</span> has been confirmed.
              </p>
              <p className="text-sm text-slate-500">
                Order ID: {paymentStatus.orderId}
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleStartTest}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all"
              >
                🚀 Start Skill Assessment
              </button>
              
              <button
                onClick={() => navigate(`/internship/${id}`)}
                className="w-full border-2 border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                View Internship Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          {/* Trust Banner */}
          <div className="bg-indigo-600 p-4 text-center text-white text-sm font-bold flex items-center justify-center gap-2">
            <ShieldCheck size={18} /> Verified Professional Internship Assessment
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
            {/* Motivational Side */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                  Invest in Your Future. 🚀
                </h1>
                <p className="text-slate-500 leading-relaxed">
                  You are one step away from securing your internship at <strong>{internship.company}</strong>. 
                  Our ₹199 processing fee ensures only serious candidates enter the direct interview pipeline.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Award className="text-indigo-600" />, text: "Government Recognized MSME Certificate" },
                  { icon: <CheckCircle className="text-indigo-600" />, text: "Guaranteed Interview Within 48 Hours" },
                  { icon: <Lock className="text-indigo-600" />, text: "100% Refund if No Interview Scheduled" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    {item.icon}
                    <span className="text-sm font-bold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Side */}
            <div className="bg-slate-50 rounded-[30px] p-8 border border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="mb-8">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Payable</span>
                <div className="text-5xl font-black text-slate-900 mt-2">₹199</div>
                <p className="text-indigo-600 font-bold text-xs mt-2 italic">Legal & Secure Processing</p>
              </div>

              {isProcessing ? (
                <div className="w-full flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-slate-600 font-medium">Processing payment...</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Please complete payment in the new window
                  </p>
                </div>
              ) : (
                <>
                  {/* Cashfree Payment Button */}
                  <button
                    onClick={initiatePayment}
                    className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all mb-4"
                    disabled={isProcessing}
                  >
                    <img 
                      src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
                      alt="Cashfree" 
                      className="w-8 h-8"
                    />
                    <div className="text-left">
                      <div className="text-lg font-bold">Pay ₹199 Now</div>
                      <div className="text-xs opacity-90">Powered by Cashfree</div>
                    </div>
                  </button>

                  <p className="text-[10px] text-slate-400 mt-6 leading-relaxed">
                    By clicking pay, you agree to our terms. Your test credentials will be unlocked immediately after successful payment.
                  </p>
                </>
              )}

              {/* Alternative Payment Methods */}
              {!isProcessing && (
                <div className="mt-6 w-full">
                  <p className="text-xs text-slate-500 mb-3">Or pay with:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={initiatePayment}
                      className="p-3 bg-white border border-slate-300 rounded-lg hover:border-indigo-400 hover:shadow-sm transition-all"
                    >
                      <div className="text-2xl mb-1">💳</div>
                      <div className="text-xs font-medium text-slate-700">Card</div>
                    </button>
                    <button
                      onClick={initiatePayment}
                      className="p-3 bg-white border border-slate-300 rounded-lg hover:border-indigo-400 hover:shadow-sm transition-all"
                    >
                      <div className="text-2xl mb-1">🏦</div>
                      <div className="text-xs font-medium text-slate-700">UPI</div>
                    </button>
                    <button
                      onClick={initiatePayment}
                      className="p-3 bg-white border border-slate-300 rounded-lg hover:border-indigo-400 hover:shadow-sm transition-all"
                    >
                      <div className="text-2xl mb-1">📱</div>
                      <div className="text-xs font-medium text-slate-700">Wallet</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
