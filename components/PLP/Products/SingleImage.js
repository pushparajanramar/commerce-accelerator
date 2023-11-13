"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function SingleImage({ src, alt, width = 404, height = 509, extraClass, ...props }) {
    const [imgSrc, setImageSrc] = useState(src);
    const [showDefaultImg, setShowDefaultImg] = useState(false);

    const handleDefaultPicOnError = () => {
        if (!showDefaultImg) {
            if (props.defaultPic) {
                setShowDefaultImg(true)
            } else if (props.notshowdefaultimg && props.notshowdefaultimg === "true") {

            } else {
                setShowDefaultImg(true)
            }
        }

    }

    useEffect(() => {
        setImageSrc(src)
    }, [src])

    return (
        <>
            {showDefaultImg ?
                <div className='default-img' style={{ width, height }}></div>
                :
                <Image
                    src={imgSrc}
                    alt={alt}
                    className={`productImg ${extraClass}`}
                    width={width}
                    height={height}
                    quality={64}
                    onError={(result) => {
                        // console.log('error in pic', imgSrc)
                        handleDefaultPicOnError()
                    }}
                    {...props}
                />
            }
        </>

    );
}

export default SingleImage;
