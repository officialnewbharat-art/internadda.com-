import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight, CheckCircle2, AlertCircle, Brain, BarChart3, Target, Trophy, Zap, ChevronRight, ChevronLeft, Timer } from 'lucide-react';
import { MOCK_INTERNSHIPS, CATEGORY_QUESTIONS } from '../constants';

const TestEngine: React.FC<{ user: any }> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);
  const questions = CATEGORY_QUESTIONS[internship?.category || "Web Development"] || [];

  // Enhanced practice questions with more sections
  const enhancedQuestions = [
    ...questions,
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `advanced-${i}`,
      text: `${internship?.category} Advanced Practice ${i + 1}: This question tests deep understanding of core concepts with practical applications.`,
      options: ['Concept A Application', 'Concept B Implementation', 'Concept C Optimization', 'Concept D Architecture'],
      correctAnswer: Math.floor(Math.random() * 4)
    }))
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(enhancedQuestions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes for practice
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [section, setSection] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [performanceStats, setPerformanceStats] = useState({
    basic: { correct: 0, total: 10 },
    intermediate: { correct: 0, total: 15 },
    advanced: { correct: 0, total: 10 }
  });

  useEffect(() => {
    if (enhancedQuestions.length === 0) return;
    
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
  }, [enhancedQuestions]);

  const handleSubmit = () => {
    let correct = 0;
    let basicCorrect = 0, intermediateCorrect = 0, advancedCorrect = 0;
    
    enhancedQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
        // Distribute by section (simplified logic)
        if (i < 10) basicCorrect++;
        else if (i < 25) intermediateCorrect++;
        else advancedCorrect++;
      }
    });
    
    const finalScore = Math.round((correct / enhancedQuestions.length) * 100);
    setScore(finalScore);
    setPerformanceStats({
      basic: { correct: basicCorrect, total: 10 },
      intermediate: { correct: intermediateCorrect, total: 15 },
      advanced: { correct: advancedCorrect, total: 10 }
    });
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  const getSectionQuestions = () => {
    switch(section) {
      case 'basic': return enhancedQuestions.slice(0, 10);
      case 'intermediate': return enhancedQuestions.slice(10, 25);
      case 'advanced': return enhancedQuestions.slice(25);
      default: return enhancedQuestions.slice(0, 10);
    }
  };

  const getSectionIndex = () => {
    switch(section) {
      case 'basic': return 0;
      case 'intermediate': return 10;
      case 'advanced': return 25;
      default: return 0;
    }
  };

  if (isSubmitted && showAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-10">
              <div className="text-center mb-12">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="text-indigo-600" size={40} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4">Detailed Performance Analysis</h1>
                <p className="text-slate-600">Practice Test Results for {internship?.category}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Overall Score */}
                <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-8 border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Overall Score</h3>
                  <div className="text-center">
                    <div className={`text-6xl font-black mb-4 ${score >= 70 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {score}%
                    </div>
                    <div className={`px-6 py-2 rounded-full text-lg font-bold ${
                      score >= 70 ? 'bg-emerald-100 text-emerald-700' :
                      score >= 50 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {score >= 70 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Practice'}
                    </div>
                  </div>
                </div>

                {/* Section Breakdown */}
                <div className="lg:col-span-2 space-y-8">
                  <h3 className="text-xl font-bold text-slate-900">Section Performance</h3>
                  
                  <div className="space-y-6">
                    {/* Basic Section */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Zap className="text-emerald-600" size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">Basic Concepts</h4>
                            <p className="text-sm text-slate-500">Fundamental questions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">
                            {performanceStats.basic.correct}/{performanceStats.basic.total}
                          </div>
                          <div className="text-sm text-slate-500">
                            {Math.round((performanceStats.basic.correct / performanceStats.basic.total) * 100)}%
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-1000"
                          style={{ width: `${(performanceStats.basic.correct / performanceStats.basic.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Intermediate Section */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Target className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">Intermediate Level</h4>
                            <p className="text-sm text-slate-500">Application questions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">
                            {performanceStats.intermediate.correct}/{performanceStats.intermediate.total}
                          </div>
                          <div className="text-sm text-slate-500">
                            {Math.round((performanceStats.intermediate.correct / performanceStats.intermediate.total) * 100)}%
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-1000"
                          style={{ width: `${(performanceStats.intermediate.correct / performanceStats.intermediate.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Advanced Section */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Brain className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">Advanced Topics</h4>
                            <p className="text-sm text-slate-500">Expert-level questions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">
                            {performanceStats.advanced.correct}/{performanceStats.advanced.total}
                          </div>
                          <div className="text-sm text-slate-500">
                            {Math.round((performanceStats.advanced.correct / performanceStats.advanced.total) * 100)}%
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 transition-all duration-1000"
                          style={{ width: `${(performanceStats.advanced.correct / performanceStats.advanced.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 mb-10 border border-indigo-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Brain className="text-indigo-600" />
                  Personalized Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-3">Strengths</h4>
                    <ul className="space-y-2 text-slate-700">
                      {score >= 70 && <li className="flex items-center gap-2">✓ Strong fundamental understanding</li>}
                      {performanceStats.intermediate.correct >= 10 && <li className="flex items-center gap-2">✓ Good application skills</li>}
                      {performanceStats.advanced.correct >= 5 && <li className="flex items-center gap-2">✓ Solid advanced knowledge</li>}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-3">Areas to Improve</h4>
                    <ul className="space-y-2 text-slate-700">
                      {performanceStats.basic.correct < 8 && <li className="flex items-center gap-2">● Review basic concepts</li>}
                      {performanceStats.intermediate.correct < 10 && <li className="flex items-center gap-2">● Practice application questions</li>}
                      {performanceStats.advanced.correct < 5 && <li className="flex items-center gap-2">● Study advanced topics</li>}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Back to Results
                </button>
                <button
                  onClick={() => navigate(`/internship/${id}`)}
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-100 hover:shadow-2xl transition-all flex items-center gap-3"
                >
                  <ArrowRight size={24} />
                  Back to Internship
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const passed = score >= 50;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10 text-center">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {passed ? <Trophy size={48} /> : <AlertCircle size={48} />}
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">Practice Results</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-8">{internship?.category} Practice Test</p>
            
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl py-10 mb-8 border border-slate-100">
              <div className={`text-7xl font-black mb-4 ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>{score}%</div>
              <p className="text-slate-500 font-medium">Practice Score</p>
              <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {passed ? 'Ready for Real Test' : 'Needs More Practice'}
              </div>
            </div>

            <div className="text-slate-600 mb-10 leading-relaxed font-medium">
              {passed 
                ? "Great job! You're prepared for the real assessment. Consider taking the paid test for interview opportunities." 
                : "Keep practicing! Focus on weaker areas before attempting the real test."}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="text-2xl font-bold text-slate-900">{performanceStats.basic.correct}/{performanceStats.basic.total}</div>
                <div className="text-sm text-slate-500">Basic Concepts</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="text-2xl font-bold text-slate-900">{performanceStats.intermediate.correct}/{performanceStats.intermediate.total}</div>
                <div className="text-sm text-slate-500">Intermediate</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowAnalysis(true)}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all flex-1 flex items-center justify-center gap-3"
              >
                <BarChart3 size={20} />
                View Detailed Analysis
              </button>
              <button
                onClick={() => navigate(`/internship/${id}`)}
                className="bg-white text-slate-700 border-2 border-slate-200 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex-1 flex items-center justify-center gap-3"
              >
                Back to Internship
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionQuestions = getSectionQuestions();
  const baseIndex = getSectionIndex();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">{internship?.category} Practice</h2>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Enhanced Practice Mode</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Section Selector */}
              <div className="hidden md:flex items-center gap-2">
                {(['basic', 'intermediate', 'advanced'] as const).map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      setSection(sec);
                      setCurrentQuestion(0);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      section === sec
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 font-mono text-xl font-bold transition-all ${
                timeLeft < 300 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-slate-50 border-slate-100 text-slate-700'
              }`}>
                <Timer size={20} />
                <span>{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</span>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>{section.charAt(0).toUpperCase() + section.slice(1)} Section</span>
              <span>{currentQuestion + 1}/{currentSectionQuestions.length}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" 
                style={{ width: `${((currentQuestion + 1) / currentSectionQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Basic: {performanceStats.basic.correct}/{performanceStats.basic.total}</span>
              <span>Intermediate: {performanceStats.intermediate.correct}/{performanceStats.intermediate.total}</span>
              <span>Advanced: {performanceStats.advanced.correct}/{performanceStats.advanced.total}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 md:p-12">
          {/* Question Difficulty Badge */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-bold">
                Practice Question
              </div>
              <div className="text-sm font-bold text-slate-500">
                Section: {section.charAt(0).toUpperCase() + section.slice(1)}
              </div>
            </div>
            <div className="text-sm font-bold text-slate-700">
              Question {currentQuestion + 1} of {currentSectionQuestions.length}
            </div>
          </div>

          {/* Question Text with Enhanced Styling */}
          <div className="mb-12">
            <div className="text-lg text-slate-500 mb-4 font-medium">Read the question carefully:</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {currentSectionQuestions[currentQuestion].text}
            </h3>
            <div className="mt-6 text-sm text-slate-500 italic">
              Select the best answer from the options below.
            </div>
          </div>

          {/* Enhanced Options Grid */}
          <div className="grid gap-4 mb-12">
            {currentSectionQuestions[currentQuestion].options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[baseIndex + currentQuestion] = index;
                  setAnswers(newAnswers);
                }}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-start gap-6 hover:scale-[1.02] ${
                  answers[baseIndex + currentQuestion] === index
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md'
                    : 'border-slate-100 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 transition-all ${
                  answers[baseIndex + currentQuestion] === index
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1">
                  <span className={`text-lg font-medium ${
                    answers[baseIndex + currentQuestion] === index ? 'text-blue-900' : 'text-slate-700'
                  }`}>
                    {option}
                  </span>
                </div>
                {answers[baseIndex + currentQuestion] === index && (
                  <div className="shrink-0">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className={`px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold flex items-center gap-2 transition-all ${
                  currentQuestion === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-slate-50 hover:border-slate-300 hover:scale-105'
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              
              {/* Mobile Section Selector */}
              <select
                value={section}
                onChange={(e) => {
                  setSection(e.target.value as any);
                  setCurrentQuestion(0);
                }}
                className="md:hidden px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold text-sm outline-none"
              >
                <option value="basic">Basic Section</option>
                <option value="intermediate">Intermediate Section</option>
                <option value="advanced">Advanced Section</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  // Mark for review functionality
                  const newAnswers = [...answers];
                  if (newAnswers[baseIndex + currentQuestion] === -1) {
                    newAnswers[baseIndex + currentQuestion] = -2; // -2 for marked for review
                    setAnswers(newAnswers);
                  }
                }}
                className="px-6 py-3 border-2 border-amber-200 text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-all"
              >
                Mark for Review
              </button>
              
              {currentQuestion === currentSectionQuestions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-emerald-100 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                >
                  <CheckCircle2 size={24} />
                  Submit Practice Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-10 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-100 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                >
                  Next Question
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Question Navigator */}
          <div className="mt-12">
            <div className="text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
              <span>Question Navigator</span>
              <span className="text-slate-500">Click any number to jump</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {answers.slice(baseIndex, baseIndex + currentSectionQuestions.length).map((answer, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all relative hover:scale-110 ${
                    index === currentQuestion
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-110 shadow-md'
                      : answer === -1
                      ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      : answer === -2
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {index + 1}
                  {answer !== -1 && answer !== -2 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                  )}
                  {answer === -2 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-100 rounded"></div>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-100 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-100 rounded"></div>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                <span>Current</span>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Brain className="text-indigo-600 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Practice Tips</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Use all sections (Basic, Intermediate, Advanced) to test comprehensive knowledge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Mark difficult questions for review and return to them later</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Aim for 70%+ score before attempting the real assessment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
            section === 'basic' 
              ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' 
              : 'bg-white border-slate-100 hover:border-blue-100'
          }`} onClick={() => { setSection('basic'); setCurrentQuestion(0); }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Basic Concepts</h4>
                <p className="text-sm text-slate-500">10 questions</p>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Fundamental knowledge and core concepts
            </div>
          </div>

          <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
            section === 'intermediate' 
              ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' 
              : 'bg-white border-slate-100 hover:border-blue-100'
          }`} onClick={() => { setSection('intermediate'); setCurrentQuestion(0); }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Target className="text-cyan-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Intermediate</h4>
                <p className="text-sm text-slate-500">15 questions</p>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Application and problem-solving questions
            </div>
          </div>

          <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
            section === 'advanced' 
              ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' 
              : 'bg-white border-slate-100 hover:border-blue-100'
          }`} onClick={() => { setSection('advanced'); setCurrentQuestion(0); }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Brain className="text-indigo-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Advanced</h4>
                <p className="text-sm text-slate-500">10 questions</p>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Expert-level and scenario-based questions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEngine;
