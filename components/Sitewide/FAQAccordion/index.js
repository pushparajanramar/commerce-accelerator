"use client";
import { renderRichTextField } from "/lib/contentRenderer";
import { useState } from "react";

const FAQAccordion = (props) => {
  const { accordionData, accordionTitle } = props ?? {};
  const [openGroup, setOpenGroup] = useState([]); // State to keep track of the currently open group
  const toggleGroup = (groupTitle) => {
    setOpenGroup((prevOpenGroup) =>
      openGroup.find((item) => item === groupTitle)
        ? prevOpenGroup.filter((item) => item !== groupTitle)
        : [...prevOpenGroup, groupTitle]
    );
  };

  return (
    <div className="faq-accordion tm-width tm-height">
      <div className="title">{renderRichTextField(accordionTitle, "h1")}</div>
      {accordionData.map((each, index) => (
        <div className="w1" key={index}>
          <div className="w2">
            <button
              className={`btn ${
                openGroup.includes(each?.title) ? "close" : "open"
              }`}
              onClick={() => toggleGroup(each?.title)}
              aria-label={
                openGroup.includes(each?.title) ? "close" : "open"
              }
            ></button>
            <a className="heading" onClick={() => toggleGroup(each?.title)}>
              {renderRichTextField(each?.title, "h4")}
            </a>
          </div>
          <div
            className={`w3 ${openGroup.includes(each?.title) ? "open" : ""}`}
          >
            {renderRichTextField(each?.description, "p")}
          </div>
        </div>
      ))}
    </div>
  );
};
export default FAQAccordion;
