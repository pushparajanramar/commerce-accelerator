"use client"
import { isValidImageURL } from '../../../lib/Common';
import Link from 'next/link';
import React, { useState } from 'react';
import Slider from 'react-slick';
import SingleImage from './SingleImage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQueryHook from '../../../hooks/useMediaQueryHook';
import configuration from '../../../constants/configuration';

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={
            "slick-prev slick-arrow" +
            (currentSlide === 0 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        &#8249;
    </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={
            "slick-next slick-arrow" +
            (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        &#8250;
    </button>
);


function ProductImages({ images, hasProductBadge, title, url }) {
    const [showCaret, setShowCaret] = useState(false)
    const { isSmallDevice, isMediumDevice } = useMediaQueryHook()

    const badgeSettings = hasProductBadge ? {
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false
    } : {}


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: showCaret ? true : false,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: configuration.bpMobileWide,
                settings: { ...badgeSettings }
            },
            {
                breakpoint: configuration.bpTablet,
                settings: { ...badgeSettings }
            }
        ]
    };

    const handleShowCaret = () => {
        setShowCaret(true)
    }

    const showSingleImg = (isSmallDevice || isMediumDevice) && hasProductBadge ? true : false

    return (
        <>
            {showSingleImg && images && images.length > 0 ?
                <Link href={url}>
                    <SingleImage src={images[0].url} alt={images[0].altText ?? title} width="404" height="509" notshowdefaultimg={'true'} extraClass="slick-slide-image" />
                </Link>
                :
                <div className="slider-wrapper" onMouseOver={handleShowCaret} onTouchStartCapture={handleShowCaret}>
                    <Slider {...settings}>
                        {images && images?.map((slide, index) => {
                            if (isValidImageURL(slide.url)) {
                                return (
                                    <div className="slick-slide" key={index}>
                                        <Link href={url}>
                                            <SingleImage src={slide.url} alt={slide.altText ?? title} width="404" height="509" notshowdefaultimg={'true'} extraClass="slick-slide-image" />
                                        </Link>
                                    </div>
                                )
                            }
                        })}
                    </Slider>
                </div >
            }
        </>
    );
}

export default ProductImages;