'use client';
import { fetchCart, updateQuantity } from '@/redux/reducers/cartReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { fetchProducts } from '@/redux/reducers/productsReducer';

function BasketPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);
  const userId = user?._id;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      dispatch(fetchProducts());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Toplam tutarı hesapla
    const total = cart
      .filter(cartItem => cartItem.userId === userId)
      .reduce((sum, cartItem) => {
        const itemTotal = cartItem.items.reduce((itemSum, product) => {
          const productDetails = products.find(p => p._id === product.productId);
          return itemSum + (productDetails ? productDetails.price * (product.quantity || 1) : 0);
        }, 0);
        return sum + itemTotal;
      }, 0);
    setTotalAmount(total);
  }, [cart, products, userId]);

  const plusQuantity = (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
  }

  const minusQuantity = (productId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
    }
  }

  return (
    <div className='flex p-20 flex-col gap-10'>
      <table className="flex flex-col gap-10 w-full">
        <thead className="text-[.9vmax]">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='flex flex-col gap-6'>
          {cart
            .filter(cartItem => cartItem.userId === userId)
            .map((filteredCartItem) => (
              filteredCartItem.items.map((product) => {
                const productDetails = products.find(p => p._id === product.productId);
                return productDetails ? (
                  <tr key={product.productId} className="gap-10 flex bg-gray-100 rounded-xl shadow-lg">
                    <td className="w-[10rem]">
                      <img
                        src={productDetails.imageUrl}
                        className="w-40 h-40 object-cover rounded-xl"
                        alt="Product"
                      />
                    </td>
                    <td className="flex flex-col justify-center items-center w-[40rem]">
                      <div>
                        <h1 className='text-xl font-bold'>{productDetails.name}</h1>
                      </div>
                      <div className='flex flex-row gap-3'>
                        <div className='flex justify-center items-center cursor-pointer' onClick={() => plusQuantity(product.productId, product.quantity)}>
                          <FaPlus size={10} />
                        </div>
                        <h1 className='text-xl font-bold'>{product.quantity} Adet</h1>
                        <div className='flex justify-center items-center cursor-pointer' onClick={() => minusQuantity(product.productId, product.quantity)}>
                          <FaMinus size={10} />
                        </div>
                      </div>
                    </td>
                    <td className="flex flex-col justify-center items-center w-[20rem]">
                      <h1 className='text-xl font-bold'>{productDetails.price} TL</h1>
                    </td>
                    <td className="flex flex-col justify-center items-center w-[20rem]">
                      <h1 className='text-xl font-bold'>{product.quantity * productDetails.price} TL</h1>
                    </td>
                    <td className="flex flex-col justify-center items-center gap-10">
                      <button>
                        <MdDeleteForever size={25} />
                      </button>
                    </td>
                  </tr>
                ) : null;
              })
            ))}
        </tbody>
      </table>
      <div className='flex w-full justify-end'>
        <div className='flex flex-col w-[25rem] h-[15rem] bg-gray-100 shadow-lg rounded-xl justify-center'>
          <div className='flex flex-row p-4 gap-20'>
            <p className='text-lg font-bold'>Toplam Tutar :</p>
            <p className='text-xl font-bold'>{totalAmount} TL</p>
          </div>
          <div className='flex w-full justify-end p-4'>
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
