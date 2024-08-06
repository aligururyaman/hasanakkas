'use client'
import { useEffect, useState } from "react";
import { useRect } from "react-use-rect";
import { FlipWords } from "./ui/flip-words";





const words = ["Biber", "Karabiber", "Tarçın", "Kahve"];

function Best() {

  return (
    <div className="flex w-full bg-primary my-10 rounded-xl shadow-md">
      <div className="flex w-full justify-center my-20">
        <div className="font-bold 3xl:text-9xl xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-3xl text-2xl text-background">

          Taze Çekilmiş
          <span className="mx-10"><FlipWords words={words} /></span>
        </div>
      </div>
    </div>
  )
}

export default Best