import React from 'react';
import { Link } from 'react-router-dom';

const TeamPage: React.FC = () => {
  const teamMembers = [
const teamMembers = [
  {
    id: 1,
    name: 'Lucky Tiwari',
    role: 'Founder & CEO',
    education: 'Entrepreneur | EdTech & AI',
    image: 'https://iili.io/fbR5Kkx.png',
    bio: 'Building InternAdda to bridge the gap between students and real-world industry experience.',
    linkedin: '#',
    twitter: '#',
    expertise: ['EdTech', 'AI Strategy', 'Leadership', 'Startup Growth']
  },
  {
    id: 2,
    name: 'Vikash Yadav',
    role: 'Co-Founder & PR Head',
    education: 'Public Relations & Brand Communication',
    image: 'https://iili.io/fbRADV1.png',
    bio: 'Leads partnerships, outreach, and brand positioning for InternAdda.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Public Relations', 'Brand Strategy', 'Partnerships', 'Community Building']
  },
  {
    id: 3,
    name: 'Sumit Pandey',
    role: 'CTO',
    education: 'Full Stack Engineer | System Architect',
    image: 'https://iili.io/fbRAyla.png',
    bio: 'Driving the technical vision and building scalable platforms for students.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Full Stack', 'System Architecture', 'AI/ML', 'Cloud']
  },
  {
    id: 4,
    name: 'Pranjal Singh',
    role: 'COO',
    education: 'Operations & Growth Management',
   image: 'https://iili.io/fbRRJHv.png',
    bio: 'Oversees operations, execution, and scaling of InternAdda.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Operations', 'Process Building', 'Business Strategy', 'Scaling']
  },
  {
    id: 5,
    name: 'Aarav Sharma',
    role: 'Software Engineer @ Internadda',
    education: 'BHU',
    image: 'https://iili.io/fmKACQa.jpg',
    bio: 'Internadda changed my life. From test to internship offer in just 3 days.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Software Development', 'Problem Solving', 'Web Technologies']
  },
  {
    id: 6,
    name: 'Payal Mittal',
    role: 'HR Manager @ Internadda',
    education: 'Amity University',
    image: 'https://iili.io/fmLWXGs.png',
    bio: 'The direct interview process eliminated months of uncertainty.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Human Resources', 'Recruitment', 'Talent Management']
  },
  {
    id: 7,
    name: 'Anurag Tiwari',
    role: 'Chief Marketing Officer @ Internadda',
    education: 'Delhi University',
    image: 'https://iili.io/fmQq6Sp.jpg',
    bio: 'Skill-based assessment got me noticed by the right people.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Marketing Strategy', 'Brand Growth', 'Digital Campaigns']
  },
  {
    id: 8,
    name: 'Siddharth Rao',
    role: 'Web Developer @ Internadda',
    education: 'IP University',
    image: 'https://iili.io/fmKMQPS.jpg',
    bio: 'Skill-based assessment got me noticed by the right people.',
    linkedin: '#',
    twitter: '#',
    expertise: ['Web Development', 'Frontend', 'UI Integration']
  }
  ];

  const advisors = [
    {
      name: 'Dr. Sanjay Mehta',
      role: 'Academic Advisor',
      position: 'Professor, IIT Bombay',
      image: 'https://picsum.photos/seed/sanjayadvisor/300',
      bio: 'Leading researcher in education technology and skill development.'
    },
    {
      name: 'Rina Kapoor',
      role: 'Industry Advisor',
      position: 'Director, Google India',
      image: 'https://picsum.photos/seed/rinaadvisor/300',
      bio: 'Expert in tech hiring and industry-academia collaboration.'
    },
    {
      name: 'Arjun Malhotra',
      role: 'Startup Advisor',
      position: 'Angel Investor',
      image: 'https://picsum.photos/seed/arjunadvisor/300',
      bio: 'Serial entrepreneur with multiple successful EdTech exits.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Meet Our Team
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Passionate Minds Behind Internadda
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're a diverse team of educators, technologists, and industry experts 
            united by a common mission: to help every student find their dream internship.
          </p>
        </div>

        {/* Core Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                {/* Member Image */}
                <div className="h-48 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <span class="text-indigo-600 font-bold text-3xl">
                              ${member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                
                {/* Member Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-slate-500 mb-4">{member.education}</p>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">{member.bio}</p>
                  
                  {/* Expertise */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Expertise</div>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a 
                      href={member.linkedin}
                      className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.41z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.twitter}
                      className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Advisors & Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden mb-6 border-4 border-white shadow-lg">
                  <img 
                    src={advisor.image} 
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <span class="text-indigo-600 font-bold text-2xl">
                            ${advisor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        `;
                      }
                    }}
                  />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">{advisor.name}</h3>
                <p className="text-indigo-600 font-semibold mb-2">{advisor.role}</p>
                <p className="text-sm text-slate-500 mb-4">{advisor.position}</p>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Values */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We believe in creating an environment where everyone can do their best work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'Collaborative',
                desc: 'We work together across functions to achieve common goals'
              },
              {
                icon: '🎯',
                title: 'Student-First',
                desc: 'Every decision is measured by its impact on student success'
              },
              {
                icon: '🚀',
                title: 'Innovative',
                desc: 'We constantly seek better ways to solve problems'
              },
              {
                icon: '💪',
                title: 'Ownership',
                desc: 'Everyone takes responsibility for outcomes'
              },
              {
                icon: '🌈',
                title: 'Diverse',
                desc: 'We value different perspectives and backgrounds'
              },
              {
                icon: '❤️',
                title: 'Caring',
                desc: 'We support each other\'s growth and well-being'
              }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-slate-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Want to Join Our Team?</h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            We're always looking for passionate people who want to make a difference in education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@internadda.com"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              View Open Positions
            </a>
            <Link 
              to="/about"
              className="border-2 border-slate-300 text-slate-700 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
