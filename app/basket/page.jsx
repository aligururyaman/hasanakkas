'use client';
import { fetchCart } from '@/redux/reducers/cartReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

function BasketPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const userId = user._id;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Toplam tutarı hesapla
    const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const plusQuantity = () => {
    // Quantity artırma fonksiyonu
  }

  return (
    <div className='flex p-20 flex-col gap-10'>
      <table className="flex flex-col gap-10 w-full">
        <thead className="text-[.9vmax]">
        </thead>
        <tbody className='flex flex-col gap-6'>
          {cart.map((item) => (
            <tr key={item._id} className="gap-10 flex bg-gray-100 rounded-xl shadow-lg">
              <td className="w-[10rem]">
                <img
                  src={item.productId.imageUrl}
                  className="w-40 h-40 object-cover rounded-xl"
                  alt="Product"
                />
              </td>
              <td className="flex flex-col justify-center items-center w-[40rem]">
                <tr>
                  <h1 className='text-xl font-bold'>{item.productId.name}</h1>
                </tr>
                <tr className='flex flex-row gap-3'>
                  <div className='flex justify-center items-center cursor-pointer' onClick={plusQuantity}>
                    <FaPlus size={10} />
                  </div>
                  <h1 className='text-xl font-bold'>{item.quantity} Adet</h1>
                  <div className='flex justify-center items-center cursor-pointer'>
                    <FaMinus size={10} />
                  </div>
                </tr>
              </td>
              <td className="flex flex-col justify-center items-center w-[20rem]">
                <h1 className='text-xl font-bold'>{item.productId.price} TL</h1>
              </td>

              <td className="flex flex-col justify-center items-center w-[20rem]">
                <h1 className='text-xl font-bold'>{item.quantity * item.productId.price} TL </h1>
              </td>
              <td className="flex flex-col justify-center items-center gap-10">
                <button>
                  <MdDeleteForever size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex w-full justify-end'>
        <div className='flex flex-col w-[25rem] h-[15rem] bg-gray-100 shadow-lg rounded-xl justify-center'>
          <div className='flex flex-row p-4 gap-20'>
            <p className='text-lg font-bold'>Toplam Tutar :</p>
            <p className='text-xl font-bold'>{totalAmount} TL</p>
          </div>
          <div className='flex w-full justify-end p-4' >
            <button>
              Sipariş Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
