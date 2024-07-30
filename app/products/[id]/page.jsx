'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { FaBasketShopping } from 'react-icons/fa6';
import { Label } from '@radix-ui/react-label';
import { fetchProducts } from '@/redux/reducers/productsReducer';
import { DotLoader } from 'react-spinners';
import { addToCart } from '@/redux/reducers/cartReducer';
import Suggestion from '@/components/productsComp/Suggestion';
import ProductsInfo from '@/components/infoComp/ProductsInfo';


const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function ProductPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const user = useSelector((state) => state.user.user);
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [piece, setPiece] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddBasket = (product, piece) => {
    if (!user._id) {
      console.error('User ID is required');
      return;
    }
    console.log('Adding to cart:', { productId: product._id, userId: user._id, quantity: piece });
    dispatch(
      addToCart({
        userId: user._id,
        productId: product._id,
        quantity: piece,
      })
    );
  };

  const filteredProducts = products.filter(product => product._id === productId);

  return (
    <div className="sm:p-20">
      <div className='flex flex-row gap-20'>
        {loading ? (
          <div className="sweet-loading flex justify-center items-center w-full">
            <DotLoader
              color="#FF0000"
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          filteredProducts.length > 0 && filteredProducts.map((product) => (
            <div key={product._id} className="flex sm:flex-row flex-col gap-20  sm:items-start items-center">
              <div className="sm:w-[30rem] sm:h-[28rem] h-[18rem] w-[17rem] ">
                <img src={product.imageUrl} alt={product.name} className="border-2 rounded-xl" />
              </div>
              <div className="flex flex-col sm:w-[50rem] h-[28rem] sm:p-5">
                <div className="flex flex-col flex-grow gap-5 sm:p-0 p-5">
                  <h1 className="text-4xl font-bold">{product.name}</h1>
                  <p className='text-sm'>{product.description}</p>
                </div>
                <div className="flex flex-col justify-end items-end mt-auto gap-5 sm:p-0 p-5">
                  <h1 className="text-3xl font-bold">{(product.price / 10) * piece},00 <span className="text-4xl">₺</span></h1>


                  <div className="flex flex-row gap-1">
                    <p className="flex justify-center items-center text-5xl font-bold h-12 w-12 border-2 rounded-full cursor-pointer" onClick={() => setPiece(piece + 1)}>+</p>
                    <Label className="flex justify-center items-center text-5xl font-bold h-12 w-16 border-2 rounded-full">{piece}</Label>
                    <p className="flex justify-center items-center text-5xl font-bold h-12 w-12 border-2 rounded-full cursor-pointer" onClick={() => setPiece(Math.max(1, piece - 1))}>-</p>
                  </div>



                  <Button className="bg-red-300 hover:bg-red-500 w-40 h-12 relative flex items-center justify-center group active:text-red-800" onClick={() => handleAddBasket(product, piece)}>
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
        )}
        <div className='xl:flex hidden'>
          {filteredProducts.length > 0 && <Suggestion categoryId={filteredProducts[0].category._id} currentProductId={productId} />}
        </div>
      </div>
      <div className='mt-10 xl:flex hidden'>
        {
          filteredProducts.length > 0 && <ProductsInfo categoryName={filteredProducts[0].category.name} />
        }


      </div>
    </div>
  );
}

export default ProductPage;
