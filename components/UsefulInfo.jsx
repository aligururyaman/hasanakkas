import React from 'react'

function UsefulInfo() {
  return (
    <div>
      <div className="flex justify-center items-center">
        < div className='flex w-full h-0.5 bg-gray-300 ' />
        <h1 className="text-lg font-bold flex w-[30rem] justify-center border-2 border-gray-300 p-5 rounded-2xl">Faydalı Bilgiler</h1>
        < div className='flex w-full h-0.5 bg-gray-300 ' />
      </div>
      <div className="flex flex-row justify-around mt-16">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">Kahvenin Faydaları</h1>
          <p className="text-md"><span className="font-bold">Enerji Artışı :</span> Kahve, içerdiği kafein sayesinde enerji seviyelerini artırır ve yorgunluğu azaltır.</p>
          <p className="text-md"><span className="font-bold">Beyin Fonksiyonlarını İyileştirme:</span> Kahve, dikkat, konsantrasyon, hafıza ve genel bilişsel fonksiyonları iyileştirir.</p>
          <p className="text-md"><span className="font-bold">Antioksidan Kaynağı:</span> Kahve, güçlü antioksidanlar içerir ve vücudu serbest radikallere karşı korur.</p>
          <p className="text-md"><span className="font-bold">Fiziksel Performansı Artırma:</span> Kafein, adrenalin seviyelerini artırarak fiziksel performansı iyileştirir.</p>
          <p className="text-md"><span className="font-bold">Metabolizmayı Hızlandırma:</span> Kahve, metabolizma hızını artırır ve yağ yakımını destekler.</p>
        </div>
      </div>
    </div>
  )
}

export default UsefulInfo