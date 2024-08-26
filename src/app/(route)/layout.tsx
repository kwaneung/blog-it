import './globals.css';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster as DefaultToaster } from '@/components/ui/toaster';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
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
                <>
                  <SiteHeader />
                  {/* <main className="flex-1"> */}
                  {/* <div className="container relative"> */}
                  {/* <PageHeader>
                        <Announcement />
                        <PageHeaderHeading className="hidden md:block">
                          Check out some examples
                        </PageHeaderHeading>
                        <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
                        <PageHeaderDescription>
                          Dashboard, cards, authentication. Some examples built using the
                          components. Use this as a guide to build your own.
                        </PageHeaderDescription>
                        <PageActions>
                          <Link href="/docs" className={cn(buttonVariants(), 'rounded-[6px]')}>
                            Get Started
                          </Link>
                          <Link
                            href="/components"
                            className={cn(buttonVariants({ variant: 'outline' }), 'rounded-[6px]')}
                          >
                            Components
                          </Link>
                        </PageActions>
                      </PageHeader> */}
                  {/* <section> */}
                  {/* <HomeNav /> */}
                  {/* <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow"> */}
                  {children}
                  {/* </div> */}
                  {/* </section> */}
                  {/* </div> */}
                  {/* </main> */}
                  <SiteFooter />
                </>
              </div>
            </div>
            <TailwindIndicator />
            <ThemeSwitcher />
            {/* <Analytics /> */}
            {/* <NewYorkToaster /> */}
            <DefaultToaster />
            {/* <NewYorkSonner /> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
