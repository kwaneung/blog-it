import { useQuery } from '@tanstack/react-query';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { UserProfileWithUrls } from '@/types/profile';

export const useUserProfileQuery = () => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const id = session?.user?.id;

  return useQuery<UserProfileWithUrls>({
    queryKey: ['user_profile', id],
    queryFn: async () => {
      if (!id) throw new Error('User id is required');

      const { data: userProfile, error: userProfileError } = await supabaseClient
        .from('user_profile')
        .select('email, bio, name')
        .eq('id', id);

      if (userProfileError) {
        throw new Error(userProfileError.message);
      }

      // const { data: userEmails, error: userEmailsError } = await supabaseClient
      //   .from('user_profile_email')
      //   .select('email')
      //   .eq('id', id);

      // if (userEmailsError) {
      //   throw new Error(userEmailsError.message);
      // }

      const { data: userUrls, error: userUrlsError } = await supabaseClient
        .from('user_profile_url')
        .select('url')
        .eq('id', id);

      if (userUrlsError) {
        throw new Error(userUrlsError.message);
      }

      const mappedUrls = userUrls.map((urlObj) => ({
        value: urlObj.url,
      }));

      const result = { ...userProfile[0], urls: mappedUrls };

      return result;
    },
    enabled: !!id, // email이 있을 때만 쿼리 실행
  });
};
