"use client";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/reducers/productsReducer';
import { useRouter } from 'next/navigation';


function getRandomItems(array, num) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}


function ProductList({ products, title, handleCategoryClick }) {
  const randomProducts = getRandomItems(products, 2);
  return (

    <div className="flex flex-wrap justify-center mt-10 3xl:gap-10 ">
      <h2 className="w-full text-center text-2xl font-bold mb-4">{title}</h2>
      {randomProducts.map((docs, i) => (
        <div key={i} className="flex flex-col w-[10rem] h-[20rem] m-2 gap-1" onClick={() => handleCategoryClick(docs._id)}>
          <img src={docs.imageUrl} alt={docs.name} className="flex h-40 w-40 object-cover rounded-3xl border-2 shadow-2xl hover:shadow-sm hover:cursor-pointer" />
          <div className='flex flex-col h-36'>
            <p className="text-center mt-2 text-lg font-bold">{docs.name}</p>
            <p className="text-center mt-2 text-lg font-bold">{docs.price}<span className='font-bold text-xl'>,00 ₺</span></p>
          </div>

        </div>
      ))}
    </div>

  );
}

function Featuredproducts() {
  const router = useRouter()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterAktar = products.filter(products => products.category.name === "Aktar")
  const filterAmbalaj = products.filter(products => products.category.name === "Ambalaj")
  const filterKahve = products.filter(products => products.category.name === "Kahve")
  const filterTahin = products.filter(products => products.category.name === "Tahin")

  const handleCategoryClick = (id) => {
    const productId = `${id}`;
    router.push(`/products/${id}?productId=${productId}`);
  };


  return (
    <div className='w-full'>
      <div className="flex w-full h-[30rem] bg-primary my-10 rounded-xl shadow-md p-5 flex-col">
        <div className="flex justify-center items-center">
          < div className='flex w-full h-0.5 bg-gray-300 ' />
          <h1 className="text-lg font-bold flex w-[30rem] justify-center border-2 border-gray-300 p-5 rounded-2xl">Öne Çıkan Ürünler</h1>
          < div className='flex w-full h-0.5 bg-gray-300 ' />
        </div>
        <div className='flex'>
          <div className='xl:flex hidden'>
            <ProductList products={filterAktar} title="Aktar Ürünleri" handleCategoryClick={handleCategoryClick} />
          </div>
          <div className='lg:flex hidden'>
            <ProductList products={filterAmbalaj} title="Ambalaj Ürünleri" handleCategoryClick={handleCategoryClick} />
          </div>
          <div>
            <ProductList products={filterKahve} title="Kahve Ürünleri" handleCategoryClick={handleCategoryClick} />
          </div>
          <div className='md:flex hidden'>
            <ProductList products={filterTahin} title="Tahin Ürünleri" handleCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featuredproducts