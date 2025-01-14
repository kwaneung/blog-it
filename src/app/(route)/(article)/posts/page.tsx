import { Metadata } from 'next';
import { columns } from '../_components/columns';
import { DataTable } from '../_components/data-table';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Posts',
  description: '기본 글',
};

export default function Posts() {
  return <DataTable columns={columns} type={'posts'} />;
}
