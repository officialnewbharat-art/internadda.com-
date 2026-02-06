import React from 'react';
import { Link } from 'react-router-dom';

const SuccessStories: React.FC = () => {
  const stories = [
    {
      id: 1,
      name: 'Rahul Sharma',
      college: 'IIT Delhi',
      role: 'SWE Intern @ Google',
      image: 'https://picsum.photos/seed/rahul/200',
      quote: 'Got my Google internship through Internadda. The process was super smooth!',
      score: 92,
      timeline: '2 days from test to offer'
    },
    {
      id: 2,
      name: 'Priya Patel',
      college: 'NIT Trichy',
      role: 'Product Intern @ Microsoft',
      image: 'https://picsum.photos/seed/priya/200',
      quote: 'From test to offer in 3 days! Never seen such an efficient platform.',
      score: 88,
      timeline: '3 days total process'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      college: 'BITS Pilani',
      role: 'Data Science Intern @ Amazon',
      image: 'https://picsum.photos/seed/amit/200',
      quote: 'The MSME certification gave me confidence. Legit platform with real opportunities.',
      score: 95,
      timeline: '48 hours process'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      college: 'Delhi University',
      role: 'Marketing Intern @ Unacademy',
      image: 'https://picsum.photos/seed/neha/200',
      quote: 'As a non-tech student, I found amazing opportunities here. Highly recommended!',
      score: 85,
      timeline: '4 days process'
    },
    {
      id: 5,
      name: 'Siddharth Rao',
      college: 'IIM Ahmedabad',
      role: 'Business Analyst Intern @ McKinsey',
      image: 'https://picsum.photos/seed/siddharth/200',
      quote: 'Direct interview with the manager made all the difference. No HR rounds!',
      score: 90,
      timeline: '3 days process'
    },
    {
      id: 6,
      name: 'Ananya Singh',
      college: 'SRM University',
      role: 'UI/UX Intern @ Adobe',
      image: 'https://picsum.photos/seed/ananya/200',
      quote: 'The certificate and LinkedIn recommendation boosted my profile significantly.',
      score: 87,
      timeline: '5 days process'
    }
  ];

  const stats = [
    { value: '7,000+', label: 'Students Placed' },
    { value: '98.2%', label: 'Success Rate' },
    { value: '48h', label: 'Average Process Time' },
    { value: '150+', label: 'Partner Companies' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Success Stories
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              From Our Students
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join 7,000+ students who transformed their careers through Internadda's 
            skill-based assessment platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* Student Info */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <span class="text-indigo-600 font-bold text-lg">
                              ${story.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          `;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{story.name}</h3>
                    <p className="text-sm text-slate-600">{story.college}</p>
                    <p className="text-sm font-semibold text-indigo-600">{story.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-6">
                  <div className="text-amber-400 text-lg mb-2">★★★★★</div>
                  <p className="text-slate-700 italic">"{story.quote}"</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                    <div className="text-lg font-bold text-emerald-700">{story.score}%</div>
                    <div className="text-xs text-emerald-600">Test Score</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="text-lg font-bold text-blue-700">{story.timeline}</div>
                    <div className="text-xs text-blue-600">Process Time</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Watch Their Journey</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              See how students transformed their careers with Internadda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((video) => (
              <div key={video} className="aspect-video bg-slate-700/50 rounded-xl border border-slate-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">▶️</span>
                  </div>
                  <p className="text-sm text-slate-300">Video Testimonial {video}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Join thousands of successful students who launched their careers with Internadda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                🚀 Start Your Journey
              </Link>
              <Link 
                to="/internships"
                className="border-2 border-slate-300 text-slate-700 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                📋 View Openings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
