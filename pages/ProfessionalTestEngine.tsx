import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Shield, CheckCircle, XCircle, AlertCircle, Lock, Loader2, ArrowRight } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. STRICT SECURITY CHECK
  useEffect(() => {
    const verifyAccess = () => {
      const paymentData = localStorage.getItem(`payment_${id}`);
      
      if (!paymentData) {
        // Direct link bypass attempt
        navigate(`/payment/${id}`, { replace: true });
        return;
      }

      try {
        const data = JSON.parse(paymentData);
        if (data.status === 'success') {
          setPaymentVerified(true);
        } else {
          navigate(`/payment/${id}`, { replace: true });
        }
      } catch (e) {
        navigate(`/payment/${id}`, { replace: true });
      }
      
      setLoading(false);
    };

    // Small delay to ensure localStorage is hydrated after redirect
    const timer = setTimeout(verifyAccess, 500);
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
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [warningCount, setWarningCount] = useState(0);

  // TIMER & ANTI-CHEAT LOGIC
  useEffect(() => {
    if (!paymentVerified) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
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
            alert('CRITICAL: Test auto-submitted due to excessive tab switching.');
          } else {
            alert(`WARNING (${newCount}/3): Tab switching is strictly prohibited. Your test will auto-submit on the 3rd warning.`);
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
  }, [paymentVerified, isSubmitted]);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    
    // Cleanup security tokens after submission
    localStorage.removeItem('last_active_order');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-bold">Initializing Secure Environment...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className={`${passed ? 'bg-emerald-600' : 'bg-slate-900'} p-12 text-white text-center`}>
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
              {passed ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
            </div>
            <h1 className="text-4xl font-black mb-2">{passed ? 'Qualified!' : 'Assessment Complete'}</h1>
            <p className="text-white/80">Professional Skill Verification Result</p>
          </div>

          <div className="p-12 text-center">
            <div className="inline-block bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
              <div className="text-6xl font-black text-slate-900">{score}%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Final Score</div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
              <p className="text-sm text-slate-500">
                {passed ? 'Our HR team will contact you within 24 hours.' : 'You can attempt this assessment again after 7 days.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-[#1e293b] border-b border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 px-3 py-1 rounded text-xs font-black tracking-tighter">LIVE EXAM</div>
          <div>
            <div className="text-sm font-bold">Professional Skill Assessment</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Secure Environment</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-3 px-6 py-2 rounded-xl border-2 ${timeLeft < 300 ? 'border-red-500 bg-red-500/10 animate-pulse' : 'border-slate-700 bg-slate-900'}`}>
            <Clock size={18} className={timeLeft < 300 ? 'text-red-500' : 'text-slate-400'} />
            <span className="font-mono text-xl font-black">{formatTime(timeLeft)}</span>
          </div>
          <button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 px-8 py-2.5 rounded-xl font-bold transition-all">
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Test Area */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        {warningCount > 0 && (
          <div className="mb-8 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">WARNING: Tab switching detected. Warning {warningCount}/3</span>
          </div>
        )}

        <div className="bg-[#1e293b] rounded-[32px] p-10 md:p-14 border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-indigo-500/20 text-indigo-400 text-xs font-black px-3 py-1 rounded-full uppercase">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-tight">
            {questions[currentQuestion].text}
          </h2>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestion] = index;
                  setAnswers(newAnswers);
                }}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-5 ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  answers[currentQuestion] === index ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-10 flex justify-between items-center">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="px-10 py-4 rounded-2xl font-bold text-slate-400 hover:text-white disabled:opacity-20 transition-all"
          >
            ← Previous
          </button>
          
          <div className="flex gap-2">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === currentQuestion ? 'bg-indigo-500' : answers[i] !== -1 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
            ))}
          </div>

          <button
            disabled={currentQuestion === questions.length - 1}
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            className="px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-20 transition-all"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
