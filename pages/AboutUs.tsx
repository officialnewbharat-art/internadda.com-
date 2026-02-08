import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
const teamMembers = [
  {
    id: 1,
    name: 'Lucky Tiwari',
    role: 'Founder & CEO',
    education: 'Entrepreneur | EdTech & AI',
    image: 'https://iili.io/fbR5Kkx.png',
    bio: 'Building InternAdda to bridge the gap between students and real industry experience.',
    linkedin: 'https://www.linkedin.com/in/luckytiwari/'  
  },
  {
    id: 2,
    name: 'Vikash Yadav',
    role: 'Co-Founder & PR Head',
    education: 'Public Relations & Brand Strategy',
    image: 'https://iili.io/fbRADV1.png',
    bio: 'Managing partnerships, outreach, and public relations for InternAdda.',
    linkedin: 'https://www.linkedin.com/in/vikash-yadav-626097313/'
  },
  {
    id: 3,
    name: 'Sumit Pandey',
    role: 'CTO',
    education: 'Full Stack Developer | System Architect',
    image: 'https://iili.io/fbRAyla.png',
    bio: 'Leading the tech vision and platform development.',
    linkedin: 'https://www.linkedin.com/in/sumit-pandey-a94a052a1/'
  },
  {
    id: 4,
    name: 'Pranjal Singh',
    role: 'COO',
    education: 'Operations & Growth Strategy',
    image: 'https://iili.io/fbRRJHv.png',
    bio: 'Handling day-to-day operations and scaling the organization.',
    linkedin: 'https://www.linkedin.com/in/pranjal-singh-204580374/'
  }
];

  const milestones = [
    { year: '2021', title: 'Founded', desc: 'Started with a vision to revolutionize internships' },
    { year: '2022', title: 'First 1000 Students', desc: 'Placed 1000+ students in top companies' },
    { year: '2023', title: 'MSME Certification', desc: 'Received government MSME certification' },
    { year: '2024', title: '7,000+ Students', desc: 'Expanded to 150+ partner companies' },
    { year: '2025', title: 'National Recognition', desc: 'Featured in leading education platforms' }
  ];

  const successStories = [
    {
      name: 'Aarav Sharma',
      college: 'BHU',
      role: 'Software Engineer @ Internadda',
      image: 'https://iili.io/fmKACQa.jpg',
      quote: "Internadda changed my life. From test to Internship offer in 3 days.",
      stats: { placedIn: '3 days', salary: '₹15K' }
    },
    {
      name: 'Payal Mittal',
      college: 'Amity University',
      role: 'HR Manager @ Internadda',
      image: 'https://iili.io/fmLWXGs.png',
      quote: "The direct interview process eliminated months of uncertainty.",
      stats: { placedIn: '48 hours', salary: '₹10K' }
    },
    {
      name: 'Anurag Tiwari',
      college: 'Delhi University',
      role: 'Chief Marketing Officer @ Internadda',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: "Skill-based assessment got me noticed by the right people.",
      stats: { placedIn: '5 days', salary: '₹20K' }
    }
  ];

  const emotionalImpact = [
    {
      icon: '💖',
      title: 'Dreams Realized',
      desc: '7000+ students transformed from learners to earners'
    },
    {
      icon: '🚀',
      title: 'Careers Launched',
      desc: 'Average placement time: 48 hours from assessment'
    },
    {
      icon: '🤝',
      title: 'Trust Built',
      desc: '98.2% of students recommend us to friends'
    },
    {
      icon: '🏆',
      title: 'Excellence Delivered',
      desc: 'Top-tier companies trust our assessment process'
    }
  ];

  const brandRecognition = [
    { logo: '🏛️', name: 'MSME Certified', desc: 'Government Recognized' },
    { logo: '📈', name: 'Tracxn Top 10', desc: 'EdTech 2024' },
    { logo: '🏆', name: 'YourStory', desc: 'Startup of Month' },
    { logo: '💼', name: '150+ Companies', desc: 'Partner Network' }
  ];

  // Fixed SVG data URL - properly escaped
  const bgPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section with Premium Feel */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("${bgPattern}")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-indigo-100 shadow-sm mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-indigo-700">India's Most Trusted Internship Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Where Dreams Meet{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Opportunities
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl transform translate-y-2"></span>
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              We don't just place interns. We launch careers, build confidence, and create success stories. 
              Join 7,000+ students who transformed their lives with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/internships"
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10">🚀 Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/success-stories"
                className="group bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-xl font-bold text-lg hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
              >
                <span className="relative z-10">🌟 Read Success Stories</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Impact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            More Than Just Internships
            <span className="block text-2xl text-slate-600 mt-4">
              We're building futures, one student at a time
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {emotionalImpact.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Showcase */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Real Stories, Real Impact</h2>
              <p className="text-slate-600">Meet the faces behind our success</p>
            </div>
            <Link 
              to="/success-stories"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2 group"
            >
              View All Stories
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{story.name}</h3>
                        <p className="text-sm text-slate-600">{story.college}</p>
                        <p className="text-sm font-semibold text-indigo-600">{story.role}</p>
                      </div>
                    </div>

                    <p className="text-slate-700 italic mb-6 border-l-4 border-indigo-200 pl-4 py-2">
                      "{story.quote}"
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                        <div className="text-lg font-bold text-emerald-700">{story.stats.placedIn}</div>
                        <div className="text-xs text-emerald-600">Placement Time</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                        <div className="text-lg font-bold text-blue-700">{story.stats.salary}</div>
                        <div className="text-xs text-blue-600">Stipend</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Certificate Showcase */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Your Success, Documented
              <span className="block text-2xl text-slate-300 mt-4">
                Professional certificates that open doors
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-6">Industry-Recognized Credentials</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Every successful candidate receives a premium certificate that's recognized by 
                  150+ companies. It's not just paper—it's proof of your skills and dedication.
                </p>
                
                <ul className="space-y-4">
                  {[
                    '🏛️ MSME Certified - Government recognized',
                    '💼 Company Branded - With partner logos',
                    '🔗 LinkedIn Ready - Optimized for profiles',
                    '📱 QR Verified - Instant authenticity check',
                    '🎯 Skill Specific - Shows exact competencies'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-200">
                      <span className="text-lg">{feature.split(' ')[0]}</span>
                      <span>{feature.substring(3)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/internships"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <span>Apply Now for Your Certificate</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-6">🎓</div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Your Future Certificate</h4>
                  <p className="text-slate-600 mb-6">
                    Complete an internship to unlock your personalized, industry-recognized certificate
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-emerald-700">Ready in 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Recognition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Trusted by the Best
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our commitment to excellence has earned us recognition from leading institutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {brandRecognition.map((brand, idx) => (
            <div key={idx} className="text-center p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-4xl mb-4">{brand.logo}</div>
              <div className="font-bold text-slate-900 mb-2">{brand.name}</div>
              <div className="text-sm text-slate-600">{brand.desc}</div>
            </div>
          ))}
        </div>

        {/* Meet the Team - Premium */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Visionaries Behind Your Success</h2>
            <p className="text-slate-600">Meet the team dedicated to transforming student careers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl border border-slate-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden mb-4 border-4 border-white shadow-lg">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <span class="text-indigo-600 font-bold text-2xl">
                                ${member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            `;
                          }
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{member.name}</h3>
                    <p className="text-sm text-indigo-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-xs text-slate-500 mb-3">{member.education}</p>
                    <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                    
                    <a 
                      href={member.linkedin}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium group/link"
                    >
                      <span>Connect</span>
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.41z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 text-center">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("${bgPattern}")`,
            backgroundSize: '60px 60px'
          }}></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands who transformed "I wish" into "I did" with Internadda
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/internships"
                className="group bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <span className="flex items-center justify-center gap-3">
                  🚀 Apply for Premium Internships
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                to="/success-stories"
                className="group border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  ✨ Get Inspired
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
            
            <p className="text-sm text-indigo-200 mt-8">
              Join 7,000+ successful students • 98.2% satisfaction rate • 48-hour placement process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
