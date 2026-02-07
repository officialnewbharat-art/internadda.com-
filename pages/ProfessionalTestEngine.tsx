import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. GATEKEEPER: Direct Access Block Logic
  useEffect(() => {
    const verifyGatekeeper = () => {
      // Step A: Check if payment record exists
      const paymentData = localStorage.getItem(`payment_${id}`);
      // Step B: Check for the Secure Access Token we generated in PaymentSuccess
      const accessToken = localStorage.getItem(`test_access_token_${id}`);

      if (!paymentData || !accessToken) {
        // Agar dono mein se ek bhi missing hai -> Direct Access Attempted
        console.error("Access Denied: No valid session found.");
        navigate(`/payment/${id}`, { replace: true });
        return;
      }

      try {
        const data = JSON.parse(paymentData);
        if (data.status === 'success') {
          setIsAuthorized(true);
          setLoading(false);
        } else {
          navigate(`/payment/${id}`, { replace: true });
        }
      } catch (e) {
        navigate(`/payment/${id}`, { replace: true });
      }
    };

    // Small delay to ensure localStorage sync
    const timer = setTimeout(verifyGatekeeper, 800);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  // TEST QUESTIONS
  const questions = [
    { id: '1', text: 'What is the time complexity of binary search?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 2 },
    { id: '2', text: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1 },
    { id: '3', text: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'Structured Question Logic', 'Standard Query Logic'], correctAnswer: 0 },
    { id: '4', text: 'Which HTTP method is used for creating resources?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 1 },
    { id: '5', text: 'What is the main purpose of CSS?', options: ['To add interactivity', 'To structure content', 'To style content', 'To query databases'], correctAnswer: 2 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [warningCount, setWarningCount] = useState(0);

  // ANTI-CHEAT & TIMER
  useEffect(() => {
    if (!isAuthorized || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted) {
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            handleSubmit();
            alert('Security Alert: Test auto-submitted due to tab switching.');
          } else {
            alert(`Warning (${newCount}/3): Do not leave this page!`);
          }
          return newCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthorized, isSubmitted]);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    setScore(Math.round((correct / questions.length) * 100));
    setIsSubmitted(true);
    
    // Test ke baad token delete kar do taaki koi refresh karke dobara test na de sake
    localStorage.removeItem(`test_access_token_${id}`);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-bold">Initializing Secure Environment...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center p-10 border border-slate-100">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {passed ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">{passed ? 'Qualified!' : 'Test Ended'}</h1>
          <p className="text-slate-500 mb-8">Your accuracy: <span className="font-bold text-slate-900">{score}%</span></p>
          <button onClick={() => navigate('/dashboard')} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <div className="bg-[#1e293b] border-b border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Secure Examination Mode</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-slate-900 px-5 py-2 rounded-xl border border-slate-700 font-mono text-xl font-bold">
            {formatTime(timeLeft)}
          </div>
          <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-bold transition-all text-sm">Submit</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="bg-[#1e293b] rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl">
          <p className="text-indigo-400 text-xs font-bold uppercase mb-4">Question {currentQuestion + 1} of {questions.length}</p>
          <h2 className="text-xl md:text-2xl font-bold mb-10 leading-relaxed">{questions[currentQuestion].text}</h2>
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const a = [...answers];
                  a[currentQuestion] = idx;
                  setAnswers(a);
                }}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  answers[currentQuestion] === idx ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${answers[currentQuestion] === idx ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="font-medium text-slate-200">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(p => p - 1)} className="text-slate-500 font-bold disabled:opacity-0">← Previous</button>
          <button 
            disabled={currentQuestion === questions.length - 1} 
            onClick={() => setCurrentQuestion(p => p + 1)}
            className="bg-slate-800 px-8 py-3 rounded-xl font-bold hover:bg-slate-700 disabled:opacity-20"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
