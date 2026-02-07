[file name]: InternshipDetail.tsx
[file content begin]
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { Shield, Award, Clock, CheckCircle, Lock, Users, Zap, Star, BookOpen, Target, FileText } from 'lucide-react';

const InternshipDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentClick = () => {
    // Simulate payment success and redirect to test
    const paymentSuccess = true; // In real app, this would come from Cashfree callback
    
    if (paymentSuccess) {
      // Store payment info in localStorage
      const paymentData = {
        internshipId: id,
        amount: 199,
        date: new Date().toISOString(),
        status: 'completed'
      };
      localStorage.setItem('lastPayment', JSON.stringify(paymentData));
      
      // Redirect to test page
      navigate(`/test/real/${id}`);
    } else {
      alert('Payment failed. Please try again.');
    }
    
    setShowPaymentModal(false);
  };

  const PaymentModal = () => (
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
              onClick={() => setShowPaymentModal(false)}
              className="p-2 hover:bg-slate-100 rounded-lg"
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
          <h4 className="font-bold text-slate-900 mb-6">Complete Payment</h4>
          
          {/* Amount Display */}
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-2">₹199</div>
              <div className="text-sm text-slate-600">One-time application processing fee</div>
              <div className="text-xs text-slate-500 mt-2">Includes skill assessment, interview scheduling, and certificate</div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-8">
            <button
              onClick={handlePaymentClick}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all mb-4"
            >
              Pay ₹199 & Start Assessment
            </button>
            
            {/* Cashfree Integration */}
            <div className="text-center mb-6">
              <p className="text-sm text-slate-500 mb-4">Or pay securely via</p>
              
              <div className="flex justify-center gap-4">
                {/* UPI Payment Button */}
                <button 
                  onClick={handlePaymentClick}
                  className="bg-white border border-slate-300 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  <div className="text-2xl mb-2">💸</div>
                  <div className="text-xs font-medium text-slate-700">UPI</div>
                </button>
                
                {/* Card Payment Button */}
                <button 
                  onClick={handlePaymentClick}
                  className="bg-white border border-slate-300 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  <div className="text-2xl mb-2">💳</div>
                  <div className="text-xs font-medium text-slate-700">Card</div>
                </button>
                
                {/* Net Banking Button */}
                <button 
                  onClick={handlePaymentClick}
                  className="bg-white border border-slate-300 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  <div className="text-2xl mb-2">🏦</div>
                  <div className="text-xs font-medium text-slate-700">Net Banking</div>
                </button>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="text-center border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-600">
              Payment is required to access our verified assessment system. 
              After payment, you'll be redirected to the skill test immediately.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock size={12} />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Shield size={12} />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showPaymentModal && <PaymentModal />}
      
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img src={internship.image} className="w-full h-full object-cover" alt={internship.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
              <div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
                  {internship.category}
                </span>
                <h1 className="text-4xl font-black text-white tracking-tight">{internship.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                <p className="text-slate-500 leading-loose">
                  {internship.description} This is a unique opportunity for aspiring developers to gain hands-on experience in a professional environment. You will be working directly with senior architects and product managers to deliver impact.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Skills Required</h3>
                <div className="flex flex-wrap gap-3">
                  {internship.skills.map(skill => (
                    <span key={skill} className="bg-slate-50 text-slate-600 px-5 py-2 rounded-xl text-sm font-bold border border-slate-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-4 text-slate-500 list-disc pl-5">
                  <li>Collaborate with cross-functional teams to define features.</li>
                  <li>Write clean, modular, and reusable code.</li>
                  <li>Perform unit tests and optimize performance.</li>
                  <li>Participate in daily stand-ups and sprint planning.</li>
                </ul>
              </div>

              {/* Test Details */}
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-amber-500" />
                  Skill Assessment Process
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">25</div>
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
                    <div className="text-sm text-slate-600">Timed Test</div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Domain-specific questions • Real-time anti-cheat system • Instant results and feedback
                </p>
              </div>
            </div>

            <div className="md:col-span-1 space-y-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
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
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-center block shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-[1.02] transition-all"
                  >
                    Apply Now - ₹199
                  </button>
                  <Link 
                    to={`/test/practice/${id}`}
                    className="w-full border-2 border-slate-300 text-slate-700 py-4 rounded-2xl font-bold text-center block hover:bg-slate-50 transition-all"
                  >
                    Free Practice Test
                  </Link>
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-start gap-3">
                  <Users className="text-emerald-600 mt-1" size={20} />
                  <p className="text-sm text-emerald-800">
                    <strong>200+ students</strong> have applied for this position in the last 24 hours.
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                  <Shield className="text-indigo-600" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">MSME Certified</div>
                    <div className="text-xs text-slate-500">Government verified platform</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                  <Star className="text-amber-500" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Direct Interview</div>
                    <div className="text-xs text-slate-500">Skip HR, meet managers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                  <CheckCircle className="text-emerald-500" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Instant Results</div>
                    <div className="text-xs text-slate-500">Get test results immediately</div>
                  </div>
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
[file content end]
