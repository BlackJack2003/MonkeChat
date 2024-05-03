"use client";
import React, { CSSProperties, useEffect, useRef, Children } from "react";

export interface CarouselInterface {
  children?: React.ReactNode;
  style?: CSSProperties;
  period?: number;
  width: number;
  className?: string;
  height: number;
}

const Carousel: React.FC<CarouselInterface> = ({
  children = null,
  style = {},
  width,
  height,
  period = 2000,
  className = "",
}): React.ReactElement => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  var interval: number;
  width = Math.max(width, 110);
  useEffect(() => {
    var x: number | undefined = 0;
    const _ = () => {
      scrollableRef.current?.scrollBy({
        left: width,
        behavior: "instant",
      });
      if (x == scrollableRef.current?.scrollLeft) {
        console.log("scrollingback");
        scrollableRef.current?.scrollTo(0, 0);
      }
      x = scrollableRef.current?.scrollLeft;
    };
    interval = window.setInterval(_, period);

    return () => {
      window.clearInterval(interval);
    };
  }, []);
  return (
    <div
      style={{ ...style, maxWidth: width, maxHeight: height }}
      className={className}
    >
      <div className="relative">
        <div
          className="overflow-hidden flex snap-mandatory [&>*]:snap-start h-max"
          ref={scrollableRef}
        >
          {Children.map(children, (item) => {
            return (
              <div style={{ minWidth: width, minHeight: height }}>{item}</div>
            );
          })}
        </div>
        <div
          className="absolute flex bottom-0 left-0 w-full h-fit pb-2"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="bg-transparent font-bold mx-2 text-2xl hover:bg-slate-800 hover:text-white px-2 rounded-full pb-1"
            onClick={() => {
              scrollableRef.current?.scrollBy({
                left: -1 * width,
                behavior: "smooth",
              });
            }}
          >
            ←
          </div>

          <div
            className="bg-transparent font-bold text-2xl mx-2 hover:bg-slate-800 hover:text-white px-2 rounded-full pb-1"
            onClick={() => {
              scrollableRef.current?.scrollBy({
                left: width,
                behavior: "smooth",
              });
            }}
          >
            →
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
