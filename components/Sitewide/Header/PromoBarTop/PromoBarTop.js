"use client"
import React from "react";
import Link from "next/link";
import { Button } from "../../../Elements/Button";
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
  adaptiveHeight:false,

};

const PromoBarTop = ({ promoBarTopDetail }) => {
  return (
    <div className="promo-bar-top">
      <div className="w1">
        <Slider {...settings}>
          {promoBarTopDetail?.map((promo, index) => (
            <div className="promo-bar" key={index}>
              <div className="w2">
                <div className="promo-link p-xs">
                  <Link href={promo?.cta_link?.href} className="promo-top-bar">
                    {promo?.promo_message}
                  </Link>
                  <Button
                    label={promo?.cta_link?.title}
                    type="cta-white"
                    url={promo?.cta_link?.href}
                  ></Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default PromoBarTop;
