import ArticleDetail from '../../_components/post-detail';

export default function PostDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  console.log('questionDetail :: ', params);
  return <ArticleDetail id={params.id} type={'questions'} />;
}
