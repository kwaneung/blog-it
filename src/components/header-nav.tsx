'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold md:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          Home
        </Link>
        <Link
          href="/posts"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/posts') ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          Posts
        </Link>
        <Link
          href="/questions"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/questions') ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          Questions
        </Link>
        <Link
          href="/settings"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/settings') ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}
