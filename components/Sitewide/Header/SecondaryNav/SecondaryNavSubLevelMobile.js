import React, { useState } from "react";
import MobileNavAccordion from "./MobileNavAccordion";
import NavBanner from "./NavBanner";

const SecondaryNavSubLevelMobile = (accordionDetails) => {
  const [value, setNewValue] = useState("");
  function handleBackNav() {
    setNewValue(!accordionDetails.firstLevelOpen);
    accordionDetails.firstLevelOpen(!accordionDetails.firstLevelOpen);
  }

  return (
    <div className="w4">
      <div className="w1">
        <button onClick={handleBackNav}>
          <h3 className="title">
            {accordionDetails.accordionData.first_level_link.title}
          </h3>
        </button>
      </div>
      <MobileNavAccordion
        accordionData={accordionDetails.accordionData.link_list_column}
      />
      <div className="nav-banner">
        {accordionDetails.accordionData.card_cta_link.map((each, index) => (
          <NavBanner navDetails={each} />
        ))}
      </div>
    </div>
  );
};
export default SecondaryNavSubLevelMobile;
