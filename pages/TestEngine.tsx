import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';

const TestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const questions = [
    { id: '1', text: 'What is a variable in programming?', options: ['A storage location', 'A function', 'A loop', 'A condition'], correctAnswer: 0 },
    { id: '2', text: 'Which language is used for web styling?', options: ['HTML', 'CSS', 'JavaScript', 'Python'], correctAnswer: 1 },
    { id: '3', text: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes for practice
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);

    return () => clearInterval(timer);
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center p-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen size={30} className="text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Practice Test Complete</h2>
            <div className="text-4xl font-black text-slate-900 mb-2">{score}%</div>
            <p className="text-slate-600 mb-6">
              You scored {score}% on the practice test.
            </p>
            
            <button
              onClick={() => navigate(`/internship/${id}`)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Go Back to Internship
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Practice Test</h2>
                <p className="text-blue-100">Free trial • No payment required</p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock size={18} />
                <span className="font-mono font-bold">{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                  Q{currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-sm text-slate-500">Practice Question</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                {questions[currentQuestion].text}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newAnswers = [...answers];
                      newAnswers[currentQuestion] = index;
                      setAnswers(newAnswers);
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                        answers[currentQuestion] === index
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold disabled:opacity-30"
              >
                ← Previous
              </button>
              
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-6 py-3 rounded-lg bg-slate-100 text-slate-700 font-bold"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEngine;
