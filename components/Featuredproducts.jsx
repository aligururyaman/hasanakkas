"use client";
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/reducers/productsReducer';


function getRandomItems(array, num) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}


function ProductList({ products, title }) {
  const randomProducts = getRandomItems(products, 2);
  return (

    <div className="flex flex-wrap justify-center mt-10 3xl:gap-10 ">
      <h2 className="w-full text-center text-2xl font-bold mb-4">{title}</h2>
      {randomProducts.map((docs, i) => (
        <div key={i} className="flex flex-col w-[10rem] h-[30rem] m-2 gap-1">
          <img src={docs.imageUrl} alt={docs.name} className="flex h-40 w-40 object-cover rounded-3xl border-2 shadow-2xl hover:shadow-sm hover:cursor-pointer" />
          <div className='flex flex-col h-36'>
            <p className="text-center mt-2 text-lg font-bold">{docs.name}</p>
            <p className="text-center mt-2 text-lg font-bold">{docs.price}<span className='font-bold text-xl'>,00 ₺</span></p>
          </div>

          <Button variant="outline" className="bg-red-300 hover:bg-red-600 rounded-xl shadow-lg hover:shadow ">Sepete Ekle</Button>
        </div>
      ))}
    </div>

  );
}

function Featuredproducts() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterAktar = products.filter(products => products.category.name === "Aktar")
  const filterAmbalaj = products.filter(products => products.category.name === "Ambalaj")
  const filterKahve = products.filter(products => products.category.name === "Kahve")
  const filteredit = products.filter(products => products.category.name === "edit")



  return (
    <div className='w-full'>
      <div className="flex w-full h-[40rem] bg-primary my-10 rounded-xl shadow-md p-5 flex-col">
        <div className="flex justify-center items-center">
          < div className='flex w-full h-0.5 bg-gray-300 ' />
          <h1 className="text-lg font-bold flex w-[30rem] justify-center border-2 border-gray-300 p-5 rounded-2xl">Öne Çıkan Ürünler</h1>
          < div className='flex w-full h-0.5 bg-gray-300 ' />
        </div>
        <div className='flex'>
          <div className='xl:flex hidden'>
            <ProductList products={filterAktar} title="Aktar Ürünleri" />
          </div>
          <div className='lg:flex hidden'>
            <ProductList products={filterAmbalaj} title="Ambalaj Ürünleri" />
          </div>
          <div>
            <ProductList products={filterKahve} title="Kahve Ürünleri" />
          </div>
          <div className='md:flex hidden'>
            <ProductList products={filteredit} title="Edit Ürünleri" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featuredproducts