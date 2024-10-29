import { useMutation } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { UserProfileWithEmails } from '@/types/profile';

export const useUserProfileMutation = () => {
  const supabaseClient = useSupabaseClient();

  return useMutation({
    mutationFn: async (data: UserProfileWithEmails) => {
      const { user_key, user_name, bio, urls, emails } = data;

      const { error: profileError } = await supabaseClient
        .from('user_profile')
        .update(user_key, user_name, bio, urls)
        .eq('user_key', user_key);

      if (profileError) {
        throw new Error(`User profile update failed: ${profileError.message}`);
      }

      for (const emailData of emails) {
        const { error: emailError } = await supabaseClient
          .from('user_profile_email')
          .upsert(emailData, { onConflict: 'email' });

        if (emailError) {
          throw new Error(`Email update failed for ${emailData.email}: ${emailError.message}`);
        }
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
