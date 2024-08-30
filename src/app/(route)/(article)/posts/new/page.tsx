import { Metadata } from 'next';
import NewArticle from '@/components/new-entry/page';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'create question',
  description: '질문 글쓰기',
};

export default function New() {
  return <NewArticle />;
}
