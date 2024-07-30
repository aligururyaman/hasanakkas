import React from 'react'
import { GiHotSpices } from "react-icons/gi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";




function AboutUs() {
  return (
    <div className="flex w-full h-[30rem] bg-primary my-10 rounded-xl shadow-md p-5 flex-col">
      <div className='flex w-full flex-col gap-10 items-center justify-center'>
        <h1 className='text-4xl font-bold'>Hakkımızda</h1>
        <p className='text-lg'>1900 yıllardan beri kendi imalatımız</p>
      </div>
      <div className='flex flex-row justify-around h-full items-center'>
        <div className='h-60 w-60 border-2 border-red-400 flex flex-col items-center gap-10 justify-center rounded-3xl'>
          <div className='h-28 w-28 border-2 border-red-400 justify-center items-center flex rounded-full'>
            <GiHotSpices size={60} />
          </div>
          <div>
            <h1 className='font-bold text-lg'>Taze Çekilmiş Baharat</h1>
          </div>
        </div>
        <div className='h-60 w-60 border-2 border-red-400 flex flex-col items-center gap-10 justify-center rounded-3xl'>
          <div className='h-28 w-28 border-2 border-red-400 justify-center items-center flex rounded-full'>
            <LiaShippingFastSolid size={60} />
          </div>
          <div>
            <h1 className='font-bold text-lg'>Hızlı ve Güvenilir</h1>
          </div>
        </div>
        <div className='h-60 w-60 border-2 border-red-400 flex flex-col items-center gap-10 justify-center rounded-3xl'>
          <div className='h-28 w-28 border-2 border-red-400 justify-center items-center flex rounded-full'>
            <MdSupportAgent size={60} />
          </div>
          <div>
            <h1 className='font-bold text-lg'>7/24 Destek</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs