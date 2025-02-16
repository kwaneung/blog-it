import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchComments, addComment } from '@/services/post';

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

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      userId,
      content,
    }: {
      postId: string;
      userId: string;
      content: string;
    }) => addComment(postId, userId, content),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEY.COMMENTS, postId] });
    },
  });
}
