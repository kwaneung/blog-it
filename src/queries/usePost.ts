import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchComments } from '@/services/post';

export const QUERY_KEY = {
  POSTS: ['posts'],
  COMMENTS: ['comments'],
} as const;

export function usePosts() {
  return useQuery({
    queryKey: QUERY_KEY.POSTS,
    queryFn: fetchPosts,
  });
}

export function useComments(postId: string) {
  return useQuery({
    queryKey: [...QUERY_KEY.COMMENTS, postId],
    queryFn: () => fetchComments(postId),
  });
}
