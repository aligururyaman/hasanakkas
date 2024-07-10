"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import kahve from "../app/utils/infoImg/kahve.png";
import biber from "../app/utils/infoImg/biber.png";
import corek from "../app/utils/infoImg/corek.png";
import kimyon from "../app/utils/infoImg/kimyon.png";
import sumak from "../app/utils/infoImg/sumak.png";
import tahin from "../app/utils/infoImg/tahin.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductsInfo() {
  const router = useRouter();

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const productsInfo = [
    {
      index: 1,
      ref: kahve,
      href: "/productsInfo",
      name: "kahve",
    },
    {
      index: 2,
      ref: biber,
      href: "/productsInfo",
      name: "biber",
    },
    {
      index: 3,
      ref: corek,
      href: "/productsInfo",
      name: "corek",
    },
    {
      index: 4,
      ref: kimyon,
      href: "/productsInfo",
      name: "kimyon",
    },
    {
      index: 5,
      ref: sumak,
      href: "/productsInfo",
      name: "sumak",
    },
    {
      index: 6,
      ref: tahin,
      href: "/productsInfo",
      name: "tahin",
    },
  ];

  const handleImageClick = (name) => {
    router.push(`/productsInfo?name=${name}`);
  };

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="w-[50rem]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {productsInfo.map((img, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex p-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={img.ref}
                        alt={img.index}

                        objectFit="cover"
                        className="rounded-md cursor-pointer"
                        onClick={() => handleImageClick(img.name)}
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
  );
}

export default ProductsInfo;
