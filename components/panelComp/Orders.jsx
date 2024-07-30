'use client';

import { fetchOrders } from '@/redux/reducers/orderReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const orderStatus = useSelector((state) => state.order.status);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (orderStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (orderStatus === 'failed') {
    return <div>Failed to load orders</div>;
  }

  return (
    <div className='flex flex-col w-full h-full bg-primary border-2 rounded-2xl hover:cursor-default gap-4 p-10'>
      <div className='flex w-full justify-center my-6'>
        <h1 className='text-2xl font-bold '>Siparişler</h1>
      </div>
      {orders.map(order => (
        <div key={order.user._id} className='flex flex-row border-2 rounded-xl border-red-300 p-4 w-full gap-20'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>Sipariş Veren</h1>
            <h2 className='text-lg'><span className='font-bold'>Sipariş Numarası: </span> {order._id}</h2>
            <p className='text-lg'><span className='font-bold'>Kullanıcı: </span>{order.user.firstName} {order.user.lastName}</p>
            <p className='text-lg'><span className='font-bold'>Adres: </span>{order.address}</p>
          </div>
          <div className='flex flex-wrap gap-4 justify-center items-center'>
            {order.cartItems.map(item => (
              <div key={item.product._id} className='flex gap-6 flex-col justify-center items-center'>
                <div className='flex w-32 h-32 '>
                  <img src={item.product.imageUrl} className='border-2 rounded-xl' />
                </div>
                <div className='flex flex-col w-full justify-center items-center gap-4'>
                  <p className='text-lg'><span className='font-bold'>Ürün: </span>{item.product.name}</p>
                  <p className='text-lg'><span className='font-bold'>Adet: </span>{item.quantity}</p>
                  <p className='text-lg'><span className='font-bold'>Fiyat: </span>{item.product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex h-full justify-center items-center bg-red-500'>
            <p>Total Amount: {order.totalAmount}</p>
          </div>
        </div>

      ))}
    </div>
  );
}

export default Orders;
