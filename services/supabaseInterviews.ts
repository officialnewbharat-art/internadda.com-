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
  status?: 'awaiting_interview' | 'interview_scheduled' | 'interview_completed';
}

export const storeQualifiedCandidate = async (candidate: InterviewQualifiedCandidate) => {
  try {
    const { data, error } = await supabase
      .from('interview_qualified_candidates')
      .insert([candidate])
      .select();
    
    if (error) {
      console.error('Error storing qualified candidate:', error);
      throw error;
    }
    
    console.log('Candidate stored in database:', data);
    return data;
  } catch (error) {
    console.error('Failed to store candidate:', error);
    return null;
  }
};

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
