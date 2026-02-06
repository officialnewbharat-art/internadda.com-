import React from 'react';
import { Internship, Question } from './types';

// Humne naam 'MOCK_INTERNSHIPS' hi rakha hai taaki baki files mein error na aaye
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
  }
];

export const MOCK_QUESTIONS: Question[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  text: `Sample Skill Assessment Question ${i + 1}: What is the primary purpose of this domain-specific concept?`,
  options: ['Option A: Optimal solution', 'Option B: Sub-optimal choice', 'Option C: Legacy method', 'Option D: None of the above'],
  correctAnswer: 0
}));

export const CATEGORIES = ['All Internships', 'Web Development', 'Data Science', 'Python', 'Marketing', 'Design'];
