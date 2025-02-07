import { fetchPosts, fetchComments } from '@/services/post';
import ArticleDetail from '../../_components/post-detail';
import { IPost } from '@/types/post';
import { fetchUserProfile } from '@/services/userProfile';
import { QueryClient } from '@tanstack/react-query';

export default async function PostDetail({ params }: { params: IPost }) {
  const posts = await fetchPosts();
  const filteredPost = posts?.find((post: IPost) => post.id === params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['comments', filteredPost?.id],
    queryFn: () => fetchComments(filteredPost?.id),
  });

  const { name: ownerName } = await fetchUserProfile(filteredPost?.user_id);

  return <ArticleDetail post={filteredPost} ownerName={ownerName} />;
}
