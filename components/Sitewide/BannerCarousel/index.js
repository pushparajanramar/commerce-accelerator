"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BannerCarousel = ({ ...props }) => {
  const { slide } = props ?? {};
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    adaptiveWidth: true,
  };
  return (
    <div className="banner-carousel tm-width tm-height">
      <Slider {...settings}>
        {slide?.length > 0 &&
          slide.map((banner, index) => {
            return (
              <div className="image-wrapper" key={index}>
                <Image
                  src={banner?.image?.url}
                  width={1098}
                  height={617}
                  loader={() => banner?.image?.url}
                  unoptimized={true}
                  alt={banner?.alt_tag}
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};
export default BannerCarousel;
