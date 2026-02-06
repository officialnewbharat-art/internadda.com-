
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { Clock, Shield, AlertTriangle, CheckCircle, XCircle, Lock } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  
  // Domain-specific questions based on internship category
  const getDomainQuestions = () => {
    const baseQuestions = [
      {
        id: '1',
        text: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Binary search has O(log n) time complexity as it divides the search space in half each time.'
      },
      {
        id: '2',
        text: 'Which data structure uses LIFO principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'Stack uses Last-In-First-Out (LIFO) principle.'
      },
      {
        id: '3',
        text: 'What does SQL stand for?',
        options: [
          'Structured Query Language',
          'Simple Question Language',
          'Structured Question Logic',
          'Standard Query Logic'
        ],
        correctAnswer: 0,
        explanation: 'SQL stands for Structured Query Language.'
      },
      {
        id: '4',
        text: 'Which HTTP method is used for creating resources?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 1,
        explanation: 'POST method is typically used for creating new resources in REST APIs.'
      },
      {
        id: '5',
        text: 'What is the main purpose of CSS?',
        options: [
          'To add interactivity to websites',
          'To structure web content',
          'To style web content',
          'To query databases'
        ],
        correctAnswer: 2,
        explanation: 'CSS (Cascading Style Sheets) is used for styling web content.'
      },
      {
        id: '6',
        text: 'Which keyword is used to define a constant in JavaScript?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 2,
        explanation: 'The "const" keyword is used to define constants in JavaScript.'
      },
      {
        id: '7',
        text: 'What is React.js primarily used for?',
        options: [
          'Backend development',
          'Building user interfaces',
          'Database management',
          'Machine learning'
        ],
        correctAnswer: 1,
        explanation: 'React.js is a JavaScript library for building user interfaces.'
      },
      {
        id: '8',
        text: 'Which protocol is used for secure web communication?',
        options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
        correctAnswer: 2,
        explanation: 'HTTPS (HTTP Secure) is used for secure web communication.'
      },
      {
        id: '9',
        text: 'What does API stand for?',
        options: [
          'Application Programming Interface',
          'Advanced Programming Interface',
          'Application Process Integration',
          'Automated Programming Interface'
        ],
        correctAnswer: 0,
        explanation: 'API stands for Application Programming Interface.'
      },
      {
        id: '10',
        text: 'Which is NOT a JavaScript framework?',
        options: ['React', 'Angular', 'Vue', 'Django'],
        correctAnswer: 3,
        explanation: 'Django is a Python web framework, not a JavaScript framework.'
      }
    ];

    // Add domain-specific questions based on category
    const domainSpecific = {
      'Python': [
        {
          id: '11',
          text: 'What is the output of `print(3 * "7")` in Python?',
          options: ['21', '777', 'Error', '37'],
          correctAnswer: 1,
          explanation: 'In Python, multiplying a string repeats it. So 3 * "7" gives "777".'
        },
        {
          id: '12',
          text: 'Which is used to create virtual environments in Python?',
          options: ['venv', 'virtualenv', 'pipenv', 'All of the above'],
          correctAnswer: 3,
          explanation: 'All of these can be used to create virtual environments in Python.'
        }
      ],
      'Web Development': [
        {
          id: '11',
          text: 'What does CSS stand for?',
          options: [
            'Computer Style Sheets',
            'Creative Style System',
            'Cascading Style Sheets',
            'Colorful Style Sheets'
          ],
          correctAnswer: 2,
          explanation: 'CSS stands for Cascading Style Sheets.'
        },
        {
          id: '12',
          text: 'Which HTML tag is used for the largest heading?',
          options: ['<h6>', '<heading>', '<h1>', '<head>'],
          correctAnswer: 2,
          explanation: '<h1> is used for the largest heading in HTML.'
        }
      ],
      'Data Science': [
        {
          id: '11',
          text: 'Which library is primarily used for data manipulation in Python?',
          options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
          correctAnswer: 1,
          explanation: 'Pandas is primarily used for data manipulation in Python.'
        },
        {
          id: '12',
          text: 'What is supervised learning?',
          options: [
            'Learning without labeled data',
            'Learning with labeled data',
            'Reinforcement learning',
            'Unsupervised clustering'
          ],
          correctAnswer: 1,
          explanation: 'Supervised learning uses labeled data to train models.'
        }
      ]
    };

    return [...baseQuestions, ...(domainSpecific[internship.category as keyof typeof domainSpecific] || [])].slice(0, 25);
  };

  const [questions] = useState(getDomainQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timer
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

    // Anti-cheat: Tab switching detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            alert('Test auto-submitted due to multiple tab switching violations.');
            handleSubmit();
          } else {
            alert(`⚠️ Warning ${newCount}/3: Tab switch detected!`);
          }
          return newCount;
        });
      }
    };

    // Anti-cheat: Copy/Paste prevention
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    const handlePaste = (e: ClipboardEvent) => e.preventDefault();
    const handleContextMenu = (e: Event) => e.preventDefault();

    // Fullscreen handling
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Enter fullscreen
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
    }

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  if (isSubmitted) {
    const passed = score >= 70; // 70% passing threshold
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* Result Header */}
            <div className={`${passed ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'} p-8 text-white text-center`}>
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                {passed ? (
                  <CheckCircle size={48} className="text-white" />
                ) : (
                  <XCircle size={48} className="text-white" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-3">
                {passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
              </h1>
              <p className="text-lg opacity-90">
                {passed 
                  ? 'You have cleared the skill assessment!'
                  : 'You need more practice to clear the assessment.'}
              </p>
            </div>

            {/* Score Display */}
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-center gap-12">
                <div className="text-center">
                  <div className="text-5xl font-black text-slate-900 mb-2">{score}%</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Score</div>
                </div>
                <div className="w-px h-16 bg-slate-200"></div>
                <div className="text-center">
                  <div className={`text-xl font-bold px-6 py-2 rounded-full ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {passed ? 'PASSED' : 'NOT PASSED'}
                  </div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-3">Status</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">What's Next?</h3>
              
              {passed ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Interview Scheduled</h4>
                        <p className="text-sm text-blue-700">
                          You will receive an email within 24 hours with your interview link and scheduled time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900 mb-1">Preparation Tips</h4>
                        <ul className="text-sm text-emerald-700 space-y-1 list-disc pl-5">
                          <li>Review the domain-specific concepts</li>
                          <li>Prepare your portfolio/projects</li>
                          <li>Be ready for technical discussions</li>
                          <li>Research about the company</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertTriangle size={16} className="text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">Need Improvement</h4>
                        <p className="text-sm text-amber-700">
                          Focus on practicing more domain-specific questions. You can retake the test after 7 days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Keep Learning</h4>
                        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                          <li>Review the questions you got wrong</li>
                          <li>Practice with our free practice tests</li>
                          <li>Join our learning community</li>
                          <li>Build projects to strengthen your skills</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {passed ? (
                  <>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => window.print()}
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

            {/* Footer Note */}
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Test Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <span className="font-bold">IA</span>
          </div>
          <div>
            <div className="font-bold text-sm">Skill Assessment</div>
            <div className="text-xs text-slate-400">{internship.title}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${timeLeft < 300 ? 'border-red-500 bg-red-900/20 animate-pulse' : 'border-slate-600'}`}>
            <Clock size={16} />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>

          {/* Warnings */}
          {warningCount > 0 && (
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={16} />
              <span className="text-sm font-bold">{warningCount}/3</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Test Area */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6">
              {/* Question Counter */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Q{currentQuestion + 1}/{questions.length}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {internship.category} • Domain Assessment
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400">
                  <Lock size={14} />
                  <span className="text-xs">Secure Test Environment</span>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-xl font-bold mb-8 leading-relaxed">
                {questions[currentQuestion].text}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
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

            {/* Navigation */}
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

          {/* Sidebar - Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 sticky top-24">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Shield size={16} />
                Question Palette
              </h3>
              
              <div className="grid grid-cols-5 gap-3 mb-6">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                      currentQuestion === index
                        ? 'bg-indigo-600 text-white scale-110'
                        : answers[index] !== -1
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-indigo-600"></div>
                  <span className="text-slate-400">Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-600"></div>
                  <span className="text-slate-400">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-700"></div>
                  <span className="text-slate-400">Not Answered</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="text-xs text-slate-400 mb-2">Test Instructions</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• 25 questions, 30 minutes</li>
                  <li>• No tab switching allowed</li>
                  <li>• 70% passing score</li>
                  <li>• No negative marking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
