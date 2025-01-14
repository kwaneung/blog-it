import './globals.css';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster as DefaultToaster } from '@/components/ui/toaster';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import SupabaseProvider from './_components/SupabaseProvider';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { fetchUserProfile } from '@/services/userProfile';

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IRootLayoutProps) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user?.id;

  const queryClient = new QueryClient();

  if (id) {
    await queryClient.prefetchQuery({
      queryKey: ['user_profile', id],
      queryFn: () => fetchUserProfile(id),
    });
  }

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col bg-background">
                <SupabaseProvider>
                  <HydrationBoundary state={dehydrate(queryClient)}>
                    <SiteHeader />
                    {children}
                    <SiteFooter />
                  </HydrationBoundary>
                </SupabaseProvider>
              </div>
            </div>
            <TailwindIndicator />
            <ThemeSwitcher />
            <DefaultToaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
