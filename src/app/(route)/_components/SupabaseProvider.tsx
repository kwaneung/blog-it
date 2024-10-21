// SupabaseProvider.tsx
'use client';

import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ISupabaseProviderProp {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<ISupabaseProviderProp> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient());
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
    </QueryClientProvider>
  );
};

export default SupabaseProvider;
