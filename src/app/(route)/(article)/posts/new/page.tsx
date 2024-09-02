import { Metadata } from 'next';
import NewArticle from '@/components/new-entry/page';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'create post',
  description: '글쓰기',
};

interface IProps {
  searchParams: { type: string };
}

export default function New({ searchParams }: IProps) {
  return <NewArticle type={searchParams.type} />;
}
