import { Metadata } from 'next';

import { columns } from '../_components/columns';
import { DataTable } from '../_components/data-table';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchPosts } from '@/services/post';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Posts',
  description: '기본 글',
};

export default async function Posts() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable columns={columns} type={'posts'} />
    </HydrationBoundary>
  );
}
