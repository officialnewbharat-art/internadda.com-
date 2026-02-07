import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { Clock, CheckCircle, Loader2, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Personalized Questions Database based on Category
  const QUESTION_BANK: Record<string, any[]> = {
    "Web Development": [
      { text: 'Which hook is used for side effects in React?', options: ['useState', 'useContext', 'useEffect', 'useReducer'], correctAnswer: 2 },
      { text: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], correctAnswer: 1 },
      { text: 'What is the correct HTML element for the largest heading?', options: ['<heading>', '<h6>', '<head>', '<h1>'], correctAnswer: 3 }
    ],
    "Python": [
      { text: 'Which keyword is used to create a function in Python?', options: ['func', 'define', 'def', 'function'], correctAnswer: 2 },
      { text: 'What is the correct file extension for Python files?', options: ['.pt', '.py', '.pyt', '.pyth'], correctAnswer: 1 },
      { text: 'How do you insert comments in Python code?', options: ['//', '/*', '#', '--'], correctAnswer: 2 }
    ],
    "Data Science": [
      { text: 'Which library is primarily used for data manipulation in Python?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn'], correctAnswer: 1 },
      { text: 'What is a "Null Hypothesis"?', options: ['A statement of no effect', 'A false statement', 'A variable', 'A data type'], correctAnswer: 0 }
    ],
    "General": [
      { text: 'What is the time complexity of binary search?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 2 },
      { text: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1 }
    ]
  };

  // Select questions based on internship category, fallback to General
  const questions = QUESTION_BANK[internship?.category || "General"] || QUESTION_BANK["General"];

  useEffect(() => {
    const verifyGatekeeper = () => {
      const paymentData = localStorage.getItem(`payment_${id}`);
      const accessToken = localStorage.getItem(`test_access_token_${id}`);

      if (!paymentData || !accessToken) {
        navigate(`/payment/${id}`, { replace: true });
        return;
      }
      setIsAuthorized(true);
      setLoading(false);
    };

    setTimeout(verifyGatekeeper, 1500);
  }, [id, navigate]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isAuthorized || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAuthorized, isSubmitted]);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => { if (answers[i] === q.correctAnswer) correct++; });
    setScore(Math.round((correct / questions.length) * 100));
    setIsSubmitted(true);
    localStorage.removeItem(`test_access_token_${id}`);
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-900 font-black text-xl">Generating Personalized Test...</p>
        <p className="text-slate-400 text-sm mt-2 uppercase font-bold tracking-widest">Target: {internship?.title}</p>
      </div>
    </div>
  );

  if (isSubmitted) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-slate-100">
        <div className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center ${score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Test Completed</h1>
        <p className="text-slate-500 mt-2 font-medium">For {user?.name}</p>
        <div className="bg-slate-50 rounded-3xl py-8 my-8">
          <span className="text-6xl font-black text-slate-900">{score}%</span>
          <p className="text-[10px] font-black text-slate-400 uppercase mt-2">Personalized Score</p>
        </div>
        <button onClick={() => navigate('/profile')} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2">
          Back to Profile <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Personalized Secure Header */}
      <div className="bg-[#1e293b]/80 backdrop-blur-xl border-b border-slate-800 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center"><Cpu size={20}/></div>
          <div>
            <div className="text-sm font-black">{internship?.category} Assessment</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Candidate: {user?.name}</div>
          </div>
        </div>
        <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 font-mono text-2xl font-black ${timeLeft < 300 ? 'border-red-500 text-red-500 animate-pulse' : 'border-slate-700'}`}>
          <Clock size={24} /> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="bg-[#1e293b] rounded-[48px] p-10 md:p-20 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="mb-12">
            <span className="bg-indigo-500/10 text-indigo-400 text-xs font-black px-6 py-2 rounded-full border border-indigo-500/20 uppercase tracking-widest">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-16 leading-tight">
            {questions[currentQuestion].text}
          </h2>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => { const a = [...answers]; a[currentQuestion] = idx; setAnswers(a); }}
                className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center gap-6 group ${
                  answers[currentQuestion] === idx ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
                  answers[currentQuestion] === idx ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-lg font-bold">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(p => p - 1)} className="font-bold text-slate-500 disabled:opacity-0">← Back</button>
          <button 
            onClick={() => currentQuestion === questions.length - 1 ? handleSubmit() : setCurrentQuestion(p => p + 1)}
            className="bg-indigo-600 px-12 py-5 rounded-3xl font-black text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            {currentQuestion === questions.length - 1 ? 'Submit Assessment' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
