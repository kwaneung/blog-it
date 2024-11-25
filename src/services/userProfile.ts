import { UserProfileWithUrls } from '@/types/profile';

/**
 * 사용자 프로필 조회
 */
export const fetchUserProfile = async (id: string) => {
  if (!id) throw new Error('User ID is required');

  const response = await fetch(`/api/user/profile?id=${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch user profile');
  }

  const data = await response.json();
  return data.data; // API의 `data` 필드 반환
};

/**
 * 사용자 프로필 수정
 */
export const updateUserProfile = async (id: string, data: UserProfileWithUrls) => {
  const response = await fetch('/api/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update user profile');
  }

  return await response.json();
};
