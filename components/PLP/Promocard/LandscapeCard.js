"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../Elements/Button";
import Link from "next/link";

const LandscapeCard = ({ ...props }) => {
  const { heading, message, cta, media } =
    props ?? {};

  const styleContainer = {
    "--column-count": 1,
  };

  return (
    <div
      className={`landscape tm-width wrap two-column`}
      style={styleContainer}
    >
      <div className={`w1`}>
        <Link
          className={`${"w2"}`}
          href={cta?.href}
          aria-label={cta?.title}
        >
          <Image
            alt={cta?.title}
            width={100}
            height={100}
            src={media?.url}
            loader={() => media?.url}
            unoptimized={true}
          />
        </Link>
        <div className={"w3"}>
          <div className={"w4"}>
            <h3>{heading}</h3>
            <p>{message}</p>
          </div>

          <div className={"w5"}>
            <Button
              href={cta?.href}
              type="cta-black"
              label={cta?.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandscapeCard;