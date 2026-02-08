import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { Clock, CheckCircle, Loader2, ArrowRight, ShieldAlert, Cpu, AlertCircle, BarChart3, Target, Trophy, Brain, Timer, ChevronRight, ChevronLeft } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);



  const sendInterviewEmail = async (user: any, internship: any, score: number) => {
  // This would integrate with your email service (like SendGrid, Resend, etc.)
  // For demo purposes, we'll simulate with localStorage
  
  const interviewData = {
    internshipId: internship.id,
    internshipTitle: internship.title,
    company: internship.company,
    score: score,
    interviewDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours from now
    interviewLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`,
    interviewer: "Mr. Arjun Sharma",
    companyEmail: "hiring@arjunai.com",
    status: "scheduled"
  };

  // Store in localStorage for demo
  localStorage.setItem(`interview_${internship.id}`, JSON.stringify(interviewData));
  
  // Update user's completed assessments
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const updatedAssessments = [
    ...(userData.completedAssessments || []),
    {
      internshipId: internship.id,
      internshipTitle: internship.title,
      score: score,
      passed: score >= 50,
      date: new Date().toISOString(),
      interviewScheduled: score >= 60,
      interviewDetails: score >= 60 ? {
        date: interviewData.interviewDate,
        time: "10:00 AM - 11:00 AM",
        link: interviewData.interviewLink,
        company: internship.company,
        interviewer: "Mr. Arjun Sharma (CTO)"
      } : undefined
    }
  ];
  
  userData.completedAssessments = updatedAssessments;
  localStorage.setItem("user", JSON.stringify(userData));
  
  // Simulate email sending
  console.log(`Email sent to ${user.email} with interview details`);
  
  return interviewData;
};

// In the handleSubmit function, add this logic after calculating score:
if (score >= 60) {
  const interviewData = sendInterviewEmail(user, internship, score);
  
  // Update the result display section for passed candidates:
  // Replace the existing passed section with:
  if (passed) {
    const hasInterview = score >= 60;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10 text-center">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${
              hasInterview ? 'bg-gradient-to-r from-emerald-100 to-green-100' : 'bg-emerald-100'
            }`}>
              {hasInterview ? '🎉' : '🏆'}
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {hasInterview ? 'Congratulations! 🎊' : 'Well Done!'}
            </h2>
            
            {hasInterview ? (
              <>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-8">
                  {internship?.category} Professional Assessment - PASSED WITH FLYING COLORS!
                </p>
                  
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl py-10 mb-8 border border-emerald-100">
                  <div className="text-7xl font-black mb-4 text-emerald-600">{score}%</div>
                  <p className="text-emerald-700 font-medium">Outstanding Performance!</p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    <CheckCircle2 size={16} />
                    Interview Scheduled with {internship?.company}
                  </div>
                </div>

                <div className="text-slate-600 mb-10 leading-relaxed font-medium space-y-4">
                  <p>🎯 <strong>You've qualified for direct interview!</strong></p>
                  <p>📧 <strong>Interview details will be emailed to you shortly</strong> at {user.email}</p>
                  <p>⏰ <strong>Expected timeline:</strong> Interview link within 24-48 hours</p>
                  <p>👨‍💼 <strong>Interviewer:</strong> Senior team from {internship?.company}</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 justify-center">
                    <MessageSquare size={20} />
                    What happens next?
                  </h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>1. You'll receive a confirmation email from hiring@arjunai.com</p>
                    <p>2. Interview will be scheduled based on your availability</p>
                    <p>3. Prepare your portfolio and previous work samples</p>
                    <p>4. Check your spam folder if you don't see the email</p>
                  </div>
                </div>
              </>
            ) : (
              // ... existing passed (50-59%) content
            )}

  // Enhanced Tough Questions Database (25 questions per category)
  const TOUGH_QUESTION_BANK: Record<string, any[]> = {
    "Python": [
      { 
        text: 'What is the time complexity of finding an element in a Python dictionary using hash table implementation?', 
        options: ['O(1) average, O(n) worst-case', 'O(log n)', 'O(n)', 'O(n²)'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which Python memory management technique uses reference counting along with generational garbage collection?', 
        options: ['CPython', 'PyPy', 'Jython', 'IronPython'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the Global Interpreter Lock (GIL) in CPython primarily responsible for?', 
        options: ['Thread safety for CPython internal structures', 'Memory allocation', 'File I/O operations', 'Network socket management'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'In Python metaclasses, which method is called when a class is created?', 
        options: ['__new__', '__init__', '__call__', '__prepare__'], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What does the "@singledispatch" decorator in functools module allow?', 
        options: ['Function overloading based on argument type', 'Singleton pattern implementation', 'Memory view operations', 'Asynchronous function dispatch'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which Python data structure maintains insertion order as of Python 3.7?', 
        options: ['dict', 'set', 'list', 'tuple'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of __slots__ in Python classes?', 
        options: ['Memory optimization by preventing dict creation', 'Thread synchronization', 'Method overloading', 'Attribute validation'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which algorithm does Python use for sorting in the sorted() function?', 
        options: ['Timsort', 'Quicksort', 'Mergesort', 'Heapsort'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between deepcopy and copy in the copy module?', 
        options: ['deepcopy copies nested objects recursively', 'copy is faster for all cases', 'deepcopy only works for lists', 'copy creates shallow copies only'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which Python construct is used for context management?', 
        options: ['with statement', 'try-except', 'for loop', 'while loop'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'What does the yield keyword do in Python?', 
        options: ['Creates a generator function', 'Returns from function', 'Raises an exception', 'Stops iteration'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which module provides support for weak references in Python?', 
        options: ['weakref', 'gc', 'sys', 'collections'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the purpose of the @property decorator?', 
        options: ['Getter method for class attributes', 'Method overloading', 'Class inheritance', 'Multiple dispatch'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which Python feature allows function argument unpacking?', 
        options: ['*args and **kwargs', 'map and filter', 'lambda functions', 'list comprehensions'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is method resolution order (MRO) in Python?', 
        options: ['Order in which base classes are searched for a method', 'Order of method execution', 'Memory allocation order', 'Thread execution order'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which Python construct is used for type hints?', 
        options: ['Annotations introduced in PEP 484', 'Docstrings', 'Comments', 'Decorators'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What does the async/await syntax enable?', 
        options: ['Asynchronous programming', 'Parallel execution', 'Multithreading', 'Multiprocessing'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which Python data type is immutable and hashable?', 
        options: ['tuple', 'list', 'dict', 'set'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'What is the purpose of the __enter__ and __exit__ methods?', 
        options: ['Context manager protocol', 'Iterator protocol', 'Descriptor protocol', 'Sequence protocol'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which Python module provides an ordered dictionary?', 
        options: ['collections', 'itertools', 'functools', 'operator'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'What is a Python descriptor?', 
        options: ['An object attribute with binding behavior', 'A file descriptor', 'A network socket', 'A database connection'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which algorithm does Python use for decimal arithmetic?', 
        options: ['IEEE 754 standard', 'Binary-coded decimal', 'Floating point', 'Fixed point'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the __call__ method?', 
        options: ['Allows an instance to be called as a function', 'Constructor', 'Destructor', 'String representation'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which Python feature allows dynamic attribute access?', 
        options: ['__getattr__', '__init__', '__new__', '__del__'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What does the super() function do?', 
        options: ['Calls a method from parent class', 'Creates superclass', 'Inherits attributes', 'Overrides method'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      }
    ],
    "Web Development": [
      { 
        text: 'What is the React Fiber architecture primarily designed to improve?', 
        options: ['Incremental rendering and scheduling', 'Bundle size optimization', 'Server-side rendering', 'State management'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'In the Virtual DOM diffing algorithm, what is the time complexity for tree comparison?', 
        options: ['O(n³) reduced to O(n) with heuristic', 'O(log n)', 'O(n²)', 'O(n log n)'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What does the React Concurrent Mode enable?', 
        options: ['Interruptible rendering', 'Automatic code splitting', 'Static site generation', 'Bundle optimization'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which CSS property enables hardware acceleration for animations?', 
        options: ['transform: translateZ(0)', 'animation: hardware-accelerate', 'will-change: transform', 'Both A and C'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the React Suspense component?', 
        options: ['Handle async operations and loading states', 'Error boundary', 'Context provider', 'Memoization'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which HTTP/2 feature significantly improves web performance?', 
        options: ['Multiplexing', 'Header compression', 'Server push', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the critical rendering path in browser optimization?', 
        options: ['Sequence of steps browser takes to render page', 'CSS optimization technique', 'JavaScript execution path', 'Network request waterfall'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which React Hook is used for performance optimization?', 
        options: ['useMemo', 'useEffect', 'useState', 'useContext'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between cookies, localStorage, and sessionStorage?', 
        options: ['Storage duration and accessibility', 'Encryption methods', 'Size limitations', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'Which Webpack feature enables code splitting?', 
        options: ['Dynamic imports', 'Tree shaking', 'Module federation', 'Hot module replacement'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the Content Security Policy (CSP) header?', 
        options: ['Prevent XSS attacks', 'Improve performance', 'Enable HTTPS', 'Cache control'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which JavaScript feature is used for handling asynchronous operations?', 
        options: ['Promises and async/await', 'Callbacks only', 'Observables', 'Generators'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between margin and padding in CSS?', 
        options: ['Margin is outside border, padding is inside', 'Both are same', 'Padding affects layout, margin does not', 'Margin is for spacing, padding for background'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'Which algorithm does React use for reconciliation?', 
        options: ['Diffing algorithm', 'Binary search', 'Quick sort', 'Depth-first search'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the Intersection Observer API?', 
        options: ['Detect element visibility', 'Measure performance', 'Handle scroll events', 'Animate elements'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which CSS feature enables responsive design?', 
        options: ['Media queries', 'Flexbox', 'Grid', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Easy'
      },
      { 
        text: 'What is the difference between HTTP/1.1 and HTTP/2?', 
        options: ['Multiplexing in HTTP/2', 'Header compression', 'Binary protocol', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'Which JavaScript method is used for deep copying an object?', 
        options: ['structuredClone() or custom recursion', 'Object.assign()', 'Spread operator', 'JSON.parse(JSON.stringify())'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the React Error Boundary?', 
        options: ['Catch JavaScript errors in component tree', 'Handle network errors', 'Validate props', 'Monitor performance'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which browser API enables offline functionality?', 
        options: ['Service Workers', 'Web Storage', 'IndexedDB', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between SSR and CSR?', 
        options: ['Server-side vs Client-side rendering', 'Static vs Dynamic sites', 'Performance optimization techniques', 'Caching strategies'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which CSS feature enables animations?', 
        options: ['@keyframes and animation property', 'transition', 'transform', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Easy'
      },
      { 
        text: 'What is the purpose of the React Portal?', 
        options: ['Render children into a DOM node outside parent hierarchy', 'Create modal dialogs', 'Handle routing', 'Manage state'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which JavaScript feature prevents variable hoisting?', 
        options: ['let and const', 'var', 'function declarations', 'class declarations'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between authentication and authorization?', 
        options: ['Authentication verifies identity, authorization checks permissions', 'Both are same', 'Authentication is for APIs, authorization for UI', 'Authorization verifies identity, authentication checks permissions'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      }
    ],
    "Data Science": [
      { 
        text: 'Which regularization technique adds absolute value of coefficients as penalty term?', 
        options: ['Lasso (L1)', 'Ridge (L2)', 'Elastic Net', 'Dropout'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the bias-variance tradeoff in machine learning?', 
        options: ['Tradeoff between model complexity and generalization', 'Feature selection technique', 'Data preprocessing step', 'Model evaluation metric'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which algorithm uses gradient boosting with decision trees?', 
        options: ['XGBoost', 'Random Forest', 'SVM', 'K-means'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the ROC curve?', 
        options: ['Evaluate binary classification performance', 'Measure regression accuracy', 'Cluster evaluation', 'Feature importance'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which dimensionality reduction technique preserves variance?', 
        options: ['PCA', 't-SNE', 'UMAP', 'LDA'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is cross-validation used for?', 
        options: ['Model evaluation and hyperparameter tuning', 'Data cleaning', 'Feature engineering', 'Data visualization'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which metric is used for imbalanced classification?', 
        options: ['F1-score', 'Accuracy', 'MSE', 'R-squared'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between bagging and boosting?', 
        options: ['Bagging uses parallel training, boosting sequential', 'Both are same', 'Bagging for regression, boosting for classification', 'Boosting uses parallel training, bagging sequential'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which neural network architecture is used for sequence data?', 
        options: ['RNN/LSTM', 'CNN', 'MLP', 'Autoencoder'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the confusion matrix?', 
        options: ['Evaluate classification performance', 'Measure correlation', 'Feature selection', 'Data transformation'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'Which algorithm minimizes the hinge loss?', 
        options: ['SVM', 'Logistic Regression', 'Linear Regression', 'Decision Tree'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is feature engineering?', 
        options: ['Creating new features from existing data', 'Removing features', 'Normalizing data', 'Splitting dataset'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which technique handles missing values?', 
        options: ['Imputation', 'Deletion', 'Prediction', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between supervised and unsupervised learning?', 
        options: ['Supervised uses labeled data, unsupervised does not', 'Both use labeled data', 'Unsupervised uses labeled data, supervised does not', 'Difference in algorithm complexity'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'Which metric measures regression model performance?', 
        options: ['RMSE', 'Accuracy', 'Precision', 'Recall'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is overfitting in machine learning?', 
        options: ['Model performs well on training but poorly on test data', 'Model performs poorly on both', 'Model too simple', 'Insufficient data'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which technique reduces model complexity?', 
        options: ['Regularization', 'Feature engineering', 'Data augmentation', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the purpose of the activation function in neural networks?', 
        options: ['Introduce non-linearity', 'Normalize input', 'Reduce parameters', 'Speed up training'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which algorithm uses the gradient descent optimization?', 
        options: ['Backpropagation in neural networks', 'Decision trees', 'K-means', 'KNN'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the difference between batch, stochastic, and mini-batch gradient descent?', 
        options: ['Number of samples used per update', 'Learning rate differences', 'Convergence speed', 'All of the above'], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'Which technique is used for feature selection?', 
        options: ['Recursive Feature Elimination', 'Principal Component Analysis', 'Both A and B', 'Neither A nor B'], 
        correctAnswer: 2,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the purpose of the learning rate in gradient descent?', 
        options: ['Control step size during optimization', 'Regularization parameter', 'Number of iterations', 'Batch size'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which evaluation technique uses k-fold cross-validation?', 
        options: ['Model validation', 'Feature selection', 'Hyperparameter tuning', 'All of the above'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between precision and recall?', 
        options: ['Precision measures correct positive predictions, recall measures actual positives found', 'Both measure same thing', 'Precision for regression, recall for classification', 'Recall measures correct predictions, precision measures found positives'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which algorithm is based on Bayes theorem?', 
        options: ['Naive Bayes', 'Decision Tree', 'Random Forest', 'SVM'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      }
    ],
    "General": [
      { 
        text: 'What is the time complexity of binary search algorithm?', 
        options: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'Which data structure uses LIFO (Last In First Out) principle?', 
        options: ['Stack', 'Queue', 'Array', 'Linked List'], 
        correctAnswer: 0,
        difficulty: 'Easy'
      },
      { 
        text: 'What is the purpose of a hash function?', 
        options: ['Map data to fixed-size values', 'Sort data', 'Search data', 'Compress data'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'Which algorithm has worst-case time complexity O(n²)?', 
        options: ['Bubble Sort', 'Merge Sort', 'Quick Sort (worst case)', 'Both A and C'], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the difference between TCP and UDP?', 
        options: ['TCP is connection-oriented, UDP is connectionless', 'Both are same', 'UDP is reliable, TCP is unreliable', 'TCP is faster than UDP'], 
        correctAnswer: 0,
        difficulty: 'Medium'
      }
    ]
  };

  // Select questions based on internship category, fallback to General
  const questions = TOUGH_QUESTION_BANK[internship?.category || "Python"] || TOUGH_QUESTION_BANK["Python"];
  const selectedQuestions = questions.slice(0, 25); // Take exactly 25 questions

  useEffect(() => {
    const verifyGatekeeper = () => {
      const paymentData = localStorage.getItem(`payment_${id}`);
      const accessToken = localStorage.getItem(`test_access_token_${id}`);

      if (!paymentData || !accessToken) {
        navigate(`/payment/${id}`, { replace: true });
        return;
      }
      setIsAuthorized(true);
      setLoading(false);
    };

    setTimeout(verifyGatekeeper, 1500);
  }, [id, navigate]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(selectedQuestions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes for tough assessment
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [detailedResults, setDetailedResults] = useState<{
    correct: number;
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  }>({
    correct: 0,
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  });

  useEffect(() => {
    if (!isAuthorized || isSubmitted || showInstructions) return;
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
  }, [isAuthorized, isSubmitted, showInstructions]);

  const handleSubmit = () => {
    let correct = 0;
    let easyCorrect = 0, easyTotal = 0;
    let mediumCorrect = 0, mediumTotal = 0;
    let hardCorrect = 0, hardTotal = 0;

    selectedQuestions.forEach((q, i) => {
      // Count by difficulty
      if (q.difficulty === 'Easy') {
        easyTotal++;
        if (answers[i] === q.correctAnswer) {
          correct++;
          easyCorrect++;
        }
      } else if (q.difficulty === 'Medium') {
        mediumTotal++;
        if (answers[i] === q.correctAnswer) {
          correct++;
          mediumCorrect++;
        }
      } else if (q.difficulty === 'Hard') {
        hardTotal++;
        if (answers[i] === q.correctAnswer) {
          correct++;
          hardCorrect++;
        }
      }
    });

    const finalScore = Math.round((correct / selectedQuestions.length) * 100);
    setScore(finalScore);
    setDetailedResults({
      correct,
      easy: { correct: easyCorrect, total: easyTotal },
      medium: { correct: mediumCorrect, total: mediumTotal },
      hard: { correct: hardCorrect, total: hardTotal }
    });
    setIsSubmitted(true);
    localStorage.removeItem(`test_access_token_${id}`);
  };

  const startTest = () => {
    setShowInstructions(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
        <p className="text-slate-900 font-black text-2xl mb-2">Loading Professional Assessment</p>
        <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">Preparing 25 Tough Questions...</p>
      </div>
    </div>
  );

  if (!isAuthorized) return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <p className="text-slate-900 font-black text-xl mb-4">Access Denied</p>
        <p className="text-slate-600">Please complete payment to access this assessment</p>
      </div>
    </div>
  );

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <Brain className="text-indigo-600" size={40} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Professional Skill Assessment</h1>
              <p className="text-slate-600 text-lg">For {internship?.title} Position</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="text-indigo-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">25 Tough Questions</h3>
                <p className="text-sm text-slate-600">Industry-level difficulty with 50% pass threshold</p>
              </div>

              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Timer className="text-blue-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">30 Minute Timer</h3>
                <p className="text-sm text-slate-600">1.2 minutes per question average</p>
              </div>

              <div className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="text-emerald-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Detailed Analysis</h3>
                <p className="text-sm text-slate-600">Performance breakdown by difficulty level</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 mb-10 border border-indigo-100">
              <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                <AlertCircle className="text-indigo-600" size={24} />
                Important Instructions
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span>This test contains <strong>25 extremely difficult questions</strong> specific to {internship?.category}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span><strong>Passing threshold is 50%</strong> (13+ correct answers) to proceed to interview</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span><strong>Timer is strict:</strong> 30 minutes total, no extra time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span>Questions are <strong>category-specific</strong> and test deep domain knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span>Results are <strong>final and cannot be retaken</strong> for 30 days</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={startTest}
                className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
              >
                <Brain size={24} />
                Start Professional Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const passed = score >= 50;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10">
            <div className="text-center mb-10">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {passed ? <Trophy size={48} /> : <AlertCircle size={48} />}
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                {passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-8">
                {internship?.category} Professional Assessment
              </p>
              
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 mb-6">
                <Target size={16} />
                <span className="text-sm font-bold text-slate-700">Passing Score: 50%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Overall Performance</h3>
                <div className="text-center">
                  <div className={`text-7xl font-black mb-4 ${passed ? 'text-emerald-600' : 'text-red-600'}`}>{score}%</div>
                  <div className={`text-lg font-bold px-6 py-2 rounded-full ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {passed ? 'PASSED - Eligible for Interview' : 'FAILED - Needs Improvement'}
                  </div>
                  <p className="text-slate-600 mt-4">{detailedResults.correct}/25 Correct Answers</p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Difficulty Analysis</h3>
                
                <div className="space-y-4">
                  {/* Hard Questions */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                      <span>Hard Questions</span>
                      <span>{detailedResults.hard.correct}/{detailedResults.hard.total}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 transition-all duration-1000"
                        style={{ width: `${(detailedResults.hard.correct / detailedResults.hard.total) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Medium Questions */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                      <span>Medium Questions</span>
                      <span>{detailedResults.medium.correct}/{detailedResults.medium.total}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-1000"
                        style={{ width: `${(detailedResults.medium.correct / detailedResults.medium.total) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Easy Questions */}
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                      <span>Easy Questions</span>
                      <span>{detailedResults.easy.correct}/{detailedResults.easy.total}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-1000"
                        style={{ width: `${(detailedResults.easy.correct / detailedResults.easy.total) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-600">
                    {passed 
                      ? '✓ Your performance qualifies for direct interview scheduling'
                      : '✗ Focus on improving your skills, especially in difficult topics'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {passed ? (
                <>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    Schedule Interview
                  </button>
                  <button className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                    Download Certificate
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate(`/test/practice/${id}`)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    Practice More
                  </button>
                  <button 
                    onClick={() => navigate('/internships')}
                    className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Browse Internships
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Secure Test Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Cpu size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">{internship?.category} Pro Assessment</h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Candidate:</span>
                  <span className="font-bold text-indigo-600">{user?.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm font-bold text-slate-700">Question</div>
                <div className="text-xl font-black text-indigo-600">{currentQuestion + 1}/25</div>
              </div>
              
              <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 font-mono text-xl font-bold transition-all ${
                timeLeft < 300 
                  ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
                  : 'bg-slate-50 border-slate-100 text-slate-700'
              }`}>
                <Clock size={20} />
                <span>{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentQuestion + 1) / 25) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500" 
                style={{ width: `${((currentQuestion + 1) / 25) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 md:p-12">
          {/* Question Header */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                selectedQuestions[currentQuestion].difficulty === 'Easy' 
                  ? 'bg-emerald-100 text-emerald-700'
                  : selectedQuestions[currentQuestion].difficulty === 'Medium'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {selectedQuestions[currentQuestion].difficulty}
              </div>
              <div className="text-sm font-bold text-slate-500">
                Question {currentQuestion + 1} of 25
              </div>
            </div>
            
            <div className="text-sm font-bold text-slate-700">
              Estimated time: 1.2 minutes
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 leading-tight">
            {selectedQuestions[currentQuestion].text}
          </h3>

          {/* Options */}
          <div className="grid gap-4 mb-12">
            {selectedQuestions[currentQuestion].options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestion] = index;
                  setAnswers(newAnswers);
                }}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-start gap-6 ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                  answers[currentQuestion] === index
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`text-lg font-medium ${answers[currentQuestion] === index ? 'text-indigo-900' : 'text-slate-700'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className={`px-8 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold flex items-center gap-2 transition-all ${
                currentQuestion === 0 
                  ? 'opacity-0 cursor-default' 
                  : 'hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            {currentQuestion === 24 ? (
              <button
                onClick={handleSubmit}
                className="px-12 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-lg shadow-xl shadow-emerald-100 hover:shadow-2xl hover:scale-105 transition-all"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-12 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-100 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
              >
                Next Question
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="mt-12">
            <div className="text-sm font-bold text-slate-700 mb-4">Question Navigator</div>
            <div className="flex flex-wrap gap-2">
              {answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    index === currentQuestion
                      ? 'bg-indigo-600 text-white scale-110'
                      : answer === -1
                      ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {index + 1}
                  {answer !== -1 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-100 rounded"></div>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-100 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                <span>Current</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Professional Assessment Notice</h4>
              <p className="text-slate-700">
                This test is designed to be challenging. A 50% score is required to proceed to interview. 
                Use your time wisely - you cannot pause or restart once submitted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTestEngine;
