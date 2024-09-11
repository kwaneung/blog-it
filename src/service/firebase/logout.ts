import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

const firebaseLogout = () =>
  signOut(auth)
    .then(() => {
      console.log('로그아웃 성공');
    })
    .catch((error) => {
      console.log('로그아웃 실패 ', error);
    });

export default firebaseLogout;
