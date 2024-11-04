import { useMutation } from '@tanstack/react-query';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { IUserUrl, UserProfileWithUrls } from '@/types/profile';

export const useUserProfileMutation = () => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const id = session?.user?.id;

  return useMutation({
    mutationFn: async (data: UserProfileWithUrls) => {
      const { name, bio, urls } = data;

      // user_profile 테이블 업데이트
      const { error: userProfileError } = await supabaseClient
        .from('user_profile')
        .update({ name, bio })
        .eq('id', id);

      if (userProfileError) {
        throw new Error(userProfileError.message);
      }

      // user_profile_url 테이블 업데이트 (기존 데이터 삭제 후 새로 추가)
      const { error: deleteUrksError } = await supabaseClient
        .from('user_profile_url')
        .delete()
        .eq('id', id);

      if (deleteUrksError) {
        throw new Error(deleteUrksError.message);
      }

      const urlInsertData = urls.map((url: IUserUrl) => ({
        id: id,
        url: url.value,
      }));

      const { error: insertUrlError } = await supabaseClient
        .from('user_profile_url')
        .insert(urlInsertData);

      if (insertUrlError) {
        throw new Error(insertUrlError.message);
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
