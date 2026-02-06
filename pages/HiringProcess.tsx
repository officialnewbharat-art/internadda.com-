import React from 'react';
import { Link } from 'react-router-dom';

const HiringProcess: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: '📝',
      title: 'Free Skill Assessment',
      description: 'Take our domain-specific test to showcase your skills',
      duration: '30 minutes',
      details: [
        '25-30 questions based on your chosen domain',
        'Real-time anti-cheat protection',
        'Instant score and feedback'
      ]
    },
    {
      number: 2,
      icon: '💬',
      title: 'Direct Manager Interview',
      description: 'Skip HR rounds, interview directly with hiring managers',
      duration: '1-2 days after test',
      details: [
        'Scheduled within 48 hours of passing test',
        'Technical + cultural fit assessment',
        'Direct feedback from decision-makers'
      ]
    },
    {
      number: 3,
      icon: '📄',
      title: 'Offer Letter',
      description: 'Receive your official internship offer',
      duration: '24 hours after interview',
      details: [
        'Official offer letter with all terms',
        'Stipend and duration details',
        'Start date confirmation'
      ]
    },
    {
      number: 4,
      icon: '🚀',
      title: 'Start Internship',
      description: 'Begin your professional journey',
      duration: 'Within 1 week',
      details: [
        'Onboarding and orientation',
        'Mentor assignment',
        'Project allocation'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Your Path to Internship
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              In Just 4 Steps
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We've revolutionized the internship process. No more endless waiting, no uncertainty.
            Just a clear, fast path to your dream internship.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 transform -translate-x-1/2"></div>
          
          {/* Steps */}
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            {steps.map((step, idx) => (
              <div key={step.number} className={`relative ${idx % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}>
                {/* Step Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                  {/* Step Number */}
                  <div className={`absolute -top-4 ${idx % 2 === 0 ? 'lg:right-12 right-1/2 transform lg:translate-x-0 translate-x-1/2' : 'lg:left-12 left-1/2 transform lg:translate-x-0 -translate-x-1/2'}`}>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="text-center lg:text-left">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 mb-6">{step.description}</p>
                    
                    {/* Duration */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
                      <span className="text-sm font-semibold text-slate-700">{step.duration}</span>
                    </div>
                    
                    {/* Details */}
                    <ul className="space-y-3 text-left">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                          <span className="text-slate-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">Why Our Process Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: '⚡', 
                  title: '48-Hour Process', 
                  desc: 'From test to interview in 2 days max' 
                },
                { 
                  icon: '🎯', 
                  title: '98% Success Rate', 
                  desc: '7,000+ students placed successfully' 
                },
                { 
                  icon: '💰', 
                  title: 'Money-Back Guarantee', 
                  desc: '100% refund if no interview' 
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-indigo-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Start Your Journey?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              🚀 Start Free Skill Test
            </Link>
            <Link 
              to="/internships"
              className="border-2 border-slate-300 text-slate-700 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              📋 Browse Internships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringProcess;
