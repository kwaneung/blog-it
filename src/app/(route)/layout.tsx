import './globals.css';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
// import { Analytics } from '@/components/analytics';
import { ThemeProvider } from '@/components/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster as DefaultToaster } from '@/components/ui/toaster';
// import { Toaster as NewYorkSonner } from '@/components/ui/sonner';
// import { Toaster as NewYorkToaster } from '@/components/ui/toaster';

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
                  <main className="flex-1">{children}</main>
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
