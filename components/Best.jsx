'use client'
import { useEffect, useState } from "react";
import { useRect } from "react-use-rect";

const mock = ["Kahve", "Biber", "Kimyon", "Karabiber", "Tarçın"];

const SlideText = ({ source }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const [rectRef] = useRect(setRect);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("int");
      setCurrentItemIndex((index) =>
        index === source.length - 1 ? 0 : index + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [currentItemIndex, source]);

  return (
    <div
      style={{
        display: "inline-flex",
        overflow: "hidden",
        position: "relative",
        width: `${rect?.width}px`,
        transition: "all 0.5s ease-in-out",
      }}
    >
      <span style={{ visibility: "hidden" }}>{source[currentItemIndex]}</span>
      {source.map((text, index) => (
        <span
          key={index}
          ref={currentItemIndex === index ? rectRef : null}
          style={{
            position: "absolute",
            top: (rect?.height ?? 0) * 2,
            transform: `translateY(${currentItemIndex === index ? `-${(rect?.height ?? 0) * 2}px` : 0
              })`,
            transition: "all 1s ease-in-out",
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

function Best() {

  return (
    <div className="flex w-full bg-primary my-10 rounded-xl shadow-md">
      <div className="flex w-full justify-center my-20">
        <div className="font-bold 3xl:text-9xl xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-3xl text-2xl">
          Taze Çekilmiş  <SlideText source={mock} />
        </div>
      </div>
    </div>
  )
}

export default Best