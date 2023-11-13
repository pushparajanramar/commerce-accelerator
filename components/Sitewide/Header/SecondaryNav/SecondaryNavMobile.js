"use client";
import React, { useEffect, useState } from "react";
import SecondaryNavSubLevelMobile from "./SecondaryNavSubLevelMobile";

const SecondaryNavMobile = ({ mobileNavProps }) => {
  const { nav_items } = mobileNavProps;
  const [showMenu, setShowMenu] = useState(false);
  const [subLevelTwo, setSubLevelTwo] = useState();
  const [isFirstLevelOpen, setIsFirstLevelOpen] = useState(false);
  const [menuLevel, setMenuLevel] = useState();

  const openNav = function (data) {
    setSubLevelTwo(data);
    setIsFirstLevelOpen(!isFirstLevelOpen);
  };

  function handleState(newValue) {
    setIsFirstLevelOpen(!isFirstLevelOpen);
  }

  useEffect(() => {
    if (isFirstLevelOpen) {
      setMenuLevel(
        <div className="w3">
          {subLevelTwo && (
            <SecondaryNavSubLevelMobile
              accordionData={subLevelTwo}
              firstLevelOpen={handleState}
            />
          )}
        </div>
      );
    }
  }, [isFirstLevelOpen]);

  return showMenu ? (
    <>
      <div className="w1">
        <button
          onClick={() => {
            setShowMenu(false);
          }}
          className="tm-close"
          aria-label="Close Menu Icon"
        ></button>
        {!isFirstLevelOpen ? (
          <div className="w2">
            <ul>
              {nav_items.length > 0 &&
                nav_items?.map((firstLevelNav, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      openNav(nav_items[index].navigation[0]?.navigation);
                    }}
                  >
                    <span>{firstLevelNav.first_level_link.title}</span>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          menuLevel
        )}
      </div>
    </>
  ) : (
    <button className="menu-icon"
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      aria-label="Menu Icon"
    >
    </button>
  );
};

export default SecondaryNavMobile;
