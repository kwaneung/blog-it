import { Metadata } from 'next';

import { columns } from '../_components/columns';
import { DataTable } from '../_components/data-table';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Questions',
  description: '질문 글',
};

export default async function Questions() {
  return <DataTable columns={columns} type={'questions'} />;
}
