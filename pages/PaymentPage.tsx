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
    const orderId = `ORD_${id}_${Date.now()}`;
    localStorage.setItem('active_payment_token', orderId);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-success');
    }, 2000);
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
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                <span className="text-xs font-medium text-slate-600 mt-2">Payment</span>
              </div>
              <div className="flex-1 h-1 bg-indigo-200 mx-4"></div>
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
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Award className="text-indigo-600" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{internship.title}</h2>
                    <p className="text-slate-600">{internship.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">{internship.category}</span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">{internship.type}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">₹199</div>
                  <div className="text-sm text-slate-500">One-time fee</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-sm text-slate-500 mb-1">Stipend</div>
                  <div className="text-lg font-bold text-slate-900">{internship.stipend}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-sm text-slate-500 mb-1">Duration</div>
                  <div className="text-lg font-bold text-slate-900">6 Months</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">What's included:</h3>
                {[
                  "Professional skill assessment (25 tough questions)",
                  "Direct interview scheduling within 48 hours",
                  "Industry-recognized certificate upon passing",
                  "MSME verified internship program",
                  "Lifetime access to career resources"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-indigo-600" size={24} />
                  <div>
                    <div className="font-bold text-slate-900">100% Secure</div>
                    <div className="text-sm text-slate-600">256-bit SSL Encryption</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock size={12} />
                  <span>PCI DSS Compliant</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BadgeCheck className="text-emerald-600" size={24} />
                  <div>
                    <div className="font-bold text-slate-900">Money-Back</div>
                    <div className="text-sm text-slate-600">48-hour guarantee</div>
                  </div>
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  Full refund if no interview scheduled
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-2 mb-4 text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-lg italic mb-6">
                "Paid ₹199 and got my skill assessment immediately. Within 2 days, I had an interview scheduled and received the offer letter!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700"></div>
                <div>
                  <div className="font-bold">Rahul Sharma</div>
                  <div className="text-sm text-slate-300">Python Developer Intern</div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Column */}
          <div className="lg:col-span-2 sticky top-24">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
              <h1 className="text-2xl font-bold text-slate-900 mb-8">Complete Your Enrollment</h1>
              
              {/* Order Summary */}
              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Internship Program</span>
                    <span className="font-bold text-slate-900">{internship.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Skill Assessment</span>
                    <span className="font-bold text-slate-900">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Certificate</span>
                    <span className="font-bold text-slate-900">Included</span>
                  </div>
                  <div className="h-px bg-slate-100"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-slate-500">Total Amount</div>
                      <div className="text-4xl font-bold text-slate-900">₹199</div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <ShieldCheck size={20} />
                      <span className="text-sm font-medium">Secure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-900 mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                        paymentMethod === method.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-2xl mb-2">{method.icon}</span>
                      <span className="text-sm font-medium text-slate-900">{method.name}</span>
                      <span className="text-xs text-slate-500 mt-1">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Payment Button */}
              <button
                onClick={initiatePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Processing...
                  </>
                ) : (
                  <>
                    <IndianRupee size={24} />
                    Pay ₹199 Now
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-slate-400" />
                    <span className="text-xs text-slate-500">SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-slate-400" />
                    <span className="text-xs text-slate-500">PCI DSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-slate-400" />
                    <span className="text-xs text-slate-500">MSME</span>
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Your payment is secured with bank-level encryption. No card details are stored on our servers.
                </p>
              </div>

              {/* Guarantee */}
              <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="text-emerald-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      100% Money-Back Guarantee: Full refund if no interview is scheduled within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-3xl font-bold text-indigo-600">98.2%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-3xl font-bold text-emerald-600">48h</div>
            <div className="text-sm text-slate-600">Avg. Process Time</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <div className="text-3xl font-bold text-amber-600">7,000+</div>
            <div className="text-sm text-slate-600">Students Placed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
