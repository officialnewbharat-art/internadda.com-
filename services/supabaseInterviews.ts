import { supabase } from './supabaseClient';

export interface InterviewQualifiedCandidate {
  user_id: string;
  student_name: string;
  student_email: string;
  student_phone?: string;
  internship_id: string;
  internship_title: string;
  company: string;
  category: string;
  score: number;
  status?: string;
}

/**
 * Stores a candidate who has passed the assessment into the 
 * interview_qualified_candidates table.
 */
export const storeQualifiedCandidate = async (candidate: InterviewQualifiedCandidate) => {
  try {
    const { data, error } = await supabase
      .from('interview_qualified_candidates')
      .insert([
        {
          user_id: candidate.user_id,
          student_name: candidate.student_name,
          student_email: candidate.student_email,
          student_phone: candidate.student_phone,
          internship_id: candidate.internship_id,
          internship_title: candidate.internship_title,
          company: candidate.company,
          category: candidate.category,
          score: candidate.score,
          status: candidate.status || 'awaiting_interview'
        }
      ])
      .select();
    
    if (error) {
      console.error('Error storing qualified candidate:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to store candidate:', error);
    return null;
  }
};

/**
 * Fetches qualified candidates, optionally filtered by user_id.
 */
export const getQualifiedCandidates = async (userId?: string) => {
  try {
    let query = supabase
      .from('interview_qualified_candidates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching qualified candidates:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch candidates:', error);
    return [];
  }
};
