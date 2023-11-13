import contentstack from "contentstack";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Tc02w1 = styled.div`
  position: absolute;
  top: ${(componentData) =>
    componentData.horizontal_position
      ? componentData.horizontal_position
      : "50%"};
`;

const PanelComponent = ({ pageData }) => {
  const [componentID, setComponentId] = useState(null);
  const [componentType, setComponentType] = useState(null);
  const [componentData, setComponentData] = useState("");

  useEffect(() => {
    setComponentId(pageData[0]);
    setComponentType(pageData[1]);
  }, [componentID, componentType]);

  useEffect(() => {
    if (componentID) {
      //const fetchComponentData = async () => {
      const Stack = contentstack.Stack({
        api_key: process.env.API_KEY,
        delivery_token: process.env.DELIVERY_TOKEN,
        environment: 'preview',
      });

      Stack.ContentType(componentType)
        .Entry(componentID)
        .toJSON()
        //.includeEmbeddedItems() // include embedded items
        .fetch()
        .then((entry) => {
          // Contentstack.Utils.render({ entry, renderOption })
          setComponentData(entry);
        });
    }
  }, [componentID]);

  return (
    <div
      className="tc02"
      style={{
        backgroundImage: componentData.background_image
          ? `url(${componentData.background_image.url})`
          : "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="tc02w1"
        style={{
          left: componentData.horizontal_position
            ? `${componentData.horizontal_position}%`
            : null,
          top: componentData.vertical_position
            ? componentData.vertical_position
            : null,
        }}
      >
        <h2>{componentData.title}</h2>
      </div>
      {/* <Tc02w1>
          <h2 style={{color: componentData.custom_font_color ? `#${componentData.custom_font_color}` : null}}>{componentData.title}</h2>
        </Tc02w1> */}
    </div>
  );
};

export default PanelComponent;
