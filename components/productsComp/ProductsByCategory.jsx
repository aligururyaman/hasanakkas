"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/reducers/productsReducer";
import { Button } from "../ui/button";
import { FaBasketShopping } from "react-icons/fa6";
import { DotLoader } from "react-spinners";

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function ProductsByCategory() {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const sortOrder = useSelector((state) => state.products.sortOrder);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  let [color, setColor] = useState('#FF0000');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let filteredProducts = products.filter(product => product.category && product.category._id === categoryId);

  if (sortOrder === "fArtan") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "fAzalan") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "alfabetik") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleCategoryClick = (id) => {
    const productId = `${id}`;
    router.push(`/products/${id}?productId=${productId}`);
  };

  if (loading) {
    return (
      <div className="sweet-loading">
        <DotLoader
          color={color}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="sweet-loading">
        <p>Ürünler yüklenirken bir hata oluştu: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex sm:justify-normal justify-center flex-wrap gap-5 relative mb-40">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            className="sm:h-[35rem] sm:w-[19rem] h-[23rem] w-[13rem] border-2 rounded-xl p-3 relative group transition-all duration-300 ease-in-out hover:scale-105 shadow-xl cursor-pointer bg-gray-100"
            onClick={() => handleCategoryClick(product._id)}
          >
            <div>
              <img src={product.imageUrl} alt={product.name} className="rounded-xl w-full h-48 object-cover" />
            </div>
            <div className=" flex flex-col h-[9rem]">
              <p className="text-2xl font-bold text-center my-3">
                {product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name}
              </p>
              <p className="text-xl flex sm:hidden font-bold justify-center">{product.price},00 TL</p>
              <div className='w-full h-0.5 bg-slate-300 sm:flex hidden' />
              <p className="text-lg p-2 sm:flex hidden">
                {product.description.length > 30 ? product.description.slice(0, 30) + '...' : product.description}
              </p>
            </div>
            <div className="sm:flex hidden justify-center">
              <p className="text-4xl font-bold text-center">{product.price},00 TL</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-3 sm:flex hidden justify-center">
              <div className="flex items-center justify-center my-4">
                <Button className="text-black bg-red-300 hover:bg-red-500 rounded-lg gap-3 text-lg">
                  <FaBasketShopping size={15} /> Sepete Ekle
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="sweet-loading flex w-full justify-center items-center">
          <div className="sweet-loading">
            <DotLoader
              color={color}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsByCategory;
