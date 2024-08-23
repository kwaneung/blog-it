'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const homeTabsInfo = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/cards',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/cards',
  },
  {
    name: 'Tasks',
    href: '/tasks',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/tasks',
  },
  {
    name: 'Playground',
    href: '/playground',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/playground',
  },
  {
    name: 'Forms',
    href: '/forms',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/forms',
  },
  {
    name: 'Music',
    href: '/music',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/music',
  },
  {
    name: 'Authentication',
    href: '/authentication',
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/authentication',
  },
];

interface IHomeNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HomeNav({ className, ...props }: IHomeNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn('mb-4 flex items-center', className)} {...props}>
          {homeTabsInfo.map((tab, index) => (
            <Link
              href={tab.href}
              key={tab.href}
              className={cn(
                'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                pathname?.startsWith(tab.href) || (index === 0 && pathname === '/')
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

interface ITabCodeLinkProps {
  pathname: string | undefined;
}

export function ExampleCodeLink({ pathname }: ITabCodeLinkProps) {
  const tab = homeTabsInfo.find((tab) => pathname?.startsWith(tab.href));

  if (!tab?.code) {
    return null;
  }

  return (
    <Link
      href={tab?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
