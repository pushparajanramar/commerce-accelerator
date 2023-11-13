"use client";
import parse from "html-react-parser";
import { useState } from "react";
import Link from "next/link";

const Accordion = (props) => {
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
    <div className="nav-accordion">
      <div className="faq-accordion tm-width tm-height">
        {accordionTitle && (
          <h1 className="accordion-title">{parse(accordionTitle)}</h1>
        )}
        {accordionData.map((each, index) => (
          <div className="w1" key={index}>
            <h4
              className={`icon-after-link ${
                openGroup.find(
                  (item) => item === each?.column_heading_link.title
                )
                  ? "minusIcon"
                  : "plusIcon"
              }`}
              onClick={() => toggleGroup(each?.column_heading_link.title)}
            >
              {parse(each?.column_heading_link.title)}
            </h4>
            <div
              className={`w2 ${
                openGroup.find(
                  (item) => item === each?.column_heading_link.title
                )
                  ? "open"
                  : ""
              }`}
            >
              {each.list_link.map((each, index) => (
                <Link href={each?.href} className="description p-sm" key={index}>
                  {parse(each?.title)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Accordion;
