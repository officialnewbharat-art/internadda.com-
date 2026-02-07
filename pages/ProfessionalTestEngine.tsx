import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Shield, CheckCircle, XCircle, AlertCircle, Lock, Loader2, ArrowRight } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. STRICT SECURITY CHECK & BYPASS PREVENTION
  useEffect(() => {
    const verifyAccess = () => {
      const paymentData = localStorage.getItem(`payment_${id}`);
      
      if (!paymentData) {
        // Prevent direct URL access bypass - Redirect to payment
        navigate(`/payment/${id}`, { replace: true });
        return;
      }

      try {
        const data = JSON.parse(paymentData);
        // Only allow entry if payment status is explicitly 'success'
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

    // Small delay to ensure localStorage is hydrated and prevent race conditions
    const timer = setTimeout(verifyAccess, 500);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  // TEST CONTENT
  const questions = [
    { id: '1', text: 'What is the time complexity of binary search?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 2 },
    { id: '2', text: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1 },
    { id: '3', text: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'Structured Question Logic', 'Standard Query Logic'], correctAnswer: 0 },
    { id: '4', text: 'Which HTTP method is used for creating resources?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 1 },
    { id: '5', text: 'What is the main purpose of CSS?', options: ['To add interactivity', 'To structure content', 'To style content', 'To query databases'], correctAnswer: 2 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [warningCount, setWarningCount] = useState(0);

  // TIMER & ANTI-CHEAT LOGIC
  useEffect(() => {
    if (!paymentVerified || isSubmitted) return;

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
            alert('CRITICAL: Test auto-submitted due to excessive tab switching or minimizing.');
          } else {
            alert(`WARNING (${newCount}/3): You are not allowed to switch tabs. Your test will automatically submit on the 3rd warning.`);
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
    
    // Clear the specific payment token to prevent re-entry after submission
    // localStorage.removeItem(`payment_${id}`); // Uncomment if you want to lock them out after one attempt
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Verification Screen (Shows while checking localStorage)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-bold tracking-tight">Verifying Secure Session...</p>
        </div>
      </div>
    );
  }

  // Final Results Screen
  if (isSubmitted) {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className={`${passed ? 'bg-emerald-600' : 'bg-slate-900'} p-12 text-white text-center`}>
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
              {passed ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
            </div>
            <h1 className="text-4xl font-black mb-2">{passed ? 'Qualified!' : 'Test Complete'}</h1>
            <p className="text-white/80 font-medium">Professional Assessment Results</p>
          </div>

          <div className="p-12 text-center">
            <div className="inline-block bg-slate-50 rounded-3xl p-10 mb-8 border border-slate-100">
              <div className="text-7xl font-black text-slate-900 leading-none">{score}%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">Accuracy Score</div>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
              <p className="text-sm text-slate-500 font-medium">
                {passed 
                  ? 'Excellent work! Our recruitment team will review your profile and contact you for an interview.' 
                  : 'You did not meet the 70% threshold. You can retake the assessment after a 7-day cooling period.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-indigo-500/30">
      {/* Locked Header */}
      <div className="bg-[#1e293b] border-b border-slate-800 px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter text-white">Verified Session</div>
          <div>
            <div className="text-sm font-bold">Standard Professional Assessment</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Anti-Cheat Enabled</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-3 px-6 py-2 rounded-xl border-2 transition-colors ${timeLeft < 300 ? 'border-red-500 bg-red-500/10 animate-pulse' : 'border-slate-700 bg-slate-900'}`}>
            <Clock size={18} className={timeLeft < 300 ? 'text-red-500' : 'text-slate-400'} />
            <span className="font-mono text-2xl font-black leading-none">{formatTime(timeLeft)}</span>
          </div>
          <button 
            onClick={() => { if(window.confirm('Are you sure you want to submit the test?')) handleSubmit(); }} 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Assessment Container */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        {warningCount > 0 && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 p-5 rounded-2xl flex items-center gap-4 text-red-400 animate-in slide-in-from-top">
            <AlertCircle size={24} />
            <div>
              <p className="text-sm font-black uppercase tracking-tight">Security Violation Detected</p>
              <p className="text-xs font-bold opacity-80 mt-0.5">Warning {warningCount} of 3. Please stay on this tab.</p>
            </div>
          </div>
        )}

        <div className="bg-[#1e293b] rounded-[40px] p-10 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
          
          <div className="flex items-center gap-3 mb-10">
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-indigo-500/20">
              Section 01 • Question {currentQuestion + 1}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-14 leading-tight">
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
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 group ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-all ${
                  answers[currentQuestion] === index 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`text-lg font-medium ${answers[currentQuestion] === index ? 'text-white' : 'text-slate-300'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Navigation Controls */}
        <div className="mt-12 flex justify-between items-center">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="px-12 py-4 rounded-2xl font-bold text-slate-500 hover:text-white disabled:opacity-0 transition-all"
          >
            ← Back
          </button>
          
          <div className="flex gap-2.5">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentQuestion ? 'w-8 bg-indigo-500' : answers[i] !== -1 ? 'w-4 bg-emerald-500' : 'w-2 bg-slate-800'
                }`} 
              />
            ))}
          </div>

          <button
            disabled={currentQuestion === questions.length - 1}
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            className="px-12 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-500/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Section' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
