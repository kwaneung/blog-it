'use client';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { CommandMenu } from '@/components/command-menu';
import { Icons } from '@/components/icons';
import { HeaderNav } from '@/components/header-nav';
import { MobileNav } from '@/components/mobile-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import LoginDialog from './ui/LoginDialog';

import { UserNav } from './user-nav';

import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

export function SiteHeader() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 로그인 여부에 따른 헤더 분기
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <HeaderNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0',
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
            {isLogin ? <UserNav /> : <LoginDialog />}
          </nav>
        </div>
      </div>
    </header>
  );
}
