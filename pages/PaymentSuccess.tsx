import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Mail, Calendar } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const transactionId = searchParams.get('transaction_id') || 'CF-XXXX-XXXX';
  const internshipId = searchParams.get('internship_id') || '1';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/test/real/${internshipId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, internshipId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-8 text-white text-center">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-3">Payment Successful! 🎉</h1>
            <p className="text-lg opacity-90">Your application is now being processed</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-sm font-bold text-slate-400 mb-2">Amount Paid</div>
                <div className="text-2xl font-black text-slate-900">₹199</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-sm font-bold text-slate-400 mb-2">Transaction ID</div>
                <div className="text-sm font-mono text-slate-700 truncate">{transactionId}</div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-indigo-600 font-bold">1</div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Skill Assessment</h4>
                  <p className="text-slate-600">
                    Take the domain-specific skill test. Redirecting in {countdown} seconds...
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Interview Schedule</h4>
                  <p className="text-slate-600">
                    If you pass, you'll receive an email with interview details within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => navigate(`/test/real/${internshipId}`)} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg mb-3">
                Start Skill Assessment Now
              </button>
              <p className="text-sm text-slate-500">
                Or wait {countdown} seconds to be redirected automatically
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
