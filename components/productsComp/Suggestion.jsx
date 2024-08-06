'use client'
import { fetchProducts } from '@/redux/reducers/productsReducer';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function getRandomItems(array, num) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function Suggestion({ categoryId, currentProductId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const [randomProducts, setRandomProducts] = useState([]);


  if (loading) {
    <div>ali</div>
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filteredProducts = products.filter(product => product.category._id === categoryId && product._id !== currentProductId);
    setRandomProducts(getRandomItems(filteredProducts, 4));
  }, [products, categoryId, currentProductId]);

  const goProduct = (id) => {
    const productId = `${id}`;
    router.push(`/products/${id}?productId=${productId}`);
  };

  return (
    <div className='flex flex-col w-full gap-3 items-center text-white'>
      <div>
        <p className='my-4 text-2xl font-bold'>Öneriler</p>
      </div>
      <div className='flex flex-wrap gap-4'>
        {randomProducts.map((product) => (
          <div key={product._id} className='hover:cursor-pointer hover:scale-105' onClick={() => goProduct(product._id)}>
            <img src={product.imageUrl} alt={product.name} className='rounded-xl border-2 w-40 h-40' />
            <div className='flex w-full justify-center my-3'>
              <p className='text-lg font-semibold'>{product.name.length > 10 ? product.name.slice(0, 10) + '...' : product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestion;
