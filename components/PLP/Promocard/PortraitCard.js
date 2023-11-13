"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../Elements/Button";

const PortraitCard = ({ ...props }) => {
  const { heading, message, cta, media } = props ?? {};

  return (
    <>
      <div className="portrait">
        <div className="w1">
          <div className={`${"category"}`}>
            <div className={`w2`}>
              <Image
                alt={heading}
                width={50}
                height={50}
                src={media?.url}
                loader={() => media?.url}
                unoptimized={true}
              />
            </div>
            <div className={"w3"}>
              <div className={"w4"}>
                <h3>{heading}</h3>
                <p>{message}</p>
              </div>

              <div className="w5">
                <Button href={cta?.href} type="cta-black" label={cta?.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortraitCard;