'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { FaBasketShopping } from 'react-icons/fa6';
import { Label } from '@radix-ui/react-label';
import { fetchProducts } from '@/redux/reducers/productsReducer';
import { addToCart } from '@/redux/reducers/cartReducer';
import { DotLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function ProductPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loadings = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => !!state.user.user);
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [piece, setPiece] = useState(1);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('#FF0000');

  const handleAddBasket = (product) => {
    if (!isLoggedIn) {
      alert('Please log in to add items to the basket.');
      return;
    }

    if (!user || !user._id) {
      console.error("User is not defined or missing _id");
      return;
    }
    if (!product || !product._id) {
      console.error("Product is not defined or missing _id");
      return;
    }
    dispatch(
      addToCart({
        userId: user._id,
        productId: product._id,
        quantity: piece,
      })
    );

  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product => product._id === productId);

  return (
    <div className="p-20">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product._id} className="flex flex-row gap-40">
            <div className="w-[30rem] h-[28rem]">
              <img src={product.imageUrl} alt={product.name} className="border-2 rounded-xl" />
            </div>
            <div className="flex flex-col w-[50rem] h-[28rem] p-5">
              <div className="flex flex-col flex-grow gap-5">
                <h1 className="text-2xl font-bold ">{product.name}</h1>
                <p className="">{product.description}</p>
              </div>
              <div className="flex flex-col justify-end items-end mt-auto gap-5">
                <h1 className="text-3xl font-bold">{(product.price / 10) * piece},00 <span className="text-4xl">₺</span></h1>
                <div className="flex flex-row gap-1">
                  <p className="flex justify-center items-center text-5xl font-bold h-12 w-12 border-2 rounded-full cursor-pointer" onClick={() => setPiece(piece + 1)}>+</p>
                  <Label className="flex justify-center items-center text-5xl font-bold h-12 w-16 border-2 rounded-full"> {piece} </Label>
                  <p className="flex justify-center items-center text-5xl font-bold h-12 w-12 border-2 rounded-full cursor-pointer" onClick={() => setPiece(Math.max(1, piece - 1))}>-</p>
                </div>
                <Button className="bg-red-300 hover:bg-red-500 w-40 h-12 relative flex items-center justify-center group active:text-red-800" onClick={() => handleAddBasket(product)}>
                  <span className="absolute flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                    Sepete Ekle
                  </span>
                  <span className="absolute flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <FaBasketShopping size={30} />
                  </span>
                </Button>
                {product.category._id === '6684fe621124f5b98383fbd3' && (
                  <div>
                    <p className="text-sm font-extralight">*{piece}00 Gram Ücreti</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="sweet-loading">
          <DotLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
