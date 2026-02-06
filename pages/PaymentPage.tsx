import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    // Redirect to test after 3 seconds
    setTimeout(() => {
      navigate(`/test/real/${id}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success State */}
        {paymentSuccess ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center animate-pulse">
                <span className="text-4xl text-white">✓</span>
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Payment Successful! 🎉
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Your application for {internship.title} has been confirmed. 
              You will be redirected to the skill assessment in a moment.
            </p>
            
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-bold text-emerald-900 mb-4">What's Next?</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">1</div>
                  <span className="text-slate-700">Take the skill assessment (30 mins)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">2</div>
                  <span className="text-slate-700">Get interview scheduled within 48 hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">3</div>
                  <span className="text-slate-700">Receive offer letter after successful interview</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Complete Your Application
              </h1>
              <p className="text-lg text-slate-600">
                Secure your spot for {internship.title}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>
                  
                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Internship Application Fee</span>
                        <span className="font-semibold">₹199</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Skill Assessment</span>
                        <span className="font-semibold text-emerald-600">FREE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Certificate & Recommendation</span>
                        <span className="font-semibold text-emerald-600">FREE</span>
                      </div>
                      <div className="border-t border-slate-200 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Amount</span>
                          <span>₹199</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'upi', name: 'UPI', icon: '💸' },
                        { id: 'card', name: 'Card', icon: '💳' },
                        { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
                        { id: 'wallet', name: 'Wallet', icon: '📱' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === method.id
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{method.icon}</span>
                            <div className="text-left">
                              <div className="font-semibold text-slate-900">{method.name}</div>
                              <div className="text-xs text-slate-500">Instant payment</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UPI Details */}
                  {paymentMethod === 'upi' && (
                    <div className="mb-8">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                        <h4 className="font-bold text-slate-900 mb-4">UPI Payment</h4>
                        <div className="space-y-4">
                          <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                            <div className="text-sm text-slate-500 mb-2">Scan QR Code</div>
                            <div className="w-48 h-48 mx-auto bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                              <div className="text-center">
                                <div className="text-4xl mb-2">📱</div>
                                <div className="text-sm text-slate-500">QR Code</div>
                              </div>
                            </div>
                            <div className="text-sm text-slate-600">
                              Scan with any UPI app to pay ₹199
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-slate-500 mb-2">Or Enter UPI ID</div>
                            <div className="font-mono text-lg font-bold text-slate-900">
                              internadda@axisbank
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Button */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      'Pay ₹199 & Start Assessment'
                    )}
                  </button>
                </div>
              </div>

              {/* Benefits Sidebar */}
              <div className="space-y-6">
                {/* Internship Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-4">You're Applying For</h3>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-slate-900">{internship.title}</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">🏢</span>
                      </div>
                      <span className="text-slate-600">{internship.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                        <span className="text-amber-600 text-sm">💰</span>
                      </div>
                      <span className="font-semibold text-slate-900">{internship.stipend}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                        <span className="text-emerald-600 text-sm">📍</span>
                      </div>
                      <span className="text-slate-600">{internship.location}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">What You Get</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">✓</span>
                      </div>
                      <span className="text-slate-700">Guaranteed interview in 48h</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">✓</span>
                      </div>
                      <span className="text-slate-700">Professional certificate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">✓</span>
                      </div>
                      <span className="text-slate-700">LinkedIn recommendation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">✓</span>
                      </div>
                      <span className="text-slate-700">100% money-back guarantee</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 text-sm">✓</span>
                      </div>
                      <span className="text-slate-700">MSME certified platform</span>
                    </li>
                  </ul>
                </div>

                {/* Need Help */}
                <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <a href="tel:+9118001234567" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600">
                      <span className="text-xl">📞</span>
                      <div>
                        <div className="font-medium">+91 1800 123 4567</div>
                        <div className="text-sm">24/7 Support</div>
                      </div>
                    </a>
                    <a href="mailto:support@internadda.com" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600">
                      <span className="text-xl">✉️</span>
                      <div>
                        <div className="font-medium">support@internadda.com</div>
                        <div className="text-sm">Email Support</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
