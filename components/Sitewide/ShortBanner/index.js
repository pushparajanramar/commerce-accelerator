"use client";
import React from "react";
import { renderRichTextField } from "/lib/contentRenderer";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../Elements/Button";

const ShortBanner = ({ ...props }) => {
  const {
    min_height,
    block_background_color,
    banner_title,
    banner_description,
    text_color,
    promo_icon,
    cta,
    cta_style,
    alt_tag,
  } = props ?? {};

  const styleContainer = {
    "--min-height": min_height ? min_height + "px" : "",
    "--bg-color": `var(--${block_background_color})`,
    "--text-color": text_color,
  };

  return (
    <section className="short-banner tm-width tm-height" style={styleContainer}>
      <div className="banner-details">
        <Link href={cta.href} aria-label={cta.title}>
          <Image
            loader={() => promo_icon?.url}
            unoptimized={true}
            width={105}
            height={95}
            alt={alt_tag}
            src={promo_icon?.url}
          />
        </Link>
        <div className="banner-content">
          {renderRichTextField(banner_title, "h2")}
          <div className="description">
            {renderRichTextField(banner_description, "p")}
          </div>
        </div>
        <Button label={cta.title} url={cta.href} type={cta_style} />
      </div>
    </section>
  );
};

export default ShortBanner;
