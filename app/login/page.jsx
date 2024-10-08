'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchLoginUser, checkAuthState } from "@/redux/reducers/userReducer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);



  useEffect(() => {
    if (user) {
      router.push(`/profile/${user._id}`);
    }
  }, [user, router]);

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Lütfen email ve şifre alanlarını doldurun.");
      return;
    }
    dispatch(fetchLoginUser({ email, password }))
      .unwrap()
      .then((user) => {
        router.push(`/profile/${user._id}`);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className='flex items-center justify-center p-20'>
      <div className='h-[30rem] w-[40rem] shadow-xl rounded-xl border-2 flex flex-col items-center justify-center gap-8'>
        <div className="flex flex-col items-center gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email"
            className="w-[20rem]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Label>Şifre</Label>
          <Input
            type="password"
            placeholder="Şifre"
            className="w-[20rem]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="destructive" onClick={handleLogin} disabled={loading} className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          {loading ? "Yükleniyor..." : "Giriş Yap"}
        </Button>
        <Link href="/signin">
          <Button variant="link" className=" text-sm font-thin">
            Hesabınız yok mu? Hesap Oluşturun.
          </Button>
        </Link>
        {error && <p className="text-red-500 font-bold">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
