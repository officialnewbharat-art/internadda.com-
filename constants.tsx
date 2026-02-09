import React from 'react';
import { Internship, Question } from './types';

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'TechFlow Solutions',
    category: 'Python',
    image: 'https://iili.io/fbAQLjn.md.png',
    stipend: '₹2,000 - ₹8,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Work on advanced AI/ML algorithms and backend systems using Python and Django.',
    skills: ['Python', 'Django', 'PostgreSQL']
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'Nexus Digital',
    category: 'Web Development',
    image: 'https://iili.io/fbArEUF.png',
    stipend: '₹2,500 - ₹5,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Build responsive frontends using Next.js and Tailwind CSS for enterprise clients.',
    skills: ['React', 'Next.js', 'Tailwind']
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'CloudScale Inc',
    category: 'Data Science',
    image: 'https://iili.io/fbAQsTX.md.png',
    stipend: '₹3,000 - ₹7,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Analyze large datasets and build predictive models using Scikit-learn and TensorFlow.',
    skills: ['Python', 'Pandas', 'Matplotlib']
  },
  {
    id: '4',
    title: 'Digital Marketing Intern',
    company: 'GrowthLens Media',
    category: 'Marketing',
    image: 'https://iili.io/fbunvBR.png',
    stipend: '₹2,000 - ₹6,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Execute SEO strategies and manage high-conversion social media campaigns.',
    skills: ['SEO', 'Meta Ads', 'Analytics']
  },
  {
    id: '5',
    title: 'UI/UX Design Intern',
    company: 'Pixel Perfect',
    category: 'Design',
    image: 'https://iili.io/fbuneLv.png',
    stipend: '₹3,500 - ₹7,500',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Create high-fidelity wireframes and user journeys for fintech applications.',
    skills: ['Figma', 'Prototyping', 'User Research']
  },
  {
    id: '6',
    title: 'Finance & Accounts Intern',
    company: 'WealthWise Corp',
    category: 'Finance',
    image: 'https://iili.io/fmism22.png',
    stipend: '₹2,000 - ₹5,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Assist in financial auditing, GST filing, and corporate tax planning.',
    skills: ['Tally', 'Excel', 'Taxation']
  },
  {
    id: '7',
    title: 'Backend Systems Intern',
    company: 'NodeLink Systems',
    category: 'Web Development',
    image: 'https://iili.io/fphNcTG.',
    stipend: '₹4,000 - ₹9,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Develop scalable microservices and optimize database queries using Node.js.',
    skills: ['Node.js', 'Redis', 'Docker']
  },
  {
    id: '8',
    title: 'AI/ML Research Intern',
    company: 'Arjuna AI Lab',
    category: 'Python',
    image: 'https://iili.io/fphNYps.png',
    stipend: '₹5,000 - ₹12,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Research and implement NLP models for automated document verification.',
    skills: ['PyTorch', 'NLTK', 'Transformers']
  },
  {
    id: '9',
    title: 'Content Strategy Intern',
    company: 'VibeCheck Social',
    category: 'Marketing',
    image: 'https://iili.io/fphN7vn.png',
    stipend: '₹2,000 - ₹4,000',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Develop viral content strategies for B2B brands on LinkedIn and Twitter.',
    skills: ['Copywriting', 'Canva', 'Content Plan']
  }
];

// Tough, Category-Specific Question Bank (25 questions each)
export const CATEGORY_QUESTIONS: Record<string, Question[]> = {
  "Python": Array.from({ length: 25 }, (_, i) => ({
    id: `py-${i}`,
    text: `Python Advanced Challenge ${i + 1}: How does the CPython memory manager handle small object allocation?`,
    options: ['Using PyObject_Malloc', 'Directly via system malloc', 'Using arena-based pools', 'Memory mapping'],
    correctAnswer: 2
  })),
  "Web Development": Array.from({ length: 25 }, (_, i) => ({
    id: `web-${i}`,
    text: `Web Dev Expert Quiz ${i + 1}: What is the specific behavior of the 'Double-Buffering' effect in React's Concurrent Mode?`,
    options: ['Reduces re-renders', 'Allows non-blocking updates', 'Prevents UI flickering', 'Syncs state across tabs'],
    correctAnswer: 1
  })),
  "Data Science": Array.from({ length: 25 }, (_, i) => ({
    id: `ds-${i}`,
    text: `Data Science Insight ${i + 1}: Which regularization technique is best for strictly feature selection in high-dimensional datasets?`,
    options: ['Ridge (L2)', 'Lasso (L1)', 'Elastic Net', 'Dropout'],
    correctAnswer: 1
  })),
  "Marketing": Array.from({ length: 25 }, (_, i) => ({
    id: `mkt-${i}`,
    text: `Growth Strategy ${i + 1}: What is the primary difference between First-Touch and Linear Attribution models?`,
    options: ['Conversion credit', 'Time decay', 'Platform cost', 'User retention'],
    correctAnswer: 0
  })),
  "Design": Array.from({ length: 25 }, (_, i) => ({
    id: `des-${i}`,
    text: `UX Architecture ${i + 1}: How does Fitts's Law apply to mobile touch target optimization?`,
    options: ['Color contrast', 'Target size vs Distance', 'Whitespace ratio', 'Typography hierarchy'],
    correctAnswer: 1
  })),
  "Finance": Array.from({ length: 25 }, (_, i) => ({
    id: `fin-${i}`,
    text: `Corporate Finance ${i + 1}: What is the immediate impact of an increase in Deferred Tax Liability on a company's free cash flow?`,
    options: ['Decreases FCF', 'Increases FCF', 'No impact', 'Neutralizes debt'],
    correctAnswer: 1
  }))
};

export const CATEGORIES = ['All Internships', 'Web Development', 'Data Science', 'Python', 'Marketing', 'Design', 'Finance'];
