import { UserNav } from '../_components/user-nav';

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
            <p className="text-muted-foreground">이곳에서 글을 쓰세요!</p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
