import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useUserProfileQuery = (email: string | undefined) => {
  const supabaseClient = useSupabaseClient();
  return useQuery({
    queryKey: ['user_profile', email],
    queryFn: async () => {
      if (!email) throw new Error('User email is required');

      const { data: userProfile, error: userProfileError } = await supabaseClient
        .from('user_profile')
        .select('*')
        .eq('user_key', email);

      if (userProfileError) {
        throw new Error(userProfileError.message);
      }

      const { data: userEmails, error: userEmailsError } = await supabaseClient
        .from('user_profile_email')
        .select('email, is_default')
        .eq('user_key', email);

      if (userEmailsError) {
        throw new Error(userEmailsError.message);
      }

      const result = { ...userProfile[0], emails: userEmails };

      return result;
    },
    enabled: !!email, // email이 있을 때만 쿼리 실행
  });
};
