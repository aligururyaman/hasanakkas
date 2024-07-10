'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Panel from '@/components/Panel';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    } else {
      setLoading(false); // Kullanıcı giriş yapmışsa loading durumunu false yap
    }
  }, [user, router]);

  if (loading) {
    return <p>Loading...</p>; // Yükleme sırasında bir yükleme mesajı göster
  }

  if (!user) {
    return null; // Yükleme sırasında boş döndür
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[50rem] h-[10rem] bg-gray-100 flex flex-col items-center rounded-xl shadow-lg gap-5'>
        <h1 className='text-3xl font-bold'>Profil</h1>
        <div >
          <p className='text-2xl'><span>{user.firstName}</span> <span>{user.lastName}</span> </p>
        </div>
        <div>
          <p className='text-xl'>{user.email}</p>
        </div>

      </div>


      {
        user.role === "admin" ? (
          <div>
            <Panel />
          </div>
        ) : (
          <p></p>
        )
      }
    </div >
  );
};

export default ProfilePage;
