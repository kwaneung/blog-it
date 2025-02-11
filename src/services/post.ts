import { getBaseUrl } from '@/utils/url';
import { fetchUserProfile } from './userProfile';
/**
 * 게시글 전체 조회
 */
export const fetchPosts = async () => {
  const response = await fetch(`${getBaseUrl()}/api/post`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '게시글 조회에 실패했습니다');
  }
  const data = await response.json();
  return data.data;
};

/**
 * 댓글 조회
 */
export const fetchComments = async (postId?: string) => {
  const url = postId
    ? `${getBaseUrl()}/api/comment?postId=${postId}`
    : `${getBaseUrl()}/api/comment`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '댓글 조회에 실패했습니다');
  }
  const data = await response.json();

  // Promise.all을 사용하여 각 댓글의 사용자 프로필을 조회하고 결과를 매핑
  const commentsWithUserProfile = await Promise.all(
    data.data.map(async (comment: any) => {
      const userProfile = await fetchUserProfile(comment.user_id);
      return {
        ...comment,
        avatarUrl: userProfile.avatar_url,
        userName: userProfile.name,
      };
    }),
  );

  return commentsWithUserProfile;
};
