import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_INTERNSHIPS, CATEGORY_QUESTIONS } from '../constants';

const TestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find internship and category-specific questions
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);
  const questions = CATEGORY_QUESTIONS[internship?.category || "Web Development"] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes for the challenge
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (questions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions]);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    const passed = score >= 50;
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="max-w-xl w-full">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10 text-center">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {passed ? <CheckCircle2 size={48} /> : <AlertCircle size={48} />}
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">Practice Results</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-8">{internship?.category} Assessment</p>
            
            <div className="bg-slate-50 rounded-3xl py-10 mb-8 border border-slate-100">
              <div className="text-7xl font-black text-slate-900">{score}%</div>
              <p className="text-slate-500 mt-2 font-medium">Practice Score</p>
            </div>

            <div className="text-slate-600 mb-10 leading-relaxed font-medium">
              {passed 
                ? "Excellent! You've managed to tackle these tough questions. You're ready for the real certification test." 
                : "These questions were designed to be extremely difficult. Keep practicing to reach the 50% threshold for the real test."}
            </div>
            
            <button
              onClick={() => navigate(`/internship/${id}`)}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
            >
              Back to Internship <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Test Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none">{internship?.category} Practice</h2>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Advanced Module</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-mono text-xl font-black transition-all ${timeLeft < 180 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
            <Clock size={20} />
            <span>{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Progress Bar */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-slate-500 font-black text-sm whitespace-nowrap">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden p-8 md:p-14">
            <div className="mb-10">
              <span className="bg-indigo-50 text-indigo-600 text-xs font-black px-4 py-1.5 rounded-full border border-indigo-100 uppercase tracking-tighter">
                Question {currentQuestion + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-6 leading-tight">
                {questions[currentQuestion].text}
              </h3>
            </div>

            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newAnswers = [...answers];
                    newAnswers[currentQuestion] = index;
                    setAnswers(newAnswers);
                  }}
                  className={`w-full text-left p-6 rounded-3xl border-2 transition-all group flex items-center gap-6 ${
                    answers[currentQuestion] === index
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-colors ${
                    answers[currentQuestion] === index
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`text-lg font-bold ${answers[currentQuestion] === index ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex justify-between items-center">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-black hover:bg-white disabled:opacity-0 transition-all"
            >
              Previous Question
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-12 py-4 rounded-2xl bg-indigo-600 text-white font-black shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
              >
                Submit Practice Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-12 py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                Next Question <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEngine;
