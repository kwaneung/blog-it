import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const firebaseSignin = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(`${user} 회원가입 성공`);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`[${errorCode}] ${errorMessage}`);
      // ..
    });

export default firebaseSignin;
