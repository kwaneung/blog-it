// lib/firebaseAdmin.ts
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화 (중복 초기화 방지)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

// 커스텀 토큰을 생성하는 함수
export const createFirebaseCustomToken = async (uid: string): Promise<string> => {
  try {
    const customToken = await admin.auth().createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw new Error('Failed to create Firebase custom token');
  }
};

export const getFirebaseUidByEmail = async (email: string): Promise<string | null> => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord.uid; // UID 반환
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null; // 사용자 정보를 찾지 못한 경우
  }
};

export default admin;
