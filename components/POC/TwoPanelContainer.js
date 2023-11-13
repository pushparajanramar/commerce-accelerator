import React, { useState } from 'react';
import Link from 'next/link'

const TwoPanelContainer = ({ panelContent }) => {
  const [componentID, setComponentId] = useState(null);
  const [componentType, setComponentType] = useState(0);
  return (
    <Link href="/zips"> 
    <div id="content-container">
      <div className="homepage-container">
        <div id="home-3" className="slot slot-content">
          <div className="r-column light-bg">
            <div
              id="slot-home-3"
              className="container full-width-1x1-container content-slot"
            >
              <div className="full-width-1x1-row r-column light-bg">
                <div className="img-1x1">
                  <img
                    alt=""
                    className="optanon-category-C0003 box box-1x1"
                    src={panelContent?.image.url}
                    title=""
                  />
                </div>

                <div className="content replace-color">
                  <h4>{panelContent?.single_line}</h4>
                  <h2>{panelContent?.subhead}</h2>
                  <p>{panelContent?.promo_information}</p>
                  <Link href="/bags" legacyBehavior>
                    <a className="btn btn-primary btn-lg white">
                        <span>{panelContent?.cta_button?.title}</span>
                    </a>
                 </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TwoPanelContainer;
