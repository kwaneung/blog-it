// app/auth/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { fetchUserProfile, createUserProfile } from '@/services/userProfile';
import { UserProfileWithUrls } from '@/types/profile';

const SignIn = () => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log('session :: ', session);
      console.log('fetchUserProfile start');
      fetchUserProfile(session?.user?.id!).then((data: UserProfileWithUrls) => {
        console.log('end :: ', data);
        const { urls: _, ...profile } = data;

        if (Object.keys(profile).length === 0) {
          console.log('프로필 없어 createUserProfile');
          createUserProfile(session?.user?.id!, session?.user?.user_metadata?.full_name!);
        }
      });
      // router.push('/');
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
        redirectTo={'http://localhost:3000/auth'}
        // socialLayout="horizontal"
        // view="sign_in"
        // showLinks={false}
      />
    </div>
  );
};

export default SignIn;
