"use client";
import React, { useEffect, useState } from "react";
import Swiper from "swiper";

import Image from "next/image"; // Importe o componente Image do Next.js

interface ImageSwiperProps {
  imagesUrl: string[];
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ imagesUrl }) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(2);
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(2);
      }
    };

    updateSlidesPerView();

    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  useEffect(() => {
    new Swiper(".swiper-container", {
      slidesPerView: slidesPerView,
      spaceBetween: 0,
    });
  }, [slidesPerView]);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {imagesUrl.map((imageUrl, index) => (
          <div className="swiper-slide" key={index}>
            <div className="relative h-72 md:h-96 w-full mx-auto">
              <Image
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
