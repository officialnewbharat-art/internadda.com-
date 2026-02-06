import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { Shield, Award, Clock, CheckCircle, Lock, Users, Zap, Star } from 'lucide-react';

const InternshipDetail: React.FC = () => {
  const { id } = useParams();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Secure Your Spot</h3>
              <p className="text-slate-600">One-time fee for guaranteed interview process</p>
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
              <div className="text-xs text-blue-700">Avg. Process</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <div className="text-amber-600 text-sm font-bold">💰 Refund</div>
              <div className="text-xs text-amber-700">Guarantee</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-8 border-b border-slate-100">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award size={20} className="text-indigo-600" />
            What You Get
          </h4>
          <div className="space-y-3">
            {[
              "✅ Guaranteed interview within 48 hours",
              "✅ Professional skill assessment",
              "✅ Certificate of completion",
              "✅ LinkedIn recommendation",
              "✅ Direct manager interview",
              "✅ MSME certified process"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle size={16} className="text-emerald-500" />
                {item}
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
              <div className="text-sm text-slate-600">One-time application fee</div>
              <div className="text-xs text-slate-500 mt-2">(100% refundable if no interview scheduled)</div>
            </div>
          </div>

          {/* Cashfree Payment Button - REPLACE YOUR-APP-ID HERE */}
          <div className="mb-6">
            <form>
              <a href="https://payments.cashfree.com/forms/internadda" target="_blank" rel="noopener noreferrer">
                <div className="button-container" style={{
                  background: '#41478a',
                  border: '1px solid black',
                  borderRadius: '15px',
                  display: 'flex',
                  padding: '10px',
                  width: '100%',
                  cursor: 'pointer',
                  maxWidth: '300px',
                  margin: '0 auto'
                }}>
                  <div>
                    <img 
                      src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
                      alt="logo" 
                      className="logo-container"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                  <div className="text-container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: '10px',
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}>
                    <div style={{fontFamily: 'Arial', color: '#fff', marginBottom: '5px', fontSize: '14px'}}>
                      Pay Now
                    </div>
                    <div style={{fontFamily: 'Arial', color: '#fff', fontSize: '10px'}}>
                      <span>Powered By Cashfree</span>
                      <img 
                        src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
                        alt="logo" 
                        className="seconday-logo-container"
                        style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginLeft: '4px' }}
                      />
                    </div>
                  </div>
                </div>
              </a>
            </form>
            
            {/* Trust Seals */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="text-center">
                <Lock size={16} className="text-slate-400 mx-auto mb-1" />
                <div className="text-xs text-slate-500">Secure Payment</div>
              </div>
              <div className="text-center">
                <Shield size={16} className="text-slate-400 mx-auto mb-1" />
                <div className="text-xs text-slate-500">PCI-DSS Compliant</div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="text-center">
            <p className="text-xs text-slate-500">
              After payment, you'll be redirected to the skill assessment. 
              Pass the test to proceed to interview.
            </p>
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
                  Skill Assessment Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">25</div>
                    <div className="text-sm text-slate-600">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">30 min</div>
                    <div className="text-sm text-slate-600">Duration</div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Domain-specific questions • Real-time anti-cheat • Instant results
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipDetail;
