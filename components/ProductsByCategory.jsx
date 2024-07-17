"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/reducers/productsReducer";
import { Button } from "./ui/button";
import { FaBasketShopping } from "react-icons/fa6";
import { DotLoader } from "react-spinners";


const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};


function ProductsByCategory() {
  const router = useRouter()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  let [color, setColor] = useState('#FF0000');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const filteredProducts = products.filter(product => product.category._id === categoryId);

  const handleCategoryClick = (id) => {
    const productId = `${id}`;
    router.push(`/products/${id}?productId=${productId}`);
  };

  if (loading) return
  <div className="sweet-loading">
    <DotLoader
      color={color}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap gap-5 relative">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (

          <div
            key={product._id}
            className="h-[33rem] w-[19rem] border-2 rounded-xl p-3 relative group transition-all duration-300 ease-in-out hover:scale-105 shadow-xl cursor-pointer bg-gray-100"
            onClick={() => handleCategoryClick(product._id)}
          >
            <div>
              <img src={product.imageUrl} alt={product.name} className="rounded-xl w-full h-48 object-cover" />
            </div>

            <div className="h-[10rem]">
              <p className="text-2xl font-bold text-center my-3">
                {
                  product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name
                }
              </p>
              <div className='flex w-full h-0.5 bg-slate-300' />
              <p className="text-lg p-2">
                {
                  product.description.length > 30 ? product.description.slice(0, 30) + '...' : product.description
                }
              </p>
            </div>
            <div className="">
              <p className="text-sm">Kilo Fiyatı: </p>
              <p className="text-4xl font-bold text-center">{product.price},00 TL</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-3">
              <div className="flex items-center justify-center my-4">
                <Button className="text-black bg-red-300 hover:bg-red-500 rounded-lg flex gap-3 text-lg">
                  <FaBasketShopping size={15} /> Sepete Ekle
                </Button>
              </div>
            </div>
          </div>

        ))
      ) : (
        <div>No products found in this category</div>
      )}
    </div>
  )
}

export default ProductsByCategory
