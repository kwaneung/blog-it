'use client';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SessionProvider } from 'next-auth/react';

interface IProps {
  children: React.ReactNode;
}

export default function AuthSession({ children }: IProps) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log('로그인 :::: ', uid);
      console.log('user :: ', user);
      // ...
    } else {
      // User is signed out
      // ...
      alert('로그아웃');
    }
  });

  return <SessionProvider>{children}</SessionProvider>;
}
