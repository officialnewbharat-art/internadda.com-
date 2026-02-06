import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../constants';

interface TestEngineProps {
  type: 'practice' | 'real';
}

const TestEngine: React.FC<TestEngineProps> = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins
  const [warningCount, setWarningCount] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTestStarted) return;

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
      if (document.hidden) {
        setWarningCount(prev => prev + 1);
        alert("TAB SWITCH DETECTED! Warning " + (warningCount + 1) + "/3. Switching again will auto-submit.");
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && type === 'real') {
        e.preventDefault();
        alert("Exiting fullscreen is not allowed during the real test.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isTestStarted, warningCount, type]);

  useEffect(() => {
    if (warningCount >= 3) {
      alert("Test auto-submitted due to multiple tab switching violations.");
      handleSubmit();
    }
  }, [warningCount]);

  const handleSubmit = () => {
    let score = 0;
    MOCK_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    
    const finalScore = (score / MOCK_QUESTIONS.length) * 100;
    navigate(`/result/${id}?score=${finalScore}&type=${type}`);
  };

  const startTest = () => {
    if (type === 'real' && !document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error("Error enabling fullscreen", err);
      });
    }
    setIsTestStarted(true);
  };

  if (!isTestStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center space-y-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-3xl">
            {type === 'real' ? '🔒' : '✎'}
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            {type === 'real' ? 'Secure Skill Assessment' : 'Practice Test'}
          </h2>
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-slate-500">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="block text-indigo-600 text-xl font-bold mb-1">25</span>
              Questions
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="block text-indigo-600 text-xl font-bold mb-1">30m</span>
              Duration
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="block text-indigo-600 text-xl font-bold mb-1">50%</span>
              Passing Score
            </div>
          </div>
          <div className="text-left bg-amber-50 p-6 rounded-2xl border border-amber-100 space-y-3">
            <h4 className="font-bold text-amber-900 flex items-center gap-2">
              ⚠️ Anti-Cheat Instructions:
            </h4>
            <ul className="text-sm text-amber-800 space-y-2 list-disc pl-5">
              <li>Do not switch tabs or windows.</li>
              <li>Test will automatically submit after 3 warnings.</li>
              <li>Ensure a stable internet connection.</li>
              <li>The test will open in full-screen mode.</li>
            </ul>
          </div>
          <button 
            onClick={startTest}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const currentQ = MOCK_QUESTIONS[currentIdx];
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm md:text-base font-bold">IA</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-slate-700 text-sm">Skill Test: {id}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border-2 ${timeLeft < 300 ? 'border-red-500 text-red-600 animate-pulse' : 'border-slate-200 text-slate-700'}`}>
            <span className="text-xs md:text-sm">⏱</span>
            <span className="font-mono font-bold text-sm md:text-base">{formatTime(timeLeft)}</span>
          </div>
          
          <button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-md hover:shadow-lg"
          >
            Finish
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row p-4 md:p-8 gap-4 md:gap-8 max-w-7xl mx-auto w-full">
        <div className="flex-grow space-y-6">
          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm min-h-[400px] md:min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                Q{currentIdx + 1}/25
              </span>
              {warningCount > 0 && (
                <span className="text-red-500 text-xs font-bold animate-pulse">
                  ⚠ {warningCount}/3
                </span>
              )}
            </div>
            
            <h3 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight mb-6 md:mb-10">
              {currentQ.text}
            </h3>

            <div className="space-y-3 md:space-y-4 flex-grow">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: i }))}
                  className={`w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all group flex items-center gap-3 md:gap-4 ${
                    answers[currentQ.id] === i
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 md:ring-4 ring-indigo-50'
                    : 'border-slate-100 hover:border-indigo-200 bg-white'
                  }`}
                >
                  <span className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-bold text-xs md:text-sm transition-colors ${
                    answers[currentQ.id] === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`text-sm md:text-base font-medium ${answers[currentQ.id] === i ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 md:mt-auto pt-6 md:pt-12 flex justify-between items-center">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="text-slate-400 font-bold disabled:opacity-30 hover:text-indigo-600 flex items-center gap-1 md:gap-2 text-sm md:text-base"
              >
                ← Prev
              </button>
              
              <div className="flex gap-1 md:hidden">
                {MOCK_QUESTIONS.slice(0, 5).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentIdx 
                        ? 'bg-indigo-600' 
                        : answers[MOCK_QUESTIONS[idx].id] !== undefined 
                          ? 'bg-emerald-500' 
                          : 'bg-slate-200'
                    }`}
                  />
                ))}
                {MOCK_QUESTIONS.length > 5 && (
                  <div className="text-xs text-slate-400">+{MOCK_QUESTIONS.length - 5}</div>
                )}
              </div>
              
              <button
                disabled={currentIdx === MOCK_QUESTIONS.length - 1}
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="bg-slate-100 text-slate-700 px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl font-bold hover:bg-indigo-100 hover:text-indigo-600 transition-colors disabled:opacity-30 text-sm md:text-base"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-2 text-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">📊</span>
              </div>
              <span className="text-sm font-medium">Question Palette</span>
            </button>
            
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {isPaletteOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Question Palette</h3>
              <button onClick={() => setIsPaletteOpen(false)} className="text-slate-500">✕</button>
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              {MOCK_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setIsPaletteOpen(false);
                  }}
                  className={`aspect-square rounded-xl text-xs font-bold transition-all ${
                    currentIdx === idx 
                      ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-100'
                      : answers[q.id] !== undefined
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Make sure this line is at the end
export default TestEngine;
