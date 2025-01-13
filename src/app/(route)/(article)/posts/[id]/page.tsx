import { fetchPosts } from '@/services/post';
import ArticleDetail from '../../_components/post-detail';
import { IPost } from '@/types/post';
import { fetchUserProfile } from '@/services/userProfile';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function PostDetail({ params }: { params: IPost }) {
  const supabase = createServerComponentClient({ cookies });
  const posts = await fetchPosts();
  const filteredPost = posts?.find((post: IPost) => post.id === params.id);

  const { name: ownerName } = await fetchUserProfile(filteredPost?.user_id);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user?.id;
  const { name: myName } = await fetchUserProfile(id!);

  return <ArticleDetail post={filteredPost} type={'posts'} ownerName={ownerName} myName={myName} />;
}
