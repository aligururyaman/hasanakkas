'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/reducers/productsReducer';
import KahveInfo from './KahveInfo';
import TahinInfo from './TahinInfo';
import AmbalajInfo from './AmbalajInfo';


function ProductsInfo({ categoryName }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (categoryName !== 'Aktar') {
    if (categoryName === 'Kahve') {
      return <KahveInfo />
    } else if (categoryName === 'Tahin') {
      return <TahinInfo />
    } else if (categoryName === 'Ambalaj') {
      return <AmbalajInfo />
    } else {
      return <></>
    }
  }

  const filteredProducts = products.filter(product => product.category.name === categoryName);

  return (
    <div>
      {filteredProducts.length > 0 ? (
        <div className='w-full h-full p-10 bg-primary shadow-lg border-2 rounded-lg hover:cursor-default'>
          <div className='my-4 flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>Tazelik ve Kalite: Baharatlarımızın Sırrı</h1>
            <p className='text-md'>Her yemeğin ruhu olan baharatlar, mutfağınızın vazgeçilmez lezzet sırlarıdır. Biz de bu sırları en taze ve kaliteli haliyle sofralarınıza taşımaktan gurur duyuyoruz. Baharatlarımız, doğanın en saf köşelerinden, kendi memleketlerinden özenle seçilip sizler için özel olarak hazırlanıyor.</p>
          </div>
          <div className='my-4 flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>Taze ve Yeni Çekilmiş</h1>
            <p className='text-md'>Baharatlarımızın en büyük özelliği, tazeliğidir. Tüm ürünlerimiz, siparişinizden hemen önce taze olarak çekilir ve paketlenir. Bu sayede baharatlarımızın eşsiz aromalarını ve zengin tatlarını kaybetmeden kullanabilirsiniz. Taze çekilmiş baharatlarımız, yemeklerinize kattığınız her dokunuşta farkını hissettirecek.</p>
          </div>
          <div className='my-4 flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>Özel Hazırlık Süreci</h1>
            <p className='text-md'>Baharatlarımızın her biri, titizlikle yürütülen özel hazırlık süreçlerinden geçer. Her aşamada kalite kontrolü yapılarak en iyi ürünleri sizlere sunmayı hedefleriz. Baharatlarımızın tadı, rengi ve aroması, bu özel hazırlık süreçleri sayesinde en üst seviyede kalır.</p>
          </div>
          <div className='my-4 flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>Memleketlerinden Gelen Lezzetler</h1>
            <p className='text-md'>Baharatlarımızı, en iyi kalitede olmalarını sağlamak için kendi memleketlerinden temin ediyoruz. Hindistan’ın sıcak rüzgarlarından gelen safran, Anadolu’nun bereketli topraklarından toplanan kekik, Endonezya’nın egzotik adalarından gelen karanfil… Her baharat, kendi doğal ortamında yetişerek, oranın tüm özelliklerini içinde barındırır.</p>
          </div>
          <div className='my-4 flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>Doğadan Sofranıza</h1>
            <p className='text-md'>Her bir baharatın kendine özgü bir hikayesi vardır ve biz bu hikayeleri sofralarınıza taşımaktan büyük mutluluk duyuyoruz. Doğal, katkısız ve saf baharatlarımız, yemeklerinizi sadece tatlandırmakla kalmaz, aynı zamanda sağlıklı ve lezzetli beslenmenize de katkıda bulunur.</p>
          </div>
          <div className='my-4 flex flex-col gap-4'>
            <p className='font-bold text-xl'>Lezzetin sırrı doğallıkta saklıdır. Biz de bu sırra sadık kalarak en taze, en kaliteli ve en özel baharatları sizlerle buluşturuyoruz. Sofralarınıza kattığımız her baharatla, doğanın mucizelerini keşfetmeye davet ediyoruz.</p>
          </div>
          <div className='flex w-full justify-center my-20'>
            <h1 className='text-3xl font-bold'>HASAN AKKAŞ 1900'DEN BERİ...</h1>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProductsInfo;
