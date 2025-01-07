import ArticleDetail from '../../_components/post-detail';
import { IPost } from '@/types/post';

export default function PostDetail({ params }: { params: IPost }) {
  console.log('postDetail :: ', params);
  return <ArticleDetail id={params.id} type={'posts'} />;
}
