import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { ShieldCheck, Clock, CheckCircle, Lock, BadgeCheck, AlertTriangle } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  useEffect(() => {
    // Redirect to payment modal or show payment required message
    const timer = setTimeout(() => {
      // Option 1: Redirect back to internship detail (which has payment modal)
      navigate(`/internship/${id}`);
      
      // Option 2: Or show a message that payment is required
      // alert('Please complete payment to apply for this internship.');
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="text-amber-600" size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Required</h2>
          
          <p className="text-slate-600 mb-6">
            To apply for <span className="font-bold">{internship.title}</span>, you need to complete the payment of ₹199 first.
          </p>
          
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-6 mb-6 border border-slate-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BadgeCheck className="text-indigo-600" size={24} />
              <span className="font-bold text-indigo-900">What You Get:</span>
            </div>
            <ul className="text-left text-sm text-slate-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Guaranteed skill assessment
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Direct interview scheduling
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Professional certificate
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Money-back guarantee
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/internship/${id}`)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all"
            >
              Go Back & Complete Payment
            </button>
            
            <button
              onClick={() => navigate(`/test/practice/${id}`)}
              className="w-full border-2 border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              Try Free Practice Test First
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="text-slate-400" size={18} />
              <span className="text-sm text-slate-500">MSME Certified Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
