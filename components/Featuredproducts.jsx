"use client";
import React from 'react'
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import biber from "../app/utils/campImg/biber.png"
import kara from "../app/utils/campImg/kara.png"
import kimyon from "../app/utils/campImg/kimyon.png"
import kina from "../app/utils/campImg/kina.png"
import lokum from "../app/utils/campImg/lokum.png"
import poset from "../app/utils/campImg/poset.png"
import sabun from "../app/utils/campImg/sabun.png"
import sumak from "../app/utils/campImg/sumak.png"
import tahin from "../app/utils/campImg/tahin.png"
import zencefil from "../app/utils/campImg/zencefil.png"
import Image from 'next/image';
import { Button } from './ui/button';

function Featuredproducts() {

  const featured = [
    {
      name: "Pul Biber",
      ref: biber,
      prize: "200,00",
    },
    {
      name: "Kara Biber",
      ref: kara,
      prize: "200,00",
    },
    {
      name: "Kimyon",
      ref: kimyon,
      prize: "200,00",
    },
    {
      name: "Kına",
      ref: kina,
      prize: "200,00",
    },
    {
      name: "Lokum",
      ref: lokum,
      prize: "200,00",
    },
    {
      name: "Poşet",
      ref: poset,
      prize: "200,00",
    },
    {
      name: "Sabun",
      ref: sabun,
      prize: "200,00",
    },
    {
      name: "Sumak",
      ref: sumak,
      prize: "200,00",
    },
    {
      name: "Tahin",
      ref: tahin,
      prize: "200,00",
    },
    {
      name: "Zencefil",
      ref: zencefil,
      prize: "200,00",
    },
  ]





  return (
    <div>
      <div className="flex justify-center items-center">
        < div className='flex w-full h-0.5 bg-gray-300 ' />
        <h1 className="text-lg font-bold flex w-[30rem] justify-center border-2 border-gray-300 p-5 rounded-2xl">Öne Çıkan Ürünler</h1>
        < div className='flex w-full h-0.5 bg-gray-300 ' />
      </div>
      <div className=''>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {featured.map((docs, i) => (
            <div key={i} className="flex flex-col w-[10rem] h-[10rem] m-2 gap-1">
              <Image src={docs.ref} alt={docs.name} className="object-cover w-full h-full rounded-3xl border-2 shadow-2xl hover:shadow-sm hover:cursor-pointer" />
              <p className="text-center mt-2 text-lg font-bold">{docs.name}</p>
              <p className="text-center mt-2 text-lg font-bold">{docs.prize} <span className='font-bold text-xl'>₺</span></p>
              <Button variant="outline" className="bg-red-300 hover:bg-red-600 rounded-xl shadow-lg hover:shadow ">Sepete Ekle</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Featuredproducts