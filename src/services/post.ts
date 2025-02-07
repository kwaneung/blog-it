import { getBaseUrl } from '@/utils/url';

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
  return data.data;
};
