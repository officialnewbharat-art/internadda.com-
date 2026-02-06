import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, CheckCircle } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];

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

              {/* Your Provided Cashfree Button Code */}
              <form className="w-full">
                <a href="https://payments.cashfree.com/forms/internadda" target="_parent" className="block">
                  <div className="button-container bg-[#41478a] hover:scale-105 transition-transform">
                    <img src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" alt="logo" className="logo-container" />
                    <div className="text-container">
                      <div style={{ fontFamily: 'Arial', color: '#fff', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                        Pay Now & Start Test
                      </div>
                      <div style={{ fontFamily: 'Arial', color: '#fff', fontSize: '10px' }}>
                        <span>Powered By Cashfree</span>
                        <img src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" alt="logo" className="seconday-logo-container" />
                      </div>
                    </div>
                  </div>
                </a>
                <style>{`
                  .button-container {
                    border: 1px solid black;
                    border-radius: 15px;
                    display: flex;
                    padding: 12px 20px;
                    width: 100%;
                    cursor: pointer;
                    justify-content: center;
                    align-items: center;
                  }
                  .text-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-left: 10px;
                    justify-content: center;
                  }
                  .logo-container { width: 40px; height: 40px; }
                  .seconday-logo-container { width: 16px; height: 16px; vertical-align: middle; margin-left: 4px; }
                `}</style>
              </form>

              <p className="text-[10px] text-slate-400 mt-6 leading-relaxed">
                By clicking pay, you agree to our terms. Your test credentials will be unlocked immediately after successful payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
