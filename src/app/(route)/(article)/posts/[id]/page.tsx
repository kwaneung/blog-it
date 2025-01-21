import { fetchPosts } from '@/services/post';
import ArticleDetail from '../../_components/post-detail';
import { IPost } from '@/types/post';
import { fetchUserProfile } from '@/services/userProfile';

export default async function PostDetail({ params }: { params: IPost }) {
  const posts = await fetchPosts();
  const filteredPost = posts?.find((post: IPost) => post.id === params.id);

  const { name: ownerName } = await fetchUserProfile(filteredPost?.user_id);

  return <ArticleDetail post={filteredPost} ownerName={ownerName} />;
}
