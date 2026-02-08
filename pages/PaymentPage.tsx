import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, Lock, CheckCircle, Star, Award, Building2, UserCheck, Shield, CreditCard, Zap, Clock, Users, BadgeCheck, IndianRupee } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cashfree' | 'upi' | 'card' | 'netbanking'>('cashfree');

  const initiatePayment = () => {
    setIsProcessing(true);
    
    // Gatekeeper Logic: Generate a unique token for this session
    const orderId = `ORD_${id}_${Date.now()}`;
    localStorage.setItem('active_payment_token', orderId);
    
    // Cashfree Production Integration
    // return_url ensures the user comes back to the success page to unlock the test
    const returnUrl = encodeURIComponent(`${window.location.origin}/#/payment-success`);
    const cashfreeUrl = `https://payments.cashfree.com/forms/internadda?order_id=${orderId}&return_url=${returnUrl}`;

    // Small delay for professional UI feel before redirect
    setTimeout(() => {
      window.location.href = cashfreeUrl;
    }, 800);
  };

  const paymentMethods = [
    { id: 'cashfree', name: 'Cashfree Payments', icon: '💳', desc: 'Secure UPI, Cards & Net Banking' },
    { id: 'upi', name: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'All Major Banks' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-md">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                <span className="text-xs font-medium text-slate-600 mt-2">Apply</span>
              </div>
              <div className="flex-1 h-1 bg-indigo-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200 animate-pulse">2</div>
                <span className="text-xs font-medium text-slate-600 mt-2">Payment</span>
              </div>
              <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold">3</div>
                <span className="text-xs font-medium text-slate-400 mt-2">Assessment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Trust & Details Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Internship Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 transition-all hover:shadow-2xl">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Award className="text-indigo-600" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{internship.title}</h2>
                    <p className="text-slate-600 font-medium">Verified by InternAdda Ecosystem</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-tighter">{internship.category}</span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-tighter">Verified Opening</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-slate-900">₹199</div>
                  <div className="text-sm text-slate-500 font-bold">All-Inclusive</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-black uppercase mb-1">Potential Stipend</div>
                  <div className="text-lg font-bold text-slate-900">{internship.stipend}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-black uppercase mb-1">Job Type</div>
                  <div className="text-lg font-bold text-slate-900">Full-time Remote</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-slate-900 text-lg">Hiring Guarantee:</h3>
                {[
                  "Advanced 25-Question Skill Assessment",
                  "Direct Interview Scheduling (within 48 hours)",
                  "Official MSME-Verified Experience Certificate",
                  "Dedicated Mentor Support for 6 Months",
                  "Fast-track processing for top 10% scorers"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white to-indigo-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-indigo-600" size={24} />
                  <div>
                    <div className="font-bold text-slate-900">Verified Partner</div>
                    <div className="text-xs text-slate-500 uppercase font-black">Secure Checkout</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock size={12} />
                  <span>Bank-level 256-bit Encryption</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-emerald-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <BadgeCheck className="text-emerald-600" size={24} />
                  <div>
                    <div className="font-bold text-slate-900">100% Refundable</div>
                    <div className="text-xs text-slate-500 uppercase font-black">Policy Applied</div>
                  </div>
                </div>
                <div className="text-xs text-emerald-700 font-bold">
                  If no interview is scheduled in 48h
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic font-medium leading-relaxed mb-6">
                  "I was skeptical about the ₹199 fee, but the assessment was very professional. I got my interview call the next morning and had my offer letter by evening. Highly recommended!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">SK</div>
                  <div>
                    <div className="font-bold text-white">Sandeep Kumar</div>
                    <div className="text-sm text-slate-400">Web Developer Intern • Delhi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Column */}
          <div className="lg:col-span-2 sticky top-24">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
              
              <h1 className="text-2xl font-black text-slate-900 mb-8">Enrollment Summary</h1>
              
              {/* Order Summary */}
              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold text-sm uppercase">Assessment Fee</span>
                    <span className="font-black text-slate-900">₹199</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold text-sm uppercase">Certification</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold text-sm uppercase">Course Access</span>
                    <span className="font-bold text-emerald-600">INCLUDED</span>
                  </div>
                  <div className="h-px bg-slate-100 my-4"></div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Payable Amount</div>
                      <div className="text-5xl font-black text-slate-900 leading-none">₹199</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-[10px] font-black uppercase">
                        <ShieldCheck size={12} /> Secure
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Inc. all taxes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-tight">Select Payment Gateway</h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center ${
                        paymentMethod === method.id
                          ? 'border-indigo-600 bg-indigo-50 shadow-md'
                          : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <span className="text-2xl mb-1">{method.icon}</span>
                      <span className="text-xs font-black text-slate-900 uppercase tracking-tighter leading-tight">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Payment Button */}
              <button
                onClick={initiatePayment}
                disabled={isProcessing}
                className="w-full bg-slate-900 text-white py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Securing Gateway...
                  </>
                ) : (
                  <>
                    <IndianRupee size={24} />
                    Enroll Now
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-8">
                Official MSME Registration: 29AABC7123A1Z1
              </p>

              {/* Secure Badges */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-center items-center gap-6 opacity-40">
                <Lock size={20} />
                <Shield size={20} />
                <Building2 size={20} />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button onClick={() => navigate(-1)} className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                ← Go back to internship details
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Placement Rate", value: "98.2%", color: "text-indigo-600" },
            { label: "Avg. Process", value: "48 Hours", color: "text-emerald-600" },
            { label: "Students", value: "12,000+", color: "text-amber-600" },
            { label: "Partner Firms", value: "150+", color: "text-purple-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 text-center shadow-sm">
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
