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
          alert('Order completed successfully!');
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
    <div>
      <input
        type="text"
        placeholder="Telefon Numarası"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleSubmit}>Siparişi Tamamla</button>
    </div>
  );
}

export default CompleteOrder;
