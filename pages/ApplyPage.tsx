// pages/ApplyPage.tsx - Updated version
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { ShieldCheck, Clock, CheckCircle, Lock, BadgeCheck, CreditCard } from 'lucide-react';
import { cashfree } from '../utils/cashfree';

const ApplyPage: React.FC<{ user: any }> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'payment' | 'processing'>('form');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [paymentLink, setPaymentLink] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    yearOfStudy: '',
    resume: null as File | null,
    coverLetter: '',
    linkedin: '',
    portfolio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        college: user.education || ''
      }));
    }
  }, [user]);

  const generateOrderId = () => {
    return `INTERNADDA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    try {
      const paymentData = await cashfree.createOrder(newOrderId, 199, {
        id: user?.id || 'guest',
        email: formData.email,
        phone: formData.phone,
        name: formData.fullName
      });

      setPaymentLink(paymentData.payment_link);
      
      // Store application data temporarily
      localStorage.setItem(`application_${newOrderId}`, JSON.stringify({
        internshipId: id,
        formData,
        userId: user?.id
      }));

    } catch (error) {
      console.error('Payment setup failed:', error);
      alert('Payment setup failed. Please try again.');
      setStep('form');
    }
  };

  const handlePaymentSuccess = async () => {
    setStep('processing');
    
    try {
      const isVerified = await cashfree.verifyPayment(orderId);
      
      if (isVerified) {
        setPaymentStatus('success');
        
        // Store successful payment in localStorage
        localStorage.setItem(`payment_${orderId}`, 'success');
        
        // Redirect to test after 3 seconds
        setTimeout(() => {
          navigate(`/test/real/${id}?order=${orderId}`);
        }, 3000);
      } else {
        setPaymentStatus('failed');
        setTimeout(() => setStep('form'), 3000);
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
    }
  };

  const checkPaymentStatus = async () => {
    if (!orderId) return;
    
    const isVerified = await cashfree.verifyPayment(orderId);
    if (isVerified) {
      handlePaymentSuccess();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderIdFromUrl = params.get('order_id');
    
    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl);
      checkPaymentStatus();
    }
  }, []);

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      {step === 'form' && (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <BadgeCheck className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">Apply for {internship.title}</h2>
                  <p className="text-slate-500 text-sm">Complete your application in 3 simple steps</p>
                </div>
              </div>

              {/* Application Steps Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                  <span className="text-sm font-bold text-slate-900">Fill Details</span>
                </div>
                <div className="h-px w-12 bg-slate-200"></div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">2</div>
                  <span className="text-sm font-bold text-slate-400">Make Payment</span>
                </div>
                <div className="h-px w-12 bg-slate-200"></div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">3</div>
                  <span className="text-sm font-bold text-slate-400">Skill Test</span>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Email Address *</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      readOnly
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="9876543210"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Educational qualifications*</label>
                    <input 
                      type="text" 
                      value={formData.college}
                      onChange={(e) => setFormData({...formData, college: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Enter your college name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Cover Letter</label>
                  <textarea 
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-32"
                    placeholder="Tell us why you're the perfect candidate for this internship..."
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-slate-400 mt-1">
                    {formData.coverLetter.length}/500 characters
                  </div>
                </div>

                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-center group">
                  <input 
                    type="file" 
                    className="hidden" 
                    id="resume-upload" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({...formData, resume: e.target.files?.[0] || null})}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="text-slate-600 font-bold text-sm group-hover:text-indigo-600">
                      {formData.resume ? `✓ ${formData.resume.name}` : 'Upload Your Resume *'}
                    </div>
                    <div className="text-slate-400 text-xs mt-1">PDF, DOC, DOCX (Max: 5MB)</div>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                >
                  Proceed to Payment (₹199) <CreditCard size={18} />
                </button>

                <div className="text-center text-xs text-slate-400">
                  Your ₹199 fee includes: Skill Assessment + Interview Scheduling + Certificate
                </div>
              </form>
            </div>
          </div>

          {/* Side Trust & Summary Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-6 tracking-widest">Application Summary</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Clock className="text-indigo-600" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{internship.title}</div>
                  <div className="text-xs text-slate-500">{internship.company}</div>
                </div>
              </div>
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Stipend</span>
                  <span className="font-bold text-indigo-600">{internship.stipend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Location</span>
                  <span className="font-bold text-slate-700">{internship.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="font-bold text-slate-700">6 Months</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white space-y-5 shadow-xl shadow-indigo-100">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-indigo-200 mt-1" size={20} />
                <div>
                  <p className="text-sm font-bold">100% Secure Payment</p>
                  <p className="text-xs text-indigo-100 opacity-80">Powered by Cashfree (RBI Licensed)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="text-indigo-200 mt-1" size={20} />
                <div>
                  <p className="text-sm font-bold">Money-Back Guarantee</p>
                  <p className="text-xs text-indigo-100 opacity-80">Full refund if no interview call</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
              <h5 className="font-bold text-emerald-900 text-sm mb-3">What happens after payment?</h5>
              <ol className="space-y-2 text-xs text-emerald-800">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Take skill assessment (25 questions, 3 mins)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Get interview link via email within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>AI interview with ArjunaAI technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Receive offer letter if selected</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="text-indigo-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Complete Your Payment</h2>
              <p className="text-slate-500 mt-2">Secure payment of ₹199 for internship processing</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">Order ID</span>
                <span className="font-mono font-bold text-slate-900">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Amount to pay</span>
                <span className="text-2xl font-bold text-indigo-600">₹199</span>
              </div>
            </div>

            {paymentLink ? (
              <div className="space-y-4">
                <a 
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl font-bold text-center hover:shadow-lg transition-all"
                >
                  Pay Now with Cashfree
                </a>
                <p className="text-center text-sm text-slate-500">
                  You'll be redirected to Cashfree's secure payment gateway
                </p>
                
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-sm text-amber-800">
                    After payment, return to this page. Your skill test will start automatically.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600">Setting up payment gateway...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center">
            <div className="w-32 h-32 mx-auto mb-8">
              {paymentStatus === 'pending' && (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center animate-pulse">
                  <div className="text-4xl">⏳</div>
                </div>
              )}
              {paymentStatus === 'success' && (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center">
                  <div className="text-4xl">✅</div>
                </div>
              )}
              {paymentStatus === 'failed' && (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
                  <div className="text-4xl">❌</div>
                </div>
              )}
            </div>

            {paymentStatus === 'pending' && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Verifying Your Payment</h2>
                <p className="text-slate-600 mb-8">Please wait while we confirm your payment...</p>
                <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 animate-progress"></div>
                </div>
              </>
            )}

            {paymentStatus === 'success' && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Successful! 🎉</h2>
                <p className="text-slate-600 mb-6">Your payment has been verified. Redirecting to skill assessment...</p>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-8">
                  <h4 className="font-bold text-emerald-900 mb-3">Next Steps:</h4>
                  <ol className="space-y-2 text-left text-sm text-emerald-800">
                    <li className="flex items-center gap-2">✅ Skill Assessment (25 questions, 3 minutes)</li>
                    <li className="flex items-center gap-2">📧 Interview link via email within 24 hours</li>
                    <li className="flex items-center gap-2">🤖 AI-powered interview with ArjunaAI</li>
                  </ol>
                </div>
                <div className="text-sm text-slate-500">
                  You'll be redirected in 3 seconds...
                </div>
              </>
            )}

            {paymentStatus === 'failed' && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Failed</h2>
                <p className="text-slate-600 mb-8">We couldn't verify your payment. Please try again.</p>
                <button 
                  onClick={() => setStep('form')}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyPage;
