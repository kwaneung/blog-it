// app/auth/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const SignIn = () => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/'); // Redirect to the root page if the user is already logged in
    }
  }, [session, router]);

  return (
    <div className="h-full flex justify-center items-center">
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          style: { container: { width: '300px' } },
        }}
        providers={['kakao']}
        localization={{}}
        onlyThirdPartyProviders
      />
    </div>
  );
};

export default SignIn;
