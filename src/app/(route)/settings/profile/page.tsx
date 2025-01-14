import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import { fetchUserProfile } from '@/services/userProfile';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const id = session?.user?.id;
  const profile = await fetchUserProfile(id!);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm profile={profile} />
    </div>
  );
}
