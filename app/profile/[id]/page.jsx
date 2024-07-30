'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Panel from '@/components/panelComp/Panel';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[50rem] bg-gray-100 flex flex-col items-center rounded-xl shadow-lg gap-5'>
        <div className='flex flex-col items-center my-10'>
          <h1 className='text-3xl font-bold'>Profil Bilgileri</h1>
          <div>
            <p className='text-2xl'><span>{user.firstName}</span> <span>{user.lastName}</span> </p>
          </div>
          <div>
            <p className='text-xl'>{user.email}</p>
          </div>
        </div>
      </div>

      {user.role === 'admin' && (
        <div className='mt-20 flex w-full h-full'>
          <Panel />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
