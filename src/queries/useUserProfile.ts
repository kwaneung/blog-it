import { useMutation } from '@tanstack/react-query';
import { useSession } from '@supabase/auth-helpers-react';
import { UserProfileWithUrls } from '@/types/profile';
import { updateUserProfile } from '@/services/userProfile';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@/services/userProfile';

export const useUserProfileMutation = () => {
  const session = useSession();
  const id = session?.user?.id;

  return useMutation({
    mutationFn: (data: UserProfileWithUrls) => updateUserProfile(id!, data),
    onError: (error) => {
      console.error('Error updating user profile:', error);
    },
    onSuccess: () => {
      console.log('User profile updated successfully');
    },
  });
};

export const useUserProfileQuery = () => {
  const session = useSession();
  const id = session?.user?.id;
  const { mutate: updateUserProfile } = useUserProfileMutation();

  const result = useQuery<UserProfileWithUrls>({
    queryKey: ['user_profile', id],
    queryFn: () => fetchUserProfile(id!),
    enabled: !!id, // id가 있을 때만 실행
  });

  if (!result.data) {
    const defaultProfile: UserProfileWithUrls = {
      name: session?.user?.user_metadata.name,
      bio: '',
      urls: [{ value: '' }],
    };
    updateUserProfile(defaultProfile);
    return { data: defaultProfile };
  }

  return result;
};
