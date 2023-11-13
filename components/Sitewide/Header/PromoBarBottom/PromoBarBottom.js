"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const PromoBarBottom = ({ PromoBarBottomDetail }) => {
  return (
    <div className="promo-bar-botton">
      <div className="w1 slick">
        <Slider {...settings}>
          {PromoBarBottomDetail?.promo_link?.map((promo, index) => (
            <div className="w2 p-sm" key={index}>
              <Link href={promo.href} className="promo-bottom-link">
                {promo.title}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className="w1">
        <ul className="p-md">
          {PromoBarBottomDetail?.promo_link?.map((promo, index) => (
            <li key={index}>
              <Link href={promo.href} className="promo-bottom-link">
                {promo.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromoBarBottom;
