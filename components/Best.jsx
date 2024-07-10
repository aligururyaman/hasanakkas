'use client'
import { useEffect, useState, useRef } from "react";
import { Rect, useRect } from "react-use-rect";

const mock = ["Kahve", "Biber", "Kimyon"];

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
    <div className="flex w-full justify-center my-20">
      <div className="App" style={{ color: "black", fontSize: "6rem", fontWeight: 'bold' }}>
        Taze Çekilmiş  <SlideText source={mock} />
      </div>
    </div>
  )
}

export default Best