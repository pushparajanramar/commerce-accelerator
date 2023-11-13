//***** SecondaryNav *****//
// Description: Secondary site navigation component (used in Header)
// Usage: Main navigation overlay
//****************//
"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavBanner from "./NavBanner";

const SecondaryNav = ({ navigation }) => {
  const { nav_items } = navigation ?? {};

  const [isShown, setIsShown] = useState(false);
  const [subNavData, setSubNavData] = useState([]);

  const passSubNav = (megaNavData) => {
    setSubNavData(megaNavData);
  };
  return (
    <div
      onMouseLeave={() => {
        setIsShown(false);
      }}
    >
      <ul className="navigation">
        {nav_items?.length > 0 &&
          nav_items.map((navItem, index) => (
            <li
              key={index}
              onMouseEnter={() => {
                passSubNav(navItem?.navigation[0]?.navigation);
                setIsShown(true);
              }}
            >
              <Link href={navItem?.first_level_link?.href}>
                <h5>{navItem?.first_level_link?.title}</h5>
              </Link>
            </li>
          ))}
      </ul>
      <div className={`${isShown ? "active" : ""} menu-wrapper`}>
        <div className="menu-list">
          {isShown &&
            subNavData?.link_list_column?.length > 0 &&
            subNavData?.link_list_column.map((eachColumn) => (
              <div className="list-wrapper" key={eachColumn?._metadata?.uid}>
                <h6>
                  {eachColumn?.featured == true ? (
                    <b>{eachColumn?.column_heading_link?.title}</b>
                  ) : (
                    <Link href={eachColumn?.column_heading_link?.href}>
                      <b>{eachColumn?.column_heading_link?.title}</b>
                    </Link>
                  )}
                </h6>
                <ul>
                  {eachColumn?.list_link?.length > 0 &&
                    eachColumn?.list_link.map((eachLink, index) => (
                      <li key={index}>
                        <Link className="p-sm" href={eachLink?.href}>
                          {eachLink?.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
        <div
          className={`nav-banner ${
            isShown && subNavData?.card_cta_link ? "show" : "hide"
          }`}
        >
          {isShown &&
            subNavData?.card_cta_link &&
            subNavData?.card_cta_link.map((each, index) => (
              <NavBanner navDetails={each} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default SecondaryNav;
