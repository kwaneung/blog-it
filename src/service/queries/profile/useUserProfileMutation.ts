import { useMutation } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { UserProfileWithEmails } from '@/types/profile';

export const useUserProfileMutation = () => {
  const supabaseClient = useSupabaseClient();

  return useMutation({
    mutationFn: async (data: UserProfileWithEmails) => {
      const { user_key, user_name, bio, urls, emails } = data;

      // user_profile 테이블 업데이트
      const { error: userProfileError } = await supabaseClient
        .from('user_profile')
        .update({ user_name, bio, urls })
        .eq('user_key', user_key);

      if (userProfileError) {
        throw new Error(userProfileError.message);
      }

      // user_profile_email 테이블 업데이트 (기존 데이터 삭제 후 새로 추가)
      const { error: deleteEmailsError } = await supabaseClient
        .from('user_profile_email')
        .delete()
        .eq('user_key', user_key);

      if (deleteEmailsError) {
        throw new Error(deleteEmailsError.message);
      }

      const emailInsertData = emails.map((email) => ({
        user_key: user_key,
        email: email.email,
        is_default: email.is_default,
      }));

      const { error: insertEmailsError } = await supabaseClient
        .from('user_profile_email')
        .insert(emailInsertData);

      if (insertEmailsError) {
        throw new Error(insertEmailsError.message);
      }

      return { success: true };
    },
    onError: (error) => {
      console.error('Error updating user profile:', error);
    },
    onSuccess: () => {
      console.log('User profile updated successfully');
    },
  });
};
