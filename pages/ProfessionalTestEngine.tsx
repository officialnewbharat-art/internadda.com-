import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';
import { Clock, CheckCircle, Loader2, ArrowRight, ShieldAlert, Cpu, AlertCircle, BarChart3, Target, Trophy, Brain, Timer, ChevronRight, ChevronLeft, MessageSquare, Database, Calendar } from 'lucide-react';

const ProfessionalTestEngine: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);

  // COMPLETELY DIFFERENT TOUGH QUESTIONS FOR EACH CATEGORY
  const TOUGH_QUESTION_BANK: Record<string, any[]> = {
    "Python": [
      { 
        text: 'In CPython, how does the garbage collector handle reference cycles with __del__ methods?', 
        options: [
          'Raises RuntimeError and skips collection',
          'Moves object to gc.garbage list',
          'Forcibly breaks cycle ignoring __del__',
          'Uses weakref to collect anyway'
        ], 
        correctAnswer: 1,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism by which Python\'s descriptor protocol intercepts attribute access?', 
        options: [
          'Through __getattribute__ method lookup chain',
          'Using __dict__ namespace modification',
          'Via __slots__ attribute resolution',
          'Through MRO-based attribute search'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s Global Interpreter Lock affect CPU-bound multithreaded programs?', 
        options: [
          'Allows only one thread to execute Python bytecode at a time',
          'Prevents threads from accessing shared memory',
          'Forces context switching every 100 bytecodes',
          'Limits thread creation to available CPU cores'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm used by Python\'s sorted() function for worst-case optimization?', 
        options: [
          'Timsort - adaptive merge sort derived from merge sort and insertion sort',
          'Introsort - hybrid of quicksort, heapsort, and insertion sort',
          'Patience sorting with binary search tree optimization',
          'Block sort using in-place merging techniques'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s memory allocator (pymalloc) reduce fragmentation for small objects?', 
        options: [
          'Uses arenas, pools, and blocks with size classes',
          'Implements buddy system allocation',
          'Uses slab allocation with color alignment',
          'Employs segregated free lists with best-fit'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact behavior of Python\'s method resolution order (MRO) in diamond inheritance?', 
        options: [
          'Follows C3 linearization algorithm',
          'Uses depth-first left-to-right traversal',
          'Implements breadth-first search',
          'Randomizes to avoid diamond problem'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s asyncio event loop handle thousands of concurrent connections?', 
        options: [
          'Using non-blocking I/O with selector module and callbacks',
          'Through green threads and cooperative multitasking',
          'Via kernel threads with thread pool',
          'Using multiprocessing with shared memory'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of Python\'s import system for preventing duplicate imports?', 
        options: [
          'sys.modules cache with module objects',
          'Incremental path scanning with hashing',
          'Bytecode comparison in __pycache__',
          'File system watcher with inotify'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python implement arbitrary precision integers (big ints)?', 
        options: [
          'Array of 30-bit digits stored in base 2^30',
          'Linked list of 64-bit chunks',
          'Bignum library using GMP',
          'String representation with digit characters'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for Python\'s dictionary resizing and collision resolution?', 
        options: [
          'Open addressing with pseudo-random probing',
          'Separate chaining with linked lists',
          'Cuckoo hashing with two hash functions',
          'Robin Hood hashing with backward shift'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s deepcopy handle recursive objects?', 
        options: [
          'Maintains memo dictionary to track already-copied objects',
          'Uses recursion depth limit and raises RecursionError',
          'Converts to JSON and parses back',
          'Serializes with pickle and unpickles'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact protocol for Python context managers with multiple resources?', 
        options: [
          'contextlib.ExitStack for dynamic management',
          'Nested with statements with separate managers',
          '__enter__ chaining with yield',
          'Async context managers with __aenter__'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does Python\'s property decorator intercept attribute assignment?', 
        options: [
          'Through descriptor protocol with __set__ method',
          'Using __setattr__ override in class',
          'Via metaclass __prepare__ method',
          'By modifying class __dict__ directly'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism for Python\'s function argument unpacking (*args, **kwargs)?', 
        options: [
          'Bytecode instruction UNPACK_SEQUENCE and UNPACK_EX',
          'AST transformation during compilation',
          'Special __unpack__ method in iterables',
          'Compiler macro expansion'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python implement just-in-time compilation for numeric code?', 
        options: [
          'NumPy uses vectorized operations with SIMD instructions',
          'Numba compiles to LLVM IR with type inference',
          'Cython transpiles to C with Python C API',
          'PyPy uses tracing JIT with warmup'
        ], 
        correctAnswer: 1,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for Python\'s string interning optimization?', 
        options: [
          'Interns string literals and identifiers in PyUnicodeObject',
          'Hashes all strings and caches in global dict',
          'Uses flyweight pattern for empty strings',
          'Caches strings in per-interpreter dictionary'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does Python\'s multiprocessing avoid GIL limitations for CPU tasks?', 
        options: [
          'Spawns separate processes with own GIL and memory space',
          'Uses shared memory with mmap and semaphores',
          'Implements green threads with gevent',
          'Uses C extensions that release GIL'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism for Python\'s decimal module precision handling?', 
        options: [
          'IEEE 754-2008 decimal floating point with context',
          'Fixed-point arithmetic with configurable precision',
          'Rational number representation as fractions',
          'Big decimal implementation in C'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s itertools implement memory-efficient iteration?', 
        options: [
          'Generator functions with yield maintaining state',
          'C implementation with iterator protocol',
          'Lazy evaluation with __next__ method',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for Python\'s topological sort in graphlib?', 
        options: [
          'Kahn\'s algorithm with indegree counting',
          'Depth-first search with postorder numbering',
          'Tarjan\'s strongly connected components',
          'Parallel algorithm with work stealing'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s enum module ensure unique enumeration values?', 
        options: [
          'Metaclass __prepare__ that tracks used values',
          'Decorator that validates uniqueness',
          'Base class with __new__ preventing duplicates',
          'Runtime checking with exception raising'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism for Python\'s dataclasses automatic method generation?', 
        options: [
          'Class decorator that adds __init__, __repr__, etc.',
          'Metaclass that synthesizes methods at creation',
          'AST manipulation during compilation',
          'Runtime code generation with exec'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does Python\'s typing module perform type checking at runtime?', 
        options: [
          'get_type_hints() extracts annotations, but no runtime checking',
          'isinstance() checks with __instancecheck__',
          'TypeGuard functions with assert statements',
          'Decorators that validate at function call'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for Python\'s secrets module cryptographically secure randomness?', 
        options: [
          'Uses os.urandom() which reads from /dev/urandom',
          'Implements Fortuna CSPRNG with entropy pooling',
          'SystemRandom class using CryptGenRandom/ getrandom()',
          'Hash-based DRBG with SHA-256'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Python\'s pathlib ensure cross-platform path handling?', 
        options: [
          'PurePath and Path classes with OS-specific subclasses',
          'String normalization with os.path.join',
          'Regular expression replacement of separators',
          'All paths stored as POSIX with conversion'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      }
    ],
    "Web Development": [
      { 
        text: 'In React 18 Concurrent Features, how does useTransition() prevent unnecessary re-renders during state updates?', 
        options: [
          'By batching state updates in microtasks',
          'Using time slicing with Scheduler API',
          'Deferring non-urgent UI updates',
          'Memoizing component trees selectively'
        ], 
        correctAnswer: 2,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm used by React Fiber for interrupted rendering and resumption?', 
        options: [
          'Linked list fiber nodes with work-in-progress tree',
          'Virtual DOM diffing with reconciliation',
          'Incremental rendering with requestIdleCallback',
          'Time-sliced rendering using generator functions'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Next.js 14 App Router implement streaming server-side rendering?', 
        options: [
          'React Server Components with Suspense boundaries',
          'Edge runtime with Vercel Functions',
          'Static generation with incremental static regeneration',
          'Client-side hydration with React.lazy'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of Vite\'s hot module replacement (HMR) in development?', 
        options: [
          'WebSocket connection with module graph updates',
          'File system watcher with full page reload',
          'Service worker intercepting requests',
          'ESM import analysis with dynamic replacement'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the browser\'s Critical Rendering Path optimize page load performance?', 
        options: [
          'Prioritizes CSSOM and render tree construction',
          'Deferring JavaScript execution with async/defer',
          'Resource hints like preload and prefetch',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for React\'s reconciliation diffing between two trees?', 
        options: [
          'Heuristic O(n) diff with keys and type checking',
          'Deep equality check with memoization',
          'Tree edit distance with dynamic programming',
          'Hash-based comparison of virtual nodes'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does HTTP/3 (QUIC) improve web performance over HTTP/2?', 
        options: [
          'UDP-based transport with built-in TLS and multiplexing',
          'Header compression with HPACK',
          'Server push with cache digest',
          'Stream prioritization with dependency trees'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of Webpack\'s tree shaking for dead code elimination?', 
        options: [
          'Static analysis of ES6 import/export statements',
          'Dynamic import() with code splitting',
          'Side-effect detection in package.json',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does React Server Components reduce JavaScript bundle size?', 
        options: [
          'Components render on server, zero JS sent to client',
          'Automatic code splitting with route-based chunks',
          'Lazy loading with React.lazy and Suspense',
          'Tree shaking with advanced minification'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for GraphQL query optimization with data loader?', 
        options: [
          'Batching and caching to avoid N+1 queries',
          'Query planning with cost-based optimization',
          'Persisted queries with static analysis',
          'Query complexity limiting with depth analysis'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the browser\'s Layout Thrashing (reflow) occur and how to prevent it?', 
        options: [
          'Forced synchronous layouts from reading layout properties after writes',
          'CSS animations triggering composite layers',
          'JavaScript execution blocking rendering',
          'Memory leaks from detached DOM elements'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of CSS Grid\'s placement algorithm for complex layouts?', 
        options: [
          'Grid item placement with span-based positioning',
          'Flexible tracks with fr units and auto placement',
          'Explicit grid lines with named areas',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does React\'s useMemo hook prevent unnecessary recalculations?', 
        options: [
          'Memoizes computed value based on dependency array',
          'Caches result in component fiber node',
          'Uses WeakMap for garbage-collected caching',
          'Implements LRU cache with size limit'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for Service Worker cache strategy (Cache First vs Network First)?', 
        options: [
          'Cache First: Check cache, fallback to network',
          'Network First: Try network, fallback to cache',
          'Stale-While-Revalidate: Serve cache, update in background',
          'All of the above are valid strategies'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the browser implement CSS containment for performance optimization?', 
        options: [
          'Isolates subtree rendering for style, layout, and paint',
          'Creates stacking context for z-index isolation',
          'Enables hardware acceleration for animations',
          'Prevents descendant elements from affecting ancestors'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of TypeScript\'s structural type system (duck typing)?', 
        options: [
          'Type compatibility based on property membership',
          'Nominal typing with explicit interface implementation',
          'Type inference with contextual typing',
          'Generic constraints with type parameters'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does React Native bridge communication between JavaScript and native threads?', 
        options: [
          'Asynchronous batched messaging with JSON serialization',
          'Shared memory with WebAssembly modules',
          'Direct function calls with JSI (JavaScript Interface)',
          'WebSocket connection for real-time updates'
        ], 
        correctAnswer: 2,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for the browser\'s paint compositing layer creation?', 
        options: [
          'Creates layers for opacity, transforms, and filters',
          'GPU acceleration for 3D transformed elements',
          'Software rendering for complex SVG paths',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does ES6 Proxy enable reactive programming patterns?', 
        options: [
          'Intercepts object operations with handler traps',
          'Creates observable data structures',
          'Implements two-way data binding',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of WebGL\'s shader compilation pipeline?', 
        options: [
          'GLSL source → compile → link → program object',
          'JavaScript strings parsed to binary shaders',
          'WebAssembly module with GPU instructions',
          'Canvas 2D context with hardware acceleration'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Intersection Observer API optimize scroll performance?', 
        options: [
          'Asynchronous callback when element enters viewport',
          'Main thread polling with requestAnimationFrame',
          'CSS :in-viewport pseudo-class detection',
          'Scroll event throttling with debouncing'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for DNS prefetching in modern browsers?', 
        options: [
          'Resolves domain names before actual request',
          'Preconnects TCP handshake for critical domains',
          'Prefetches resources based on viewport analysis',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does React Error Boundary catch JavaScript errors in component tree?', 
        options: [
          'static getDerivedStateFromError() and componentDidCatch()',
          'try/catch blocks around render methods',
          'Error event listeners on window object',
          'Suspense with error boundaries'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of CSS Custom Properties (CSS Variables) inheritance?', 
        options: [
          'Cascade through DOM like other inherited properties',
          'Global scope with :root selector',
          'Local scope with element specificity',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does Webpack Module Federation enable micro-frontend architecture?', 
        options: [
          'Dynamic remote module loading at runtime',
          'Shared dependency singleton management',
          'Build-time code splitting across teams',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      }
    ],
    "Data Science": [
      { 
        text: 'When implementing XGBoost for imbalanced classification, which combination prevents overfitting to majority class?', 
        options: [
          'scale_pos_weight with max_depth=3',
          'min_child_weight with subsample=0.5',
          'reg_alpha=1.0 with colsample_bytree=0.3',
          'All of the above in combination'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for backpropagation through time (BPTT) in LSTM networks?', 
        options: [
          'Unfolds RNN through time steps and applies chain rule',
          'Truncated gradient descent with window size',
          'Teacher forcing with scheduled sampling',
          'Gradient clipping with norm thresholding'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the attention mechanism in transformers compute token relationships?', 
        options: [
          'Query-key-value dot product with softmax scaling',
          'Convolutional filters with sliding windows',
          'Recurrent connections with hidden states',
          'Graph neural networks with edge weights'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact optimization algorithm for training Generative Adversarial Networks (GANs)?', 
        options: [
          'Minimax game with alternating gradient updates',
          'Wasserstein distance with gradient penalty',
          'Mode collapse prevention with label smoothing',
          'All of the above techniques'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the U-Net architecture achieve precise localization in image segmentation?', 
        options: [
          'Encoder-decoder with skip connections',
          'Atrous spatial pyramid pooling',
          'Feature pyramid networks with lateral connections',
          'Dense connections with concatenation'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical formulation of the bias-variance tradeoff?', 
        options: [
          'Expected test error = bias² + variance + irreducible error',
          'Training error + regularization penalty',
          'Cross-entropy loss with weight decay',
          'Mean squared error decomposition'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does batch normalization improve deep neural network training?', 
        options: [
          'Normalizes layer inputs to zero mean and unit variance',
          'Reduces internal covariate shift',
          'Allows higher learning rates',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for DBSCAN density-based clustering?', 
        options: [
          'Forms clusters from dense regions separated by sparse areas',
          'Hierarchical agglomeration with linkage criteria',
          'K-means with centroid updates',
          'Spectral clustering with graph Laplacian'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Random Forest algorithm reduce overfitting compared to single decision trees?', 
        options: [
          'Bagging with feature randomness and majority voting',
          'Pruning with cost complexity parameter',
          'Early stopping based on validation loss',
          'Regularization with tree depth limits'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of dropout regularization in neural networks?', 
        options: [
          'Randomly drops neurons during training to prevent co-adaptation',
          'Adds Gaussian noise to weights during updates',
          'Penalizes large weight values with L2 norm',
          'Early stopping based on validation performance'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Adam optimizer combine momentum and adaptive learning rates?', 
        options: [
          'Maintains exponentially decaying averages of gradients and squared gradients',
          'Uses Nesterov accelerated gradient with lookahead',
          'Adapts learning rate per parameter based on historical gradient magnitudes',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical formulation of the ROC curve and AUC?', 
        options: [
          'TPR vs FPR at various classification thresholds',
          'Precision-recall curve with average precision',
          'Lift chart with cumulative gains',
          'Calibration plot with reliability diagram'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does t-SNE visualize high-dimensional data in 2D/3D?', 
        options: [
          'Minimizes KL divergence between pairwise similarities',
          'Principal component analysis with variance maximization',
          'Multidimensional scaling with distance preservation',
          'Isomap with geodesic distance approximation'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for the expectation-maximization (EM) in Gaussian mixture models?', 
        options: [
          'Alternates between E-step (responsibility computation) and M-step (parameter update)',
          'Gradient descent on negative log-likelihood',
          'Variational inference with mean-field approximation',
          'Gibbs sampling with Markov chain Monte Carlo'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the support vector machine (SVM) find the optimal separating hyperplane?', 
        options: [
          'Maximizes margin between support vectors',
          'Minimizes hinge loss with regularization',
          'Solves quadratic programming problem',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of feature importance in gradient boosting models?', 
        options: [
          'Average gain of splits where feature is used',
          'Permutation importance measuring performance drop',
          'SHAP values based on Shapley values from game theory',
          'All of the above are valid methods'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the k-nearest neighbors algorithm handle high-dimensional data (curse of dimensionality)?', 
        options: [
          'Distance metrics become less discriminative, requiring dimensionality reduction',
          'Uses ball trees or KD-trees for efficient search',
          'Weighted voting based on inverse distance',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mathematical foundation of principal component analysis (PCA)?', 
        options: [
          'Eigen decomposition of covariance matrix',
          'Singular value decomposition of data matrix',
          'Maximizing variance of projected data',
          'All of the above are equivalent formulations'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the transformer architecture parallelize sequence processing compared to RNNs?', 
        options: [
          'Self-attention allows simultaneous processing of all tokens',
          'Positional encoding instead of sequential processing',
          'Feed-forward networks applied independently per position',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for the Hungarian method (Kuhn-Munkres) for optimal assignment?', 
        options: [
          'Reduces cost matrix with row/column operations to find minimum cost matching',
          'Linear programming with simplex method',
          'Auction algorithm with price updates',
          'Genetic algorithm with crossover and mutation'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the DBSCAN algorithm handle noise points?', 
        options: [
          'Labels them as -1 (outliers) not belonging to any cluster',
          'Creates small clusters for isolated points',
          'Treats them as border points of nearest cluster',
          'Ignores them during density estimation'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of the learning rate scheduler (e.g., ReduceLROnPlateau)?', 
        options: [
          'Reduces learning rate when validation metric stops improving',
          'Cosine annealing with warm restarts',
          'Cyclical learning rates between bounds',
          'Step decay at predefined epochs'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Markov Chain Monte Carlo (MCMC) sampling approximate posterior distributions?', 
        options: [
          'Constructs Markov chain with stationary distribution equal to target distribution',
          'Acceptance-rejection sampling with proposal distribution',
          'Importance sampling with weight correction',
          'Variational inference with mean-field families'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical formulation of the Kullback-Leibler divergence?', 
        options: [
          'D_KL(P||Q) = Σ P(x) log(P(x)/Q(x))',
          'Jensen-Shannon divergence as symmetric version',
          'Cross-entropy minus entropy',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the feature hashing trick (hashing trick) handle high-dimensional categorical features?', 
        options: [
          'Projects features into lower dimension via hash function',
          'One-hot encoding with sparse representation',
          'Target encoding with smoothing',
          'Embedding layers with learned representations'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      }
    ],
    "Marketing": [
      { 
        text: 'What is the exact algorithm for calculating Customer Lifetime Value (CLV) with cohort analysis?', 
        options: [
          'CLV = (Average Purchase Value × Purchase Frequency × Customer Lifespan)',
          'Discounted cash flow of future customer revenue',
          'Probability models like BG/NBD (Beta Geometric/Negative Binomial Distribution)',
          'All of the above are valid approaches'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does multi-touch attribution modeling allocate conversion credit across touchpoints?', 
        options: [
          'Linear: Equal credit to all touchpoints',
          'Time Decay: More credit to recent touchpoints',
          'Position Based: 40% first, 40% last, 20% distributed',
          'All of the above are standard models'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mechanism of Facebook\'s auction algorithm for ad delivery?', 
        options: [
          'Bid × Estimated Action Rate × Ad Quality + User Value',
          'Highest bidder wins regardless of quality',
          'Cost-per-click with quality score adjustment',
          'Real-time bidding with second-price auction'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does Google\'s Quality Score impact PPC advertising costs?', 
        options: [
          'Higher Quality Score lowers actual cost-per-click',
          'Affects ad position in search results',
          'Based on click-through rate, ad relevance, landing page experience',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact statistical method for A/B test significance calculation?', 
        options: [
          'Two-proportion z-test for conversion rates',
          'Chi-square test for independence',
          'Bayesian inference with posterior probability',
          'All of the above are valid methods'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the RFM (Recency, Frequency, Monetary) model segment customers?', 
        options: [
          'Scores customers on three dimensions for targeted marketing',
          'Clustering algorithm based on transaction history',
          'Predictive model for churn probability',
          'All of the above applications'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for search engine ranking (PageRank) today?', 
        options: [
          'Machine learning with hundreds of ranking factors (RankBrain)',
          'Link analysis with random surfer model',
          'Content relevance with TF-IDF and BERT',
          'All of the above in combination'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does programmatic advertising real-time bidding (RTB) work technically?', 
        options: [
          'Ad exchange sends bid request to DSPs, highest bid wins in milliseconds',
          'Direct purchase from publishers at fixed CPM',
          'Network buys with bulk inventory',
          'Affiliate marketing with performance-based payment'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical model for viral coefficient calculation?', 
        options: [
          'k = i × c (where i = invites per customer, c = conversion rate)',
          'Exponential growth with network effects',
          'Bass diffusion model for innovation adoption',
          'SIR model for information spread'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the sales funnel conversion rate optimization (CRO) identify drop-off points?', 
        options: [
          'Funnel analysis with event tracking and segmentation',
          'Heatmaps and session recordings',
          'A/B testing of page elements',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating return on ad spend (ROAS)?', 
        options: [
          'ROAS = Revenue from Ads / Cost of Ads',
          'LTV:CAC ratio for customer acquisition',
          'Incremental revenue attribution modeling',
          'Multi-touch attribution with fractional credit'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does lookalike audience targeting work in social media advertising?', 
        options: [
          'Machine learning finds users similar to your existing customers',
          'Demographic matching with similar interests',
          'Behavioral retargeting based on website visits',
          'Contextual targeting based on content consumption'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of SEO canonical tags for duplicate content?', 
        options: [
          'Tells search engines which URL is the "master" version',
          'Prevents duplicate content penalty',
          'Consolidates link equity to preferred URL',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Bass Diffusion Model predict product adoption over time?', 
        options: [
          'Innovators + imitators with parameters p (coefficient of innovation) and q (coefficient of imitation)',
          'Logistic growth with carrying capacity',
          'Exponential decay with churn rate',
          'Normal distribution of adoption timing'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact statistical method for market basket analysis (association rules)?', 
        options: [
          'Apriori algorithm for frequent itemset mining',
          'FP-Growth with compact tree structure',
          'Support, confidence, and lift metrics',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does content gap analysis identify SEO opportunities?', 
        options: [
          'Compares your content with competitors for keyword coverage',
          'Identifies high-volume, low-competition keywords',
          'Analyzes search intent and user questions',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for email marketing spam score calculation?', 
        options: [
          'Spam filters analyze hundreds of factors (content, headers, sender reputation)',
          'Bayesian filtering with word probabilities',
          'Blacklist checking with DNSBL',
          'All of the above in combination'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the net promoter score (NPS) predict business growth?', 
        options: [
          'NPS = % Promoters - % Detractors (scale -100 to +100)',
          'Correlates with customer loyalty and referral behavior',
          'Predicts revenue growth relative to competitors',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of retargeting pixels for abandoned cart recovery?', 
        options: [
          'JavaScript pixel fires when user adds to cart but doesn\'t purchase',
          'Cookie-based tracking across websites',
          'Dynamic ads showing abandoned products',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does marketing mix modeling (MMM) allocate budget across channels?', 
        options: [
          'Regression analysis of historical sales vs marketing spend',
          'Attribution of incremental revenue to each channel',
          'Optimization for maximum ROI across constraints',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for calculating customer acquisition cost (CAC)?', 
        options: [
          'CAC = Total Marketing Spend / Number of New Customers',
          'LTV:CAC ratio for sustainability',
          'Payback period for CAC recovery',
          'All of the above metrics'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does sentiment analysis classify social media mentions?', 
        options: [
          'Natural language processing with machine learning classifiers',
          'Lexicon-based approaches with sentiment dictionaries',
          'Deep learning with transformer models',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact statistical method for forecasting sales with seasonality?', 
        options: [
          'Time series analysis (ARIMA, SARIMA, Prophet)',
          'Exponential smoothing with trend and seasonality',
          'Regression with dummy variables for seasons',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the zero-party data collection differ from first-party data?', 
        options: [
          'Zero-party: Data intentionally shared by customer (preferences, intent)',
          'First-party: Data collected from direct interactions',
          'Second-party: Data from trusted partners',
          'All of the above distinctions'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of omnichannel attribution in retail?', 
        options: [
          'Tracks customer journey across online and offline touchpoints',
          'Uses unique identifiers (email, phone, loyalty cards)',
          'Matches online ads to in-store purchases',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      }
    ],
    "Design": [
      { 
        text: 'What is the exact psychological principle behind Fitts\'s Law for interface design?', 
        options: [
          'MT = a + b log₂(D/W + 1) - Time to target based on distance and size',
          'Hick\'s Law: Decision time increases with number of choices',
          'Miller\'s Law: Working memory holds 7±2 items',
          'Jakob\'s Law: Users prefer familiar patterns'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Gestalt principle of proximity affect visual perception in UI?', 
        options: [
          'Elements close together are perceived as related',
          'Similar elements are grouped together',
          'Closed shapes are perceived as whole',
          'Symmetrical elements are seen as belonging together'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating color contrast ratio (WCAG 2.1)?', 
        options: [
          '(L1 + 0.05) / (L2 + 0.05) where L is relative luminance',
          'Hex color difference in RGB space',
          'HSV brightness comparison',
          'CIE Lab ΔE* color difference'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the cognitive load theory impact UX design decisions?', 
        options: [
          'Minimizes extraneous load, optimizes intrinsic load, manages germane load',
          'Reduces number of choices per screen',
          'Uses progressive disclosure for complex tasks',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical model for the golden ratio in visual composition?', 
        options: [
          'φ = (1 + √5)/2 ≈ 1.618',
          'Rule of thirds with 1:1:1 grid',
          'Fibonacci sequence ratio',
          'All of the above are related'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Ockham\'s razor principle apply to interface design?', 
        options: [
          'Simpler solutions are preferred over complex ones',
          'Minimum viable product with essential features',
          'Progressive enhancement over graceful degradation',
          'All of the above interpretations'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mechanism of the Von Restorff effect in highlighting important elements?', 
        options: [
          'Isolation effect: Distinct items are more memorable',
          'Color contrast draws attention',
          'Animation creates visual hierarchy',
          'All of the above techniques'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Pareto principle (80/20 rule) guide feature prioritization?', 
        options: [
          '80% of usage comes from 20% of features',
          'Focus on high-impact, frequently used features',
          'Minimum lovable product with core value',
          'All of the above applications'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact psychological basis for the peak-end rule in user experience?', 
        options: [
          'Users judge experience by peak intensity and final moments',
          'Kahneman\'s research on remembered vs. actual experience',
          'Design memorable climaxes and positive endings',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Gutenberg diagram describe Western reading patterns?', 
        options: [
          'Z-pattern: Top-left to top-right, diagonal to bottom-left to bottom-right',
          'F-pattern for scanning content',
          'Eye-tracking heatmaps for web pages',
          'All of the above patterns'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating typographic vertical rhythm?', 
        options: [
          'Baseline grid with consistent line-height multiples',
          'Modular scale for font sizes',
          'Vertical spacing with rem units',
          'All of the above techniques'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the atomic design methodology structure design systems?', 
        options: [
          'Atoms → Molecules → Organisms → Templates → Pages',
          'Component-based architecture with inheritance',
          'Design tokens for consistent theming',
          'All of the above concepts'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact psychological effect of the serial position effect on navigation?', 
        options: [
          'Primacy and recency: Users remember first and last items best',
          'Place important items at beginning and end of lists',
          'Middle items are less memorable',
          'All of the above implications'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the aesthetic-usability effect influence user perception?', 
        options: [
          'Beautiful designs are perceived as more usable',
          'Visual appeal creates positive first impression',
          'Attractive interfaces increase tolerance for minor issues',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mathematical basis for Bézier curves in vector graphics?', 
        options: [
          'Parametric curves defined by control points',
          'B(t) = Σ C(n,i) × (1-t)^(n-i) × t^i × P_i',
          'Used in pen tools for smooth shapes',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the concept of affordance guide intuitive interface design?', 
        options: [
          'Visual cues suggest possible actions',
          'Buttons look pressable, sliders look draggable',
          'Natural mapping between controls and effects',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating color harmony (complementary, analogous, triadic)?', 
        options: [
          'Color wheel positions: Complementary (180°), Analogous (30°), Triadic (120°)',
          'HSV/HSL color space calculations',
          'Color theory with primary/secondary/tertiary colors',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Zeigarnik effect influence task completion design?', 
        options: [
          'Unfinished tasks create mental tension remembered better',
          'Progress indicators increase completion rates',
          'Breaking tasks into smaller steps',
          'All of the above applications'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact psychological basis for the mere-exposure effect in branding?', 
        options: [
          'Repeated exposure increases preference',
          'Familiarity breeds liking, not contempt',
          'Brand recognition through consistent visuals',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the doherty threshold affect perceived system responsiveness?', 
        options: [
          '400ms response time keeps users engaged and productive',
          'Instant feedback (<100ms) feels immediate',
          'Progress indicators for longer operations',
          'All of the above guidelines'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical model for animation easing functions?', 
        options: [
          'Cubic Bézier curves for custom easing',
          'CSS timing functions: ease, ease-in, ease-out, ease-in-out',
          'Physics-based motion with acceleration/deceleration',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the concept of mental models align with user expectations?', 
        options: [
          'Design matches users\' internal understanding of how system works',
          'Consistency with existing conventions',
          'Metaphors that map to real-world objects',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating grid systems in responsive design?', 
        options: [
          '12-column grid with gutter and margin calculations',
          'Flexbox or CSS Grid with fractional units',
          'Breakpoints based on content, not devices',
          'All of the above approaches'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the picture superiority effect impact information presentation?', 
        options: [
          'Images are remembered better than words',
          'Visual content increases engagement',
          'Iconography aids navigation',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact psychological mechanism of the endowment effect in customization?', 
        options: [
          'Users value things more if they feel ownership',
          'Customizable interfaces increase engagement',
          'Personalization creates emotional attachment',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      }
    ],
    "Finance": [
      { 
        text: 'What is the exact mathematical formula for calculating Weighted Average Cost of Capital (WACC)?', 
        options: [
          'WACC = (E/V × Re) + (D/V × Rd × (1 - Tc))',
          'Cost of equity using CAPM: Re = Rf + β(Rm - Rf)',
          'After-tax cost of debt: Rd × (1 - Tc)',
          'All of the above components'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Black-Scholes model price European options?', 
        options: [
          'C = S × N(d1) - K × e^(-rT) × N(d2) where d1,d2 are functions of S,K,T,r,σ',
          'Binomial option pricing with risk-neutral probability',
          'Monte Carlo simulation of price paths',
          'All of the above methods'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for calculating Value at Risk (VaR) using historical simulation?', 
        options: [
          'Sort historical returns, take nth percentile loss',
          'Parametric VaR with normal distribution assumption',
          'Monte Carlo VaR with simulated scenarios',
          'All of the above approaches'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Modigliani-Miller theorem state capital structure irrelevance?', 
        options: [
          'In perfect markets, firm value independent of debt-equity mix',
          'With taxes, debt provides tax shield: VL = VU + Tc×D',
          'With bankruptcy costs, optimal capital structure exists',
          'All of the above propositions'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical model for calculating bond duration and convexity?', 
        options: [
          'Macaulay duration = Σ (t × PV(CFt)) / Price',
          'Modified duration = Macaulay duration / (1 + y/n)',
          'Convexity = Σ (t(t+1) × PV(CFt)) / (Price × (1+y)²)',
          'All of the above formulas'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Capital Asset Pricing Model (CAPM) determine required return?', 
        options: [
          'E(Ri) = Rf + βi × (E(Rm) - Rf)',
          'Security Market Line (SML) plots expected return vs beta',
          'Beta measures systematic risk relative to market',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating Economic Value Added (EVA)?', 
        options: [
          'EVA = NOPAT - (Capital × WACC)',
          'Measures true economic profit after cost of capital',
          'Alternative to accounting profit metrics',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the efficient market hypothesis (EMH) categorize information efficiency?', 
        options: [
          'Weak form: Prices reflect all historical information',
          'Semi-strong: Prices reflect all public information',
          'Strong form: Prices reflect all public and private information',
          'All of the above forms'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact mathematical formulation of the Gordon Growth Model?', 
        options: [
          'P0 = D1 / (r - g) where g < r',
          'Dividend discount model with constant growth',
          'Present value of growing perpetuity',
          'All of the above interpretations'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the Monte Carlo simulation model financial uncertainty?', 
        options: [
          'Generates random paths for variables using probability distributions',
          'Computes statistics across thousands of simulations',
          'Used for option pricing, risk analysis, project valuation',
          'All of the above applications'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for calculating the Sharpe ratio?', 
        options: [
          'Sharpe ratio = (Rp - Rf) / σp',
          'Measures risk-adjusted return',
          'Treynor ratio uses beta instead of standard deviation',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the arbitrage pricing theory (APT) model asset returns?', 
        options: [
          'E(Ri) = Rf + Σ βij × λj where λj are risk premiums',
          'Multi-factor model instead of single market factor',
          'Statistical factors or fundamental factors',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical model for calculating loan amortization?', 
        options: [
          'Payment = P × r × (1+r)^n / ((1+r)^n - 1)',
          'Interest portion decreases, principal portion increases over time',
          'Amortization schedule shows breakdown per period',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the DuPont analysis decompose return on equity (ROE)?', 
        options: [
          'ROE = Net Profit Margin × Asset Turnover × Equity Multiplier',
          'Identifies drivers of profitability, efficiency, and leverage',
          'Five-step version includes tax burden and interest burden',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for calculating internal rate of return (IRR)?', 
        options: [
          'Discount rate that makes NPV = 0: Σ CFt / (1+IRR)^t = 0',
          'Solved iteratively (Newton-Raphson, trial and error)',
          'Multiple IRRs possible with non-conventional cash flows',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Markowitz portfolio theory optimize risk-return tradeoff?', 
        options: [
          'Efficient frontier: Minimum variance for given expected return',
          'Portfolio variance depends on covariances, not just variances',
          'Diversification reduces unsystematic risk',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical formulation of the put-call parity?', 
        options: [
          'C + K×e^(-rT) = P + S (for European options, no dividends)',
          'Arbitrage relationship between put, call, and underlying',
          'With dividends: C + K×e^(-rT) = P + S - PV(Dividends)',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the time value of money affect financial decision making?', 
        options: [
          'PV = FV / (1+r)^n, money today worth more than same amount tomorrow',
          'Discounting future cash flows to present value',
          'Compounding interest over multiple periods',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Medium'
      },
      { 
        text: 'What is the exact algorithm for calculating credit default swap (CDS) spread?', 
        options: [
          'Spread = (1 - Recovery Rate) × Probability of Default',
          'Risk-neutral pricing with hazard rate models',
          'Market-based measure of credit risk',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the Altman Z-score predict bankruptcy risk?', 
        options: [
          'Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E where A=Working Capital/Assets, B=Retained Earnings/Assets, etc.',
          'Below 1.8: distress zone, above 3: safe zone',
          'Multivariate discriminant analysis of financial ratios',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical model for calculating foreign exchange forward rates?', 
        options: [
          'F = S × (1 + rd)^T / (1 + rf)^T (interest rate parity)',
          'Covered interest arbitrage ensures parity',
          'Forward premium/discount based on interest differential',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      },
      { 
        text: 'How does the binomial option pricing model work?', 
        options: [
          'Construct price tree with up/down movements, backward induction',
          'Risk-neutral probability: p = (e^(rΔt) - d)/(u - d)',
          'American options check early exercise at each node',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact algorithm for calculating the Sortino ratio?', 
        options: [
          'Sortino ratio = (Rp - MAR) / Downside deviation',
          'Uses minimum acceptable return (MAR) instead of risk-free rate',
          'Focuses on downside risk only',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Medium'
      },
      { 
        text: 'How does the efficient frontier change with risk-free asset?', 
        options: [
          'Capital Market Line (CML): E(Rp) = Rf + (E(Rm)-Rf)/σm × σp',
          'Tangent portfolio maximizes Sharpe ratio',
          'Two-fund separation theorem',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'What is the exact mathematical formulation of the Kelly criterion for optimal betting?', 
        options: [
          'f* = (bp - q) / b where b=odds, p=win probability, q=1-p',
          'Maximizes long-term growth rate of wealth',
          'Fraction of bankroll to bet',
          'All of the above'
        ], 
        correctAnswer: 0,
        difficulty: 'Hard'
      }
    ],
    "General": [
      { 
        text: 'What is the time complexity of the union-find data structure with path compression and union by rank?', 
        options: [
          'Nearly constant: O(α(n)) amortized',
          'Logarithmic: O(log n)',
          'Inverse Ackermann function',
          'All of the above descriptions'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
      },
      { 
        text: 'Which algorithm provides optimal solution for the traveling salesman problem?', 
        options: [
          'Held-Karp dynamic programming: O(n²2ⁿ)',
          'Branch and bound with pruning',
          'Christofides algorithm for metric TSP: 1.5-approximation',
          'All of the above'
        ], 
        correctAnswer: 3,
        difficulty: 'Hard'
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
    
    // Store results if passed (50%+)
    if (finalScore >= 50) {
      // Store interview data in localStorage (for database later)
      const interviewData = {
        internshipId: internship?.id,
        internshipTitle: internship?.title,
        company: internship?.company,
        category: internship?.category,
        score: finalScore,
        status: finalScore >= 60 ? 'qualified_for_interview' : 'passed_but_not_qualified',
        qualifiedAt: new Date().toISOString(),
        studentName: user.name,
        studentEmail: user.email,
        studentPhone: user.phone,
        referenceId: `IA-${Date.now()}-${internship?.id}-${user.id.substring(0, 8)}`
      };

      localStorage.setItem(`interview_qualified_${internship?.id}`, JSON.stringify(interviewData));
      
      // Update user's completed assessments
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedAssessments = [
        ...(userData.completedAssessments || []),
        {
          internshipId: internship?.id,
          internshipTitle: internship?.title,
          company: internship?.company,
          category: internship?.category,
          score: finalScore,
          passed: finalScore >= 50,
          qualifiedForInterview: finalScore >= 60,
          date: new Date().toISOString(),
          status: finalScore >= 60 ? 'awaiting_interview_schedule' : 'passed'
        }
      ];
      
      userData.completedAssessments = updatedAssessments;
      
      // Track applied internship
      if (!userData.appliedInternships) {
        userData.appliedInternships = [];
      }
      if (!userData.appliedInternships.includes(internship?.id)) {
        userData.appliedInternships.push(internship?.id);
      }
      
      localStorage.setItem("user", JSON.stringify(userData));
      
      console.log('📊 Assessment results stored for manual follow-up:');
      console.log('Student:', user.name);
      console.log('Email:', user.email);
      console.log('Score:', finalScore + '%');
      console.log('Interview Qualified:', finalScore >= 60 ? 'YES' : 'NO');
      console.log('Reference ID:', interviewData.referenceId);
    }
    
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
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span><strong>Scores 60%+ qualify for direct interview</strong> with our hiring partners</span>
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
    const qualifiedForInterview = score >= 60;
    
    if (passed && qualifiedForInterview) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10 text-center">
              <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 bg-gradient-to-r from-emerald-100 to-green-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                  <Trophy size={40} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-2">Outstanding Performance! 🎊</h2>
              
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-8">
                {internship?.category} Professional Assessment - EXCELLENT SCORE
              </p>
              
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl py-10 mb-8 border border-emerald-100">
                <div className="text-7xl font-black mb-4 text-emerald-600">{score}%</div>
                <p className="text-emerald-700 font-medium">You've qualified for direct interview!</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CheckCircle size={16} />
                  INTERVIEW ELIGIBLE
                </div>
              </div>

              {/* IMPORTANT: Interview Process Information */}
              <div className="mb-10">
                <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 justify-center">
                    <MessageSquare size={20} />
                    What Happens Next?
                  </h4>
                  <div className="text-sm text-blue-800 space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <p><strong>You will receive an email shortly</strong> with interview scheduling details</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <p>The email will come from <strong>hiring@arjunai.com</strong> or <strong>team@internadda.com</strong></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <p>We will <strong>personally coordinate</strong> with you to schedule the interview at your convenience</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-blue-600 font-bold">4</span>
                      </div>
                      <p>The interview will be conducted by <strong>Arjun AI Solutions team</strong> or our partner companies</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                    <div className="text-left">
                      <p className="text-sm text-amber-800 font-medium">Check your email (including spam folder) within 24-48 hours</p>
                      <p className="text-xs text-amber-700 mt-1">If you don't receive an email, contact us at support@internadda.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database Confirmation */}
              <div className="mt-6 bg-slate-900 rounded-2xl p-5 text-white mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <Database size={20} className="text-emerald-400" />
                  <h5 className="font-bold">Database Record Created</h5>
                </div>
                <div className="text-sm text-slate-300 space-y-2">
                  <p>✓ Your interview eligibility is now stored in our secure database</p>
                  <p>✓ Our hiring team can now access your profile and scores</p>
                  <p>✓ You will be contacted personally for next steps</p>
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  Record ID: {user.id.substring(0, 8)}-{internship?.id}-{Math.random().toString(36).substring(7)}
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-5 rounded-2xl">
                  <div className="text-xl font-bold text-slate-900">{detailedResults.correct}/25</div>
                  <div className="text-sm text-slate-500">Correct Answers</div>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl">
                  <div className="text-xl font-bold text-slate-900">{internship?.category}</div>
                  <div className="text-sm text-slate-500">Domain</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex-1"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={() => navigate('/internships')}
                  className="bg-white text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex-1"
                >
                  Browse More Internships
                </button>
              </div>
              
              {/* Trust Message */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  Your profile has been <strong>forwarded to our hiring partners</strong>. 
                  We'll contact you personally for the next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10">
            <div className="text-center mb-10">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${
                passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
              }`}>
                {passed ? <Trophy size={48} /> : <AlertCircle size={48} />}
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                {passed ? 'Well Done! 🎉' : 'Keep Practicing! 💪'}
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
                  <div className={`text-7xl font-black mb-4 ${
                    passed ? 'text-emerald-600' : 'text-red-600'
                  }`}>{score}%</div>
                  <div className={`text-lg font-bold px-6 py-2 rounded-full ${
                    passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {passed ? 'PASSED' : 'FAILED - Needs Improvement'}
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
                      ? '✓ You passed the assessment. To qualify for direct interview, aim for 60%+ score.'
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
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={() => navigate(`/test/practice/${id}`)}
                    className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Practice More
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
                This test is designed to be challenging. A 50% score is required to pass. 
                Scores 60%+ qualify for direct interview scheduling with our partner companies.
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
