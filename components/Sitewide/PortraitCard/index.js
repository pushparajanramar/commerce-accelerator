"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "../../Elements/Button";

const PortraitCard = (props) => {
  const {
    cards,
    wrap_cards,
    image_heights,
    card_box_shadow,
    background_color,
    card_count_per_row,
    card_body_font_size,
  } = props ?? {};

  const styleContainer = {
    "--column-count": card_count_per_row,
    "--wrap-cards": wrap_cards ? "wrap" : "nowrap",
    "--box-shadow": card_box_shadow
      ? "0px 8px 20px 0px rgba(108, 119, 130, 0.10)"
      : "none",
    "--image-heights": image_heights ? image_heights + "px" : "",
  };

  return (
    <div
      className={`portrait-card tm-height ${background_color} column-count-${card_count_per_row} ${
        wrap_cards ? "wrap" : "nowrap"
      }`}
      style={styleContainer}
    >
      <div className="w1 tm-width">
        {cards?.length > 0 &&
          cards?.map((card, index) => {
            return (
              <div className={`${"category"}`} key={index}>
                <div className={`w2 ${wrap_cards ? "wrap" : "nowrap"}`}>
                  {card?.cta_link?.length > 0 ? (
                    <Link href={card?.cta_link[0]?.href}>
                      <Image
                        alt={card?.heading}
                        width={50}
                        height={50}
                        src={card?.featured_image?.url}
                        loader={() => card?.featured_image?.url}
                        unoptimized={true}
                      />
                    </Link>
                  ) : (
                    <Image
                      alt={card?.heading}
                      width={50}
                      height={50}
                      src={card?.featured_image?.url}
                      loader={() => card?.featured_image?.url}
                      unoptimized={true}
                    />
                  )}
                </div>
                <div className={"w3"}>
                  <div className={"w4"}>
                    {card_body_font_size === 1 ? (
                      <>
                        <h3>{parse(card?.heading)}</h3>
                        <p>{parse(card?.message)}</p>
                      </>
                    ) : (
                      <>
                        <h4>{parse(card?.heading)}</h4>
                        <p className="p-sm">{parse(card?.message)}</p>
                      </>
                    )}
                  </div>

                  <div className="w5">
                    {card?.cta_link?.length > 0 &&
                      card?.cta_link?.map((cardCta, index) => {
                        return (
                          <Button
                            key={index}
                            type="cta-black"
                            label={cardCta?.title}
                            url={cardCta?.href}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PortraitCard;
