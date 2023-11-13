"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import contentstack from "contentstack";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const TC04 = ({ pageData, token }) => {
    const [componentID, setComponentId] = useState(null);
    const [componentType, setComponentType] = useState(null);
    const [componentData, setComponentData] = useState('');
    const [carouselData, setCarouselData] = useState([]);
    const [storedCarousel, setStoredCarouselData] = useState([]);

    const hasWindow = typeof window !== 'undefined';

    const axios = require('axios');
    
    const instance = axios.create({
      baseURL: process.env.SERVER_BASE_URL,
      headers: { Authorization: "Bearer " + token },
    });
  
    useEffect(() => {
      setComponentId(pageData.uid);
      setComponentType(pageData._content_type_uid);
    }, [componentID,componentType]);

    useEffect(()=> {
      const storedCarousel = sessionStorage.getItem('carousel');
      
      if (storedCarousel) {
        setStoredCarouselData(JSON.parse(storedCarousel));
      }
      
    },[]);    



    useEffect(() => {
        if (hasWindow && componentData !== undefined) {


            componentData?.product_sap?.data.map((product,i) => {
              if (i <= componentData?.product_sap?.data.length) {              
                  instance
                  .get(
                    `/restv2/v2/b2c-us/products/${product.code}?fields=FULL`
                  )
                  .then((response) => {
                    //If cart doesn't exist, create one.
                    let galleryItem = {'code': response.data.code, 'name': response.data.name, 'price': response.data.price.formattedValue ?response.data.price.formattedValue : '', 'image': response.data.images[0].url ? response.data.images[0].url : ''};

                    let stored = JSON.parse(sessionStorage.getItem("carousel"));

                    if (stored && !stored.find(e => e.code === galleryItem.code)) {
                      stored.push(galleryItem);
                      sessionStorage.setItem('carousel',JSON.stringify(stored));
                    }

                    else {
                      sessionStorage.setItem('carousel',JSON.stringify([galleryItem]));
                    }
                    
            }).catch(
              function (error) {
                return error;
              }
            )}
        })
    }[]})


    // useEffect(() => {
    //     if (componentID) {
    //             const Stack = contentstack.Stack({
    //                 api_key: process.env.API_KEY,
    //                 delivery_token: process.env.DELIVERY_TOKEN,
    //                 environment: 'preview',
    //               });
            
    //             Stack.ContentType(componentType)
    //                 .Entry(componentID)
    //                 .toJSON()
    //                 .fetch()
    //                 .then(entry => {
    //                     setComponentData(entry);
    //                 })
    //     }
    //   },[componentID]);


      const buildCarouselSlides = storedCarousel && storedCarousel.map((item,key) => { return (
          <div key={key}>
              <img src={process.env.SERVER_BASE_URL + item.image} />
              <p className="legend">{item.name}</p>
          </div>)
      });

    return (
        <div className={`tc04`}>
          <Carousel centerMode>
            { buildCarouselSlides }
          </Carousel>
        </div>
    );
}
export default TC04;
