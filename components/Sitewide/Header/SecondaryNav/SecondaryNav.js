import React from "react";
import SecondaryNavMobile from "./SecondaryNavMobile";
import SecondaryNavDesktop from "./SecondaryNavDesktop";

const SecondaryNav = ({ navigation }) => {
  return (
    <div className="secondary-nav">
      {navigation ? (
        <>
          <div className="hamburger-menu">
            <SecondaryNavMobile mobileNavProps={navigation} />
          </div>
          <div className="sub-menu">
            <SecondaryNavDesktop navigation={navigation} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SecondaryNav;
