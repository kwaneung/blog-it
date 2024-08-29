import { Metadata } from 'next';
import NewEntry from '@/components/new-entry/page';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'create ??',
  description: '?? 글쓰기',
};

export default function New() {
  return <NewEntry />;
}
