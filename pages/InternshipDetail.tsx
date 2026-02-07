import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { 
  Shield, Award, Clock, CheckCircle, Lock, Users, 
  Zap, Star, BookOpen, Target, FileText, Loader2,
  CreditCard, Smartphone, Building, ExternalLink
} from 'lucide-react';

const InternshipDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Check if payment was already made for this internship
  const checkExistingPayment = () => {
    const paymentData = localStorage.getItem(`payment_${id}`);
    if (paymentData) {
      const data = JSON.parse(paymentData);
      if (data.status === 'success') {
        return true;
      }
    }
    return false;
  };

  // Set up payment status listener on mount
  useEffect(() => {
    if (showPaymentModal) {
      // Listen for payment success messages from Cashfree
      const handleMessage = (event: MessageEvent) => {
        // Check if message is from Cashfree domain (in production, verify origin)
        if (event.data && event.data.type === 'CASHFREE_PAYMENT_SUCCESS') {
          console.log('Payment success message received:', event.data);
          
          const paymentData = {
            internshipId: id,
            internshipTitle: internship.title,
            orderId: event.data.orderId,
            transactionId: event.data.referenceId,
            amount: event.data.orderAmount,
            date: new Date().toISOString(),
            status: 'success'
          };
          
          // Store payment data
          localStorage.setItem(`payment_${id}`, JSON.stringify(paymentData));
          localStorage.setItem('lastPayment', JSON.stringify(paymentData));
          
          setPaymentSuccess(true);
          setPaymentProcessing(false);
          
          // Close payment window
          const paymentWindow = (window as any).cashfreePaymentWindow;
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close();
          }
          
          // Redirect to test after 1 second
          setTimeout(() => {
            setShowPaymentModal(false);
            navigate(`/test/real/${id}`);
          }, 1000);
        }
      };
      
      // Listen for storage changes (for cross-tab communication)
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === `payment_${id}` && event.newValue) {
          const data = JSON.parse(event.newValue);
          if (data.status === 'success') {
            setPaymentSuccess(true);
            setPaymentProcessing(false);
            
            setTimeout(() => {
              setShowPaymentModal(false);
              navigate(`/test/real/${id}`);
            }, 1000);
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [showPaymentModal, id, navigate, internship.title]);

  const handlePaymentClick = async () => {
    // Check for existing payment first
    if (checkExistingPayment()) {
      navigate(`/test/real/${id}`);
      return;
    }

    setShowPaymentModal(true);
  };

  const initiatePayment = (paymentMethod: string) => {
    setPaymentProcessing(true);
    setPaymentSuccess(false);
    
    // Generate unique order ID
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create payment data
    const paymentData = {
      internshipId: id,
      internshipTitle: internship.title,
      orderId: orderId,
      amount: 199,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Store initial payment data
    localStorage.setItem(`payment_${id}`, JSON.stringify(paymentData));
    localStorage.setItem('pendingPayment', JSON.stringify(paymentData));
    
    // In production, this would be your backend endpoint that returns Cashfree payment link
    // For demo, we'll simulate with a direct link
    const cashfreeUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&order_amount=199`;
    
    // Open Cashfree payment in new window
    const paymentWindow = window.open(
      cashfreeUrl,
      'CashfreePayment',
      'width=500,height=700,scrollbars=yes,resizable=yes,top=100,left=100'
    );
    
    // Store window reference for later use
    (window as any).cashfreePaymentWindow = paymentWindow;
    
    if (!paymentWindow) {
      alert('Please allow popups to continue with payment');
      setPaymentProcessing(false);
      return;
    }
    
    // Focus on the payment window
    paymentWindow.focus();
    
    // For DEMO PURPOSES ONLY: Simulate payment success after 5 seconds
    // Remove this in production
    const demoMode = true; // Set to false in production
    if (demoMode) {
      setTimeout(() => {
        const demoPaymentData = {
          internshipId: id,
          internshipTitle: internship.title,
          orderId: orderId,
          transactionId: `TXN_${Date.now()}`,
          amount: 199,
          paymentMethod: paymentMethod,
          date: new Date().toISOString(),
          status: 'success'
        };
        
        localStorage.setItem(`payment_${id}`, JSON.stringify(demoPaymentData));
        localStorage.setItem('lastPayment', JSON.stringify(demoPaymentData));
        
        setPaymentSuccess(true);
        setPaymentProcessing(false);
        
        // Close payment window
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }
        
        // Show success message and redirect
        setTimeout(() => {
          setShowPaymentModal(false);
          navigate(`/test/real/${id}`);
        }, 1000);
      }, 5000);
    }
    
    // Check if payment window closed without payment
    const checkWindowClosed = setInterval(() => {
      if (paymentWindow.closed && !paymentSuccess && !paymentProcessing) {
        clearInterval(checkWindowClosed);
        
        // Check if payment was completed
        const paymentData = localStorage.getItem(`payment_${id}`);
        if (paymentData) {
          const data = JSON.parse(paymentData);
          if (data.status === 'success') {
            setPaymentSuccess(true);
            setTimeout(() => {
              setShowPaymentModal(false);
              navigate(`/test/real/${id}`);
            }, 1000);
          } else {
            setPaymentProcessing(false);
            alert('Payment was not completed. Please try again.');
          }
        } else {
          setPaymentProcessing(false);
        }
      }
    }, 1000);
    
    // Cleanup after 10 minutes
    setTimeout(() => {
      clearInterval(checkWindowClosed);
      if (paymentProcessing && !paymentSuccess) {
        setPaymentProcessing(false);
        alert('Payment timeout. Please try again.');
      }
    }, 600000);
  };

  const PaymentModal = () => {
    if (paymentSuccess) {
      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-emerald-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Successful! ✅</h2>
              
              <p className="text-slate-600 mb-6">
                Your payment of ₹199 has been processed successfully. 
                You can now access the skill assessment.
              </p>
              
              <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100">
                <p className="text-sm text-emerald-700 font-medium">
                  Redirecting to skill assessment...
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Complete Your Application</h3>
                <p className="text-slate-600">Access our premium assessment and interview pipeline</p>
              </div>
              <button 
                onClick={() => {
                  if (!paymentProcessing) {
                    setShowPaymentModal(false);
                  }
                }}
                className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={paymentProcessing}
              >
                ✕
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="text-center p-3 bg-emerald-50 rounded-xl">
                <div className="text-emerald-600 text-sm font-bold">🎯 98%</div>
                <div className="text-xs text-emerald-700">Success Rate</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-blue-600 text-sm font-bold">⚡ 48h</div>
                <div className="text-xs text-blue-700">Fast Process</div>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-xl">
                <div className="text-indigo-600 text-sm font-bold">🏛️</div>
                <div className="text-xs text-indigo-700">MSME Certified</div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-8 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award size={20} className="text-indigo-600" />
              Premium Features Included
            </h4>
            <div className="space-y-4">
              {[
                { icon: <Target size={16} className="text-emerald-500" />, text: "Guaranteed skill assessment with instant results" },
                { icon: <Clock size={16} className="text-blue-500" />, text: "Interview scheduled within 48 hours of passing" },
                { icon: <FileText size={16} className="text-amber-500" />, text: "Professional certificate upon successful completion" },
                { icon: <BookOpen size={16} className="text-purple-500" />, text: "Direct interview with hiring managers (skip HR rounds)" },
                { icon: <Shield size={16} className="text-indigo-500" />, text: "MSME certified and industry-recognized platform" },
                { icon: <Users size={16} className="text-green-500" />, text: "Access to exclusive internship opportunities" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-8">
            {paymentProcessing ? (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Processing Payment</h4>
                <p className="text-slate-600 mb-6">
                  Please complete the payment in the new window. Do not close this window.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-blue-700 mb-2">
                    <ExternalLink size={16} className="inline mr-2" />
                    If payment window didn't open,{' '}
                    <button 
                      onClick={() => window.open('https://payments.cashfree.com/forms/internadda', '_blank')}
                      className="text-blue-600 font-bold underline"
                    >
                      click here to open payment page
                    </button>
                  </p>
                  <p className="text-xs text-blue-600">
                    Make sure to allow popups for this website
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h4 className="font-bold text-slate-900 mb-6">Complete Payment</h4>
                
                {/* Amount Display */}
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-slate-900 mb-2">₹199</div>
                    <div className="text-sm text-slate-600">One-time application processing fee</div>
                    <div className="text-xs text-slate-500 mt-2">
                      Includes skill assessment, interview scheduling, and certificate
                    </div>
                  </div>
                </div>

                {/* Main Cashfree Payment Button */}
                <div className="mb-8">
                  <button
                    onClick={() => initiatePayment('cashfree')}
                    className="w-full bg-[#41478a] hover:bg-[#353b75] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all mb-4"
                  >
                    <img 
                      src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
                      alt="Cashfree" 
                      className="w-8 h-8"
                    />
                    <div className="text-left">
                      <div className="text-lg font-bold">Pay ₹199 Now</div>
                      <div className="text-xs opacity-90">Powered by Cashfree Payments</div>
                    </div>
                  </button>

                  {/* Alternative Payment Methods */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-500 mb-4">Or choose payment method:</p>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => initiatePayment('upi')}
                        className="bg-white border border-slate-300 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all group"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💸</div>
                        <div className="text-xs font-medium text-slate-700">UPI</div>
                      </button>
                      
                      <button 
                        onClick={() => initiatePayment('card')}
                        className="bg-white border border-slate-300 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all group"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💳</div>
                        <div className="text-xs font-medium text-slate-700">Card</div>
                      </button>
                      
                      <button 
                        onClick={() => initiatePayment('netbanking')}
                        className="bg-white border border-slate-300 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all group"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🏦</div>
                        <div className="text-xs font-medium text-slate-700">Net Banking</div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Payment Security & Guarantee */}
            <div className="text-center border-t border-slate-100 pt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock size={12} className="text-green-500" />
                  <span>256-bit SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield size={12} className="text-blue-500" />
                  <span>PCI DSS Compliant</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm text-emerald-700 font-medium">
                  💰 100% Money-Back Guarantee: Full refund if no interview is scheduled within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Check if user has already paid for this internship
  const hasPaidForInternship = () => {
    return checkExistingPayment();
  };


const handleApplyClick = () => {
  const existingPayment = localStorage.getItem(`payment_${id}`);
  const paymentData = existingPayment ? JSON.parse(existingPayment) : null;

  if (paymentData && paymentData.status === 'success') {
    // If already paid, go straight to the real test
    navigate(`/test/real/${id}`);
  } else {
    // Otherwise, go to payment page to initiate
    navigate(`/payment/${id}`);
  }
};

  return (
    <>
      {showPaymentModal && <PaymentModal />}
      
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
          {/* Internship Header with Image */}
          <div className="relative h-64 md:h-80">
            <img 
              src={internship.image} 
              className="w-full h-full object-cover" 
              alt={internship.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
              <div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
                  {internship.category}
                </span>
                <h1 className="text-4xl font-black text-white tracking-tight">{internship.title}</h1>
                <p className="text-white/80 mt-2">{internship.company}</p>
              </div>
            </div>
          </div>

          <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column: Internship Details */}
            <div className="md:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" />
                  Description
                </h3>
                <p className="text-slate-500 leading-loose">
                  {internship.description} This is a unique opportunity for aspiring developers to gain hands-on experience in a professional environment. You will be working directly with senior architects and product managers to deliver impact.
                </p>
              </div>

              {/* Skills Required */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-amber-500" />
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-3">
                  {internship.skills.map(skill => (
                    <span key={skill} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 px-5 py-2 rounded-xl text-sm font-bold border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-emerald-600" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-4 text-slate-500 list-disc pl-5">
                  <li>Collaborate with cross-functional teams to define features and requirements.</li>
                  <li>Write clean, modular, and reusable code following best practices.</li>
                  <li>Perform unit tests and optimize application performance.</li>
                  <li>Participate in daily stand-ups, sprint planning, and code reviews.</li>
                  <li>Document technical specifications and contribute to knowledge sharing.</li>
                </ul>
              </div>

              {/* Skill Assessment Details */}
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-indigo-600" />
                  Skill Assessment Process
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">25-30</div>
                    <div className="text-sm text-slate-600">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">30 min</div>
                    <div className="text-sm text-slate-600">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">70%</div>
                    <div className="text-sm text-slate-600">Passing Score</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">⏱️</div>
                    <div className="text-sm text-slate-600">Timed</div>
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-slate-100">
                  <p className="text-sm text-slate-600">
                    <strong>Features:</strong> Domain-specific questions • Real-time anti-cheat system • 
                    Instant results and feedback • Professional certificate upon passing
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Application & Payment */}
            <div className="md:col-span-1 space-y-8">
              {/* Application Card */}
              <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-slate-100 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stipend</span>
                  <p className="text-lg font-black text-slate-900">{internship.stipend}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</span>
                  <p className="text-lg font-black text-slate-900">{internship.location}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                  <p className="text-lg font-black text-slate-900">6 Months</p>
                </div>

                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <button 
                    onClick={handleApplyClick}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-center block shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-[1.02] transition-all"
                  >
                    {hasPaidForInternship() ? 'Start Assessment' : 'Apply Now - ₹199'}
                  </button>
                  
                  <Link 
                    to={`/test/practice/${id}`}
                    className="w-full border-2 border-slate-300 text-slate-700 py-4 rounded-2xl font-bold text-center block hover:bg-slate-50 transition-all"
                  >
                    Free Practice Test
                  </Link>
                </div>
              </div>

              {/* Popularity Indicator */}
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <div className="flex items-start gap-3">
                  <Users className="text-amber-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-amber-800 font-bold">
                      <span className="text-lg">🔥 200+ students</span> applied in last 24 hours
                    </p>
                    <p className="text-xs text-amber-700 mt-1">Limited seats available</p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all">
                  <Shield className="text-indigo-600" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">MSME Certified</div>
                    <div className="text-xs text-slate-500">Government verified platform</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all">
                  <Star className="text-amber-500" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Direct Interview</div>
                    <div className="text-xs text-slate-500">Skip HR, meet managers directly</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all">
                  <CheckCircle className="text-emerald-500" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Instant Results</div>
                    <div className="text-xs text-slate-500">Get test results immediately</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all">
                  <Clock className="text-blue-500" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">48-Hour Process</div>
                    <div className="text-xs text-slate-500">From test to interview</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="px-12 pb-12">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div>
                  <h4 className="text-xl font-bold mb-2">Ready to Launch Your Career?</h4>
                  <p className="text-slate-300 text-sm">
                    Join thousands of students who transformed their careers with Internadda
                  </p>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={handleApplyClick}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    {hasPaidForInternship() ? 'Start Assessment' : 'Pay ₹199 & Apply'}
                  </button>
                  <Link 
                    to={`/test/practice/${id}`}
                    className="bg-white text-slate-900 py-3 rounded-xl font-bold text-center hover:bg-slate-100 transition-all"
                  >
                    Try Practice Test
                  </Link>
                  <Link 
                    to="/internships"
                    className="border border-white/30 text-white py-3 rounded-xl font-bold text-center hover:bg-white/10 transition-all"
                  >
                    Browse More Internships
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipDetail;
