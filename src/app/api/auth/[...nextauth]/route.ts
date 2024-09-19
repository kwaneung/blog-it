import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt'; // JWT 타입 가져오기
import { Session } from 'next-auth'; // Session 타입 가져오기
import NaverProvider from 'next-auth/providers/naver';
import { createFirebaseCustomToken, getFirebaseUidByEmail } from '@/lib/firebaseAdmin';

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    // 기타 로그인 프로바이더
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: { id: string; email?: string | null }; // User의 타입 지정
    }) {
      if (user) {
        // Firebase 커스텀 토큰 발급
        const firebaseUid = user.email || '';
        const uid = await getFirebaseUidByEmail(firebaseUid);
        if (!uid) {
          // TODO 이 경우 회원가입을 먼저 하라고 하면 될듯
          throw new Error('No Firebase UID found for the given email.');
        }
        const firebaseToken = await createFirebaseCustomToken(uid);
        // eslint-disable-next-line require-atomic-updates
        token.firebaseToken = firebaseToken; // JWT에 Firebase 토큰 추가
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.firebaseToken = token.firebaseToken as string | undefined; // 세션에 토큰 추가

      return session;
    },
  },
});

export { handler as GET, handler as POST };
