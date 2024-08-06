'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/redux/reducers/orderReducer';
import { deleteAllCartsByUserId } from '@/redux/reducers/cartReducer';


function CompleteOrder() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const orderData = {
      userId: user._id,
      number,
      address,
      cartItems: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      totalAmount,
    };

    dispatch(createOrder(orderData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(deleteAllCartsByUserId(user._id)).then(() => {
          alert('Spiarişiniz Oluşturuldu!');
          router.push(`/profile/${user._id}`);
        });
      } else {
        alert('Failed to complete the order.');
      }
    }).catch((error) => {
      console.error('Error completing order:', error);
    });
  };

  return (
    <div className='flex flex-col gap-6 my-20 p-10'>
      <div>
        <h1 className='text-white text-3xl font-bold'>Siparişi Tamamla</h1>
      </div>
      <div>
        <div className='flex flex-col gap-4'>
          <input
            type="number"
            placeholder="Telefon Numarası"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className='p-2 w-80 h-12 rounded-lg border-2 
            border-gray-500 text-lg '
          />
          <input
            type="text"
            placeholder="Adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='p-2 w-80 h-12 rounded-lg border-2 
            border-gray-500 text-lg '
          />
        </div>
      </div>
      <div>
        <button className='flex w-80 h-16 border-gray-700 justify-center items-center rounded-xl bg-red-500 text-xl font-bold hover:bg-red-800' onClick={handleSubmit}>Siparişi Tamamla</button>
      </div>
    </div>
  );
}

export default CompleteOrder;
