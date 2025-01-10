/**
 * 게시글 전체 조회
 */
export const fetchPosts = async () => {
  const response = await fetch('/api/post');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '게시글 조회에 실패했습니다');
  }
  const data = await response.json();
  return data.data; // API에서 반환된 posts 배열
};
