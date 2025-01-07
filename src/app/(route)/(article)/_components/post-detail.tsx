'use client';

import { usePosts } from '@/queries/usePost';
import { IPost } from '@/types/post';

export default function ArticleDetail({ id, type }: { id: string; type: string }) {
  const { data: posts } = usePosts();
  console.log('posts :: ', posts);
  const filteredPost = posts?.find((post: IPost) => post.id === id);
  console.log('filteredPost :: ', filteredPost);
  return (
    <div>
      {id} {type} ArticleDetail
    </div>
  );
}
