"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import kahve from "../app/utils/headerImg/kahve.png";
import baharat from "../app/utils/headerImg/baharat.png";
import aktar from "../app/utils/headerImg/aktar.png";
import tahin from "../app/utils/headerImg/tahin.png";
import logo from "../app/utils/ha.jpg";
import Image from "next/image";

export default function Section() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const headerImg = [
    {
      index: 1,
      ref: kahve,
    },
    {
      index: 2,
      ref: baharat,
    },
    {
      index: 3,
      ref: aktar,
    },
    {
      index: 4,
      ref: tahin,
    },
  ];

  return (
    <div>
      <div className="relative w-full h-[400px]">
        <div className="absolute left-32 z-10 w-full flex items-center h-full">
          <div className="flex justify-center items-center">
            <div className="h-96 w-96 bg-red-200 rounded-full opacity-70" />
            <Image src={logo} height={200} width={200} className="absolute" alt="image1" />
          </div>
        </div>
        <div className="w-full z-0">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {headerImg.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex p-0">
                        <div className="relative w-full h-[400px]">
                          <Image
                            src={img.ref}
                            alt={img.index}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md opacity-40"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
