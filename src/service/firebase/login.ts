import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebase';

// browserLocalPersistence: 로그인 정보가 로컬 스토리지에 저장되어 브라우저를 닫아도 유지됨.
// browserSessionPersistence: 로그인 정보가 세션 스토리지에 저장되어 브라우저 탭을 닫으면 로그아웃됨.
// inMemoryPersistence: 로그인 정보가 메모리에만 저장되어 페이지를 새로 고치거나 브라우저를 닫으면 로그아웃됨.
const firebaseLogin = (email: string, password: string) => {
  return setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithEmailAndPassword(auth, email, password))
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error in firebaseLogin');
      console.log(`[${errorCode}] ${errorMessage}`);
      return Promise.reject(error);
    });
};

export default firebaseLogin;
