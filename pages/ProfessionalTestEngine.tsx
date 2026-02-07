import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Shield, CheckCircle, XCircle, AlertCircle, Lock, Loader2, ArrowRight } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. STRICT GATEKEEPER & REDIRECTION LOGIC
  useEffect(() => {
    const checkGatekeeper = () => {
      // Check if payment exists for this specific ID
      const paymentData = localStorage.getItem(`payment_${id}`);
      
      // Additional layer: Check if the user came from the success/payment flow
      // Yeh direct URL copy-paste ko prevent karega
      const sessionActive = sessionStorage.getItem(`test_session_${id}`);

      if (!paymentData) {
        // No payment record found - strict block
        navigate(`/payment/${id}`, { replace: true });
        return;
      }

      try {
        const data = JSON.parse(paymentData);
        // Sirf status 'success' hone par aur session active hone par entry milegi
        if (data.status === 'success' && sessionActive === 'active') {
          setPaymentVerified(true);
        } else {
          // Redirect if status is not success or session is unauthorized
          navigate(`/payment/${id}`, { replace: true });
        }
      } catch (e) {
        navigate(`/payment/${id}`, { replace: true });
      }
      
      setLoading(false);
    };

    // 500ms delay to prevent race conditions during route changes
    const timer = setTimeout(checkGatekeeper, 500);
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
  const [timeLeft, setTimeLeft] = useState(30 * 60); 
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
            alert('CRITICAL: Test auto-submitted due to security violation.');
          } else {
            alert(`WARNING (${newCount}/3): Tab switching is not allowed.`);
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
    
    // Test khatam hone ke baad session expire kar do taaki re-entry na ho sake
    sessionStorage.removeItem(`test_session_${id}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Gatekeeper Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-bold tracking-tight">Securing Environment...</p>
        </div>
      </div>
    );
  }

  // Result UI
  if (isSubmitted) {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
          <div className={`${passed ? 'bg-emerald-600' : 'bg-slate-900'} p-12 text-white text-center`}>
            <CheckCircle size={60} className="mx-auto mb-6 opacity-20" />
            <h1 className="text-4xl font-black mb-2">{passed ? 'Qualified!' : 'Test Complete'}</h1>
            <p className="opacity-80">Score: {score}%</p>
          </div>
          <div className="p-12 text-center">
            <button onClick={() => navigate('/dashboard')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold">Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Header */}
      <div className="bg-[#1e293b] border-b border-slate-800 px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 px-3 py-1 rounded-md text-[10px] font-black uppercase text-white">Encrypted Session</div>
          <div className="text-sm font-bold tracking-tight">Professional Assessment System</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-slate-900 px-6 py-2 rounded-xl border-2 border-slate-700">
            <span className="font-mono text-2xl font-black">{formatTime(timeLeft)}</span>
          </div>
          <button onClick={handleSubmit} className="bg-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all">Submit Test</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="bg-[#1e293b] rounded-[40px] p-10 md:p-16 border border-slate-800 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
          <h2 className="text-2xl md:text-4xl font-bold mb-14">{questions[currentQuestion].text}</h2>
          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestion] = index;
                  setAnswers(newAnswers);
                }}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 ${
                  answers[currentQuestion] === index ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                  answers[currentQuestion] === index ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(prev => prev - 1)} className="px-8 py-4 font-bold text-slate-500 disabled:opacity-0">← Back</button>
          <button 
            disabled={currentQuestion === questions.length - 1} 
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            className="px-12 py-4 bg-indigo-600 rounded-2xl font-bold disabled:opacity-30"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
