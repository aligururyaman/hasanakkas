'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { deleteCart, deleteCartItem, fetchCart, updateQuantity } from '@/redux/reducers/cartReducer';
import { fetchProducts } from '@/redux/reducers/productsReducer';
import { useRouter } from 'next/navigation';

function BasketPage() {
  const route = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);
  const userId = user?._id;
  const [totalAmount, setTotalAmount] = useState(0);

  const removeCart = (userId, itemId) => {
    dispatch(deleteCartItem({ userId, itemId })).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      dispatch(fetchProducts());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((sum, item) => {
        const productDetails = products.find(p => p._id === item.product._id);
        return sum + (productDetails ? productDetails.price * item.quantity : 0);
      }, 0);
      setTotalAmount(total);
    }
  }, [cart, products]);

  const plusQuantity = (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
  };

  const minusQuantity = (productId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
    }
  };

  const handleOrder = () => {
    route.push('/order');
  };

  if (cartStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (cartStatus === 'failed') {
    return <div className='my-40'>
      <p className='text-white text-2xl font-medium'>Sepetinizde Ürün Bulunmuyor.</p>
    </div>;
  }

  return (
    <div className="flex p-20 flex-col gap-10">
      <table className="flex flex-col gap-10 w-full">
        <tbody className="flex flex-col gap-6">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <tr key={item.product._id} className="gap-10 flex md:flex-row items-center flex-col bg-gray-100 rounded-xl shadow-lg">
                <td className="w-[10rem]">
                  <img
                    src={item.product.imageUrl}
                    className="w-40 h-40 object-cover rounded-xl"
                    alt="Product"
                  />
                </td>
                <td className="flex flex-col justify-center items-center w-[40rem]">
                  <div>
                    <h1 className="text-xl font-bold">{item.product.name}</h1>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="flex justify-center items-center cursor-pointer" onClick={() => plusQuantity(item.product._id, item.quantity)}>
                      <FaPlus size={10} />
                    </div>
                    <h1 className="text-xl font-bold">{item.quantity} Adet</h1>
                    <div className="flex justify-center items-center cursor-pointer" onClick={() => minusQuantity(item.product._id, item.quantity)}>
                      <FaMinus size={10} />
                    </div>
                  </div>
                </td>
                <td className="flex flex-col justify-center items-center w-[20rem]">
                  <h1 className="text-xl font-bold">{item.product.price} TL</h1>
                </td>
                <td className="flex flex-col justify-center items-center w-[20rem]">
                  <h1 className="text-xl font-bold">{item.quantity * item.product.price} TL</h1>
                </td>
                <td className="flex flex-col justify-center items-center gap-10">
                  <button onClick={() => removeCart(userId, item._id)}>
                    <MdDeleteForever size={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Sepetinizde ürün bulunmamaktadır.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex w-full justify-end">
        <div className="flex flex-col w-[25rem] h-[15rem] bg-gray-100 shadow-lg rounded-xl justify-center">
          <div className="flex flex-row p-4 gap-20 bg-background text-white items-center justify-center rounded-t-xl mx-2">
            <p className="text-lg font-bold">Toplam Tutar :</p>
            <p className="text-xl font-bold">{totalAmount} TL</p>
          </div>
          <div className='flex mx-2 h-0.5 bg-gray-500 ' />
          <div className="flex  justify-end p-4 bg-background rounded-b-xl mx-2">
            <button onClick={handleOrder} className='flex w-full h-16 border-gray-700 justify-center items-center rounded-xl bg-red-500 text-xl font-bold hover:bg-red-800'>
              Siparişi Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
