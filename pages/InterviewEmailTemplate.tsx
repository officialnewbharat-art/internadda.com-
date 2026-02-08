import React from 'react';

const InterviewEmailTemplate: React.FC<{
  studentName: string;
  company: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  meetingLink: string;
  interviewer: string;
}> = ({ studentName, company, position, interviewDate, interviewTime, meetingLink, interviewer }) => {
  return `
Subject: Congratulations! Interview Scheduled with ${company} for ${position}

Dear ${studentName},

🎉 Congratulations on qualifying for the interview round!

Your performance in the skill assessment was impressive, and ${company} would like to schedule an interview with you.

📅 Interview Details:
- Position: ${position}
- Company: ${company}
- Date: ${interviewDate}
- Time: ${interviewTime} (IST)
- Interviewer: ${interviewer}
- Platform: Google Meet

🔗 Meeting Link: ${meetingLink}

📝 Preparation Tips:
1. Review the job description thoroughly
2. Prepare examples of your previous work
3. Have questions ready about the role
4. Test your camera and microphone beforehand
5. Join 5 minutes early

📧 For any queries, contact: hiring@arjunai.com
📞 Support: +91 98765 43210

We wish you the best of luck!

Best regards,
InternAdda Team & ${company} Hiring Team

---
This is an automated email. Please do not reply directly to this message.
  `;
};

export default InterviewEmailTemplate;
