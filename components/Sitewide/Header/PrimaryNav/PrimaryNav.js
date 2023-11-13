//***** PrimaryNav *****//
// Description: Primary site navigation component (used in Header)
// Usage: Main navigation menu
//****************//

import React from "react";
import Link from "next/link";

const PrimaryNav = ({}) => {
  return (
    <ul className="">
      <li>
        <div>
          <Link href="/TM/new-arrivals">New</Link>
        </div>
      </li>
      <li>
        <div>
          <Link href="/TM/men">Men</Link>
        </div>
      </li>
      <li></li>
      <li>
        <div>
          <Link href="/TM/women">Women</Link>
        </div>
      </li>
    </ul>
  );
};

export default PrimaryNav;
