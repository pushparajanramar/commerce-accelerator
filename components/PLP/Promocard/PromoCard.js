"use client";
import React from "react";
import LandscapeCard from "./LandscapeCard";
import PortraitCard from "./PortraitCard";

function PromoCard({ data }) {
  const cardType = data.promo_type;
  const { heading, message, cta_link, featured_image } = data ?? {};

  if (cardType === 1) {
    return (
      <div className="promo-card">
        <PortraitCard
          heading={heading}
          message={message}
          cta={cta_link}
          media={featured_image}
        />
      </div>
    );
  } else if (cardType === 2) {
    return (
      <div className="promo-card col-span-2">
        <LandscapeCard
          heading={heading}
          message={message}
          cta={cta_link}
          media={featured_image}
        />
      </div>
    );
  }
}

export default PromoCard;
