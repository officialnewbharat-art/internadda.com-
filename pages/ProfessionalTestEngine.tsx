import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useNavigate();
  const navigate = useNavigate();
  
  // Check if payment was made
  useEffect(() => {
    const paymentData = localStorage.getItem('lastPayment');
    if (!paymentData) {
      alert('Payment required to access this test. Redirecting...');
      navigate(`/internship/${id}`);
      return;
    }
  }, [id, navigate]);

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

  useEffect(() => {
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
      if (document.hidden) {
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            handleSubmit();
            alert('Test submitted due to multiple tab switches');
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
  }, []);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isSubmitted) {
    const passed = score >= 70;
    
    // Store result
    const testResult = {
      score,
      passed,
      date: new Date().toISOString(),
      internshipId: id
    };
    localStorage.setItem('lastTestResult', JSON.stringify(testResult));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className={`${passed ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'} p-8 text-white text-center`}>
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                {passed ? <CheckCircle size={48} /> : <XCircle size={48} />}
              </div>
              <h1 className="text-3xl font-bold mb-3">{passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}</h1>
              <p className="text-lg opacity-90">
                {passed ? 'You have cleared the skill assessment!' : 'You need more practice to clear the assessment.'}
              </p>
            </div>

            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-center gap-12">
                <div className="text-center">
                  <div className="text-5xl font-black text-slate-900 mb-2">{score}%</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Score</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold px-6 py-2 rounded-full ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {passed ? 'PASSED' : 'NOT PASSED'}
                  </div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-3">Status</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {passed ? (
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <CheckCircle size={18} className="text-blue-600" />
                      Interview Scheduled
                    </h4>
                    <p className="text-sm text-blue-700">
                      You will receive an email within 24 hours with your interview link and scheduled time. Check your inbox regularly.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-2">Next Steps:</h4>
                    <ul className="text-sm text-emerald-700 space-y-1 list-disc pl-5">
                      <li>Check your email for interview details</li>
                      <li>Prepare your portfolio/projects</li>
                      <li>Research about the company</li>
                      <li>Be ready for technical discussions</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                      <AlertCircle size={18} className="text-amber-600" />
                      Need Improvement
                    </h4>
                    <p className="text-sm text-amber-700">
                      Focus on practicing more domain-specific questions. You can retake the practice test to improve your skills.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {passed ? (
                  <>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => alert('Certificate will be emailed to you within 24 hours')}
                      className="border-2 border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      Download Certificate
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate(`/test/practice/${id}`)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Take Practice Test
                    </button>
                    <button
                      onClick={() => navigate('/internships')}
                      className="border-2 border-slate-300 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      Browse Other Internships
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                {passed 
                  ? 'Our team will contact you shortly. Check your email regularly.'
                  : 'Keep practicing! Success comes with persistence.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <span className="font-bold">IA</span>
          </div>
          <div>
            <div className="font-bold text-sm">Premium Skill Assessment</div>
            <div className="text-xs text-slate-400">Paid Test • Secure Environment</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${timeLeft < 300 ? 'border-red-500 bg-red-900/20 animate-pulse' : 'border-slate-600'}`}>
            <Clock size={16} />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>

          {warningCount > 0 && (
            <div className="flex items-center gap-2 text-amber-400">
              <Shield size={16} />
              <span className="text-sm font-bold">Warnings: {warningCount}/3</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                Q{currentQuestion + 1}/{questions.length}
              </div>
              <div className="text-sm text-slate-400 font-medium">
                Domain Assessment • Paid Test
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-8 leading-relaxed">
            {questions[currentQuestion].text}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestion] = index;
                  setAnswers(newAnswers);
                }}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-900/20'
                    : 'border-slate-700 hover:border-slate-600 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    answers[currentQuestion] === index
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          
          <button
            disabled={currentQuestion === questions.length - 1}
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            className="px-6 py-3 rounded-lg bg-slate-700 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
