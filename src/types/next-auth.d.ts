// src/types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    firebaseToken?: string; // firebaseToken을 Session 타입에 추가
  }
}
