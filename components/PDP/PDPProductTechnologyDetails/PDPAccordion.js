import { useState } from "react";

const PDPAccordion = (props) => {
  const { accordionData } = props ?? {};
  const [openGroup, setOpenGroup] = useState([]);
  const accordionDrawers = (accordionData || []).filter(
    (accordionDrawer) => accordionDrawer.description && accordionDrawer.title
  );

  const toggleGroup = (groupTitle) => {
    setOpenGroup((prevOpenGroup) =>
      openGroup.find((item) => item === groupTitle)
        ? prevOpenGroup.filter((item) => item !== groupTitle)
        : props.accordion
        ? [groupTitle]
        : [...prevOpenGroup, groupTitle]
    );
  };

  return (
    <>
      {accordionDrawers.length > 0 && (
        <div className="pdp-accordion-content">
          {accordionDrawers.map((each, index) => (
            <div
              className="w1"
              key={index}
              onClick={() =>
                each?.description.length <= 0 ? null : toggleGroup(each?.title)
              }
            >
              <div className="w2">
                <div className="w3">
                  <button
                    className={`btn ${
                      openGroup.find((item) => item === each?.title)
                        ? "minusIcon"
                        : "plusIcon"
                    }`}
                    aria-label={`${
                      openGroup.find((item) => item === each?.title)
                        ? "Open"
                        : "Close"
                    }`}
                  ></button>
                  <h4 className="heading">{each?.title}</h4>
                </div>
                <div
                  className={`w4 ${
                    openGroup.find((item) => item === each?.title) ? "open" : ""
                  }`}
                >
                  <div className="description">{each?.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default PDPAccordion;
