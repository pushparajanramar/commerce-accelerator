"use client";

import React from "react";
import Image from "next/image";
import PDPAccordion from "./PDPAccordion";
import PDPProductDescription from "./PDPProductDescription";
import { selectPDPLabel } from "../../../store/slices/labelsSlice";
import { useSelector } from "react-redux";

function PDPProductTechnologyDetails({
  Fit,
  product,
  accordion,
  FabricCare,
  description,
  descriptionIcons,
  fabricCareDescription,
  sizeAndFitDescription,
}) {
  const PDPData = useSelector(selectPDPLabel);
  const PDPIcon = PDPData?.icon;

  const easyEasyWashAndWear = PDPIcon?.find(
    (singleIcon) => singleIcon.label.toLowerCase() === "easy wash and wear"
  );

  const enhancedQuickDry = PDPIcon?.find(
    (singleIcon) => singleIcon.label.toLowerCase() === "enhanced quick-dry"
  );

  const lightWeight = PDPIcon?.find(
    (singleIcon) => singleIcon.label.toLowerCase() === "lightweight"
  );

  const enhancedStretch = PDPIcon?.find(
    (singleIcon) => singleIcon.label.toLowerCase() === "enhanced stretch"
  );

  const supremeComfort = PDPIcon?.find(
    (singleIcon) => singleIcon.label.toLowerCase() === "supreme comfort"
  );

  const wrinkleResistant = PDPIcon?.find(
    (singleIcon) => singleIcon.label.toLowerCase() === "wrinkle resistant"
  );

  const iconsBasedOnCondition = PDPIcon
    ? product?.fabricType === "PrestigePurePerformance"
      ? [easyEasyWashAndWear, lightWeight, enhancedQuickDry, enhancedStretch]
      : product?.fabricType === "PrestigeLifestylePerformance"
      ? [easyEasyWashAndWear, enhancedStretch, wrinkleResistant, supremeComfort]
      : product?.fabricType === "PremiumPerformance"
      ? [easyEasyWashAndWear, enhancedStretch, wrinkleResistant, supremeComfort]
      : product?.fabricType === "AllDayComfort"
      ? [easyEasyWashAndWear, enhancedStretch, wrinkleResistant, supremeComfort]
      : []
    : [];

  return (
    <div className="product-descriptions">
      <PDPProductDescription description={description} />
      <ul className="desc-wrapper">
        {iconsBasedOnCondition &&
          iconsBasedOnCondition.map((el, i) => (
            <li key={i}>
              <Image width={40} height={40} src={el?.icon?.url} />
              <span>{el.label}</span>
            </li>
          ))}
      </ul>

      <PDPAccordion
        accordionData={[
          { title: Fit, description: sizeAndFitDescription },
          { title: FabricCare, description: fabricCareDescription },
        ]}
        accordion={accordion}
      />
    </div>
  );
}

export default PDPProductTechnologyDetails;
