import { UserNav } from './posts/_components/user-nav';

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  // TODO zustand 전역 상태를 통해 layout 문구 동적 노출 필요

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
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
