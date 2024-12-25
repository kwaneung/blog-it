import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/services/post';

export const QUERY_KEY = {
  POSTS: ['posts'],
} as const;

export function usePosts() {
  return useQuery({
    queryKey: QUERY_KEY.POSTS,
    queryFn: fetchPosts,
  });
}
