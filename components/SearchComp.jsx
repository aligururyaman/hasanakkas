'use client'
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/reducers/productsReducer';
import { CgPushChevronRight } from "react-icons/cg";


function SearchComp() {
  const router = useRouter()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openProduct = (id) => {
    const productId = `${id}`;
    router.push(`/products/${id}?productId=${productId}`);
  }

  return (
    <div className='my-12 flex flex-col xl:flex-row justify-between items-center text-white'>
      <div className='flex w-full h-20 justify-center items-center flex-row gap-6 bg-secondColor border-2 border-red-400 shadow-lg rounded-lg'>
        <FaWhatsapp size={45} className='text-gray-400' />
        <h1 className='text-2xl text-gray-400 font-medium'>
          Whatsapp'dan Sipariş verebilirsiniz
        </h1>
      </div>
      <div className='flex flex-col justify-center m-10 px-20 gap-2'>
        <div className='flex flex-row gap-3 items-center'>
          <CiSearch size={45} color='white' />
          <input
            type="text"
            placeholder="Aramak İstediğiniz Ürünü Girin"
            className="peer block w-[25rem] h-16 border-2  rounded-xl bg-secondColor-foreground p-3 text-white text-lg font-medium"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        <div className='px-14'>
          {searchTerm && (
            <div className='bg-background w-[25rem] rounded-xl border-2  absolute z-20 m-3'>
              <ul className='flex flex-col gap-4 m-4'>
                {filteredProducts.map(product => (
                  <li key={product._id} className='flex flex-row text-lg hover:cursor-pointer items-center gap-4 hover:scale-105' onClick={() => openProduct(product._id)}>
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg" />

                    <p className='text-lg font-medium'>{product.name}</p>
                    <div className='flex justify-end items-center gap-2 w-full'>
                      <p>Git</p>
                      <CgPushChevronRight />
                    </div>

                  </li>

                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='flex w-full h-20 justify-center items-center  flex-row gap-6 bg-secondColor border-2 border-red-400 shadow-lg rounded-lg'>
        < LiaShippingFastSolid size={45} className='text-gray-400' />
        <h1 className='text-2xl text-gray-400 font-medium'>
          500 TL Üstü Ücretsiz Kargo!
        </h1>
      </div>

    </div>
  );
}

export default SearchComp;
