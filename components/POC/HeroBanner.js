"use client";
import React, { useEffect, useState } from "react";
import contentstack from "contentstack";
import Link from "next/link";
import { Button } from "/components/Elements/Button";

const HeroBanner = ({ pageData }) => {
  const [componentID, setComponentId] = useState(null);
  const [componentType, setComponentType] = useState(null);
  const [componentData, setComponentData] = useState("");

  useEffect(() => {
    setComponentId(pageData.uid);
    setComponentType(pageData._content_type_uid);
  }, [componentID, componentType]);

  useEffect(() => {
    if (componentID) {
      const Stack = contentstack.Stack({
        api_key: process.env.API_KEY,
        delivery_token: process.env.DELIVERY_TOKEN,
        environment: "preview",
      });

      Stack.ContentType(componentType)
        .Entry(componentID)
        .toJSON()
        .fetch()
        .then((entry) => {
          setComponentData(entry);
        });
    }
  }, [componentID]);

  return (
    <div
      className={`tc03 ${componentData.ismobile ? `mobile` : ``}`}
      style={{
        backgroundImage: componentData.background_image
          ? `url(${componentData.background_image.url})`
          : "url()",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
    >
      <div
        className="tc03w1"
        style={{
          left: componentData.horizontal_position
            ? `${componentData.horizontal_position}%`
            : null,
          top: componentData.vertical_position
            ? `${componentData.vertical_position}%`
            : null,
        }}
      >
        <h2
          style={{
            color: componentData.custom_font_color
              ? `${componentData.custom_font_color}`
              : null,
          }}
        >
          {componentData.title}
        </h2>
        <p
          style={{
            color: componentData.custom_font_color
              ? `${componentData.custom_font_color}`
              : null,
          }}
        >
          {componentData.sub_headline}
        </p>
        <Button
          label={componentData.cta_button?.title}
          type="primary-black"
        ></Button>
        {/* <Link href="/TM/new-arrivals" className="b--section-primary__btn b--section-primary__btn--primary btn btn--primary" aria-label={componentData.cta_button?.title} style={{backgroundColor: componentData.custom_font_color ? `${componentData.custom_font_color}` : null}}>{componentData.cta_button?.title}</Link> */}
      </div>
    </div>
  );
};
export default HeroBanner;
