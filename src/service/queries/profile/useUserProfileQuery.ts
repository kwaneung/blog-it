import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useUserProfileQuery = (email: string | undefined) => {
  const supabaseClient = useSupabaseClient();
  return useQuery({
    queryKey: ['user_profile', email],
    queryFn: async () => {
      if (!email) throw new Error('User email is required');

      const { data, error } = await supabaseClient
        .from('user_profile')
        .select('*')
        .eq('user_key', email);

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    },
    enabled: !!email, // email이 있을 때만 쿼리 실행
  });
};
