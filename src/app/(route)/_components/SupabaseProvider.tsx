// SupabaseProvider.tsx
'use client';

import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface ISupabaseProviderProp {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<ISupabaseProviderProp> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
  );
};

export default SupabaseProvider;
