import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { AlertTriangle, CreditCard } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  useEffect(() => {
    // Redirect to payment page immediately
    navigate(`/payment/${id}`);
  }, [id, navigate]);

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
            <CreditCard className="text-indigo-600" size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Redirecting to Payment</h2>
          
          <p className="text-slate-600 mb-6">
            Please complete payment to apply for <span className="font-bold">{internship.title}</span>.
          </p>
          
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
