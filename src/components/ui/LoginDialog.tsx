'use client';
import { signIn, signOut as sss, useSession } from 'next-auth/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useEffect, useState } from 'react';
import firebaseLogin from '@/service/firebase/login';
import firebaseSignin from '@/service/firebase/signin';
import { signOut } from 'firebase/auth';

const LoginDialog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = useSession(); // TODO 로그인 정보 활용

  const handleLogin = async () => {
    const loginData = await firebaseLogin(email, password);
    console.log('loginData : ', loginData);
  };

  const handleSignin = () => {
    firebaseSignin(email, password);
  };

  useEffect(() => {
    console.log('next-auth 로그인 정보');
    console.log(session);
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 ml-2">
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>로그인 정보를 입력 해주세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              ID
            </Label>
            <Input
              id="name"
              placeholder="email 주소"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              type="password"
              id="username"
              placeholder="Password"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {session?.user ? <>네이버O</> : <>네이버X</>}
          <Button type="submit" onClick={() => signIn()}>
            N로그인
          </Button>
          <Button type="submit" onClick={() => sss()}>
            N로그아웃
          </Button>
          {/* <Button type="submit">카카오로그인</Button> */}
          {/* <Button type="submit" onClick={temp}>
            로그인된 사용자 조회
          </Button> */}
          <Button type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Button type="submit" onClick={handleSignin}>
            Sigin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
