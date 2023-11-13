import contentstack from "contentstack";
import React, { useState, useEffect } from 'react';
import PanelComponent from "./PanelComponent";
import Link from 'next/link'

import styled from 'styled-components';

const ComponentWrapper = styled.section`
  display: flex;
  flex: wrap row;
  justify-content: flex-start;
  align-items: flex-start;

  border: 2px dotted #ffc600;
  padding: 2rem;
  margin-top: 1rem;
  // background: ${componentData => componentData?.background_image?.url ? `url(${componentData.background_image.url}` : "white"};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TwoPanelWrapper = ({ pageData }) => {
  const [componentID, setComponentId] = useState(null);
  const [componentType, setComponentType] = useState(null);
  const [componentData, setComponentData] = useState('');

  useEffect(() => {
    setComponentId(pageData.uid);
    setComponentType(pageData._content_type_uid);
    
  }, [componentID,componentType]);

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
                .then(entry => {
                    // Contentstack.Utils.render({ entry, renderOption }) 
                    setComponentData(entry);
                })

    }
  },[componentID]);



  return (
    <ComponentWrapper>
        <Link href="/zips" className="two-panel-wrapper"> 
        {componentData.panel_1 ? <PanelComponent pageData={[componentData.panel_1[0]['uid'],componentData.panel_1[0]['_content_type_uid']]}></PanelComponent>: ''}
        {componentData.panel_1 ? <PanelComponent pageData={[componentData.panel_2[0]['uid'],componentData.panel_2[0]['_content_type_uid']]}></PanelComponent>: ''}
        {/* <PanelComponent pageData={componentData.panel_2}></PanelComponent> */}
        </Link>
    </ComponentWrapper>
  );
};

export default TwoPanelWrapper;