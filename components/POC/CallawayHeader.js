import React from 'react';
import Link from 'next/link'

const Header = ({ title, bannerText }) => {
    return (
<header id="header-container">
<div className="header-primary tabs-enabled">
<Link href="/" legacyBehavior>
    <div className="header-logo">
        <a id="logo" className="box box-16x9" >About Us  <span className="logo-text">Callaway Golf</span></a>
     </div>
</Link>
    <div className='header'>All components are being fed from the ContentStack <b>preview environment</b> Manta Shape Stack</div>
</div>
  <nav id="nav-main" role="navigation">
    <div id="nav-primary">
      <ul className="level-1">
        <li>
          <a
            className="nav-item"
            href="/golf-clubs/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Clubs </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/golf-balls/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Balls </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/golf-accessories/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Gear </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/womensgolf/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Womens </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/customs/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Customs </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/custom-fitting/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Fitting </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/media/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Media </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/team-callaway/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Team </span>
          </a>
        </li>

        <li>
          <a
            className="nav-item"
            href="/community/"
            aria-expanded="false"
          >
            <span className="nav-item-label"> Community </span>
          </a>
        </li>

        <li className="nav-item-mobile">
          <a
            id="account-icon-mobile"
            className="nav-item"
            href="/account"
            title="Account"
            aria-label="Account"
          >
            <img
              alt="My Account Icon"
              className="svg-icon"
              src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/on/demandware.static/Sites-CG4-Site/-/en_US/v1670612058367/images/icons/user.svg?yocs=y_"
            />

            Log In
          </a>
        </li>

        <li className="nav-item-mobile">
          <a
            id="order-status-icon-mobile"
            className="nav-item"
            href="#"
            title="Track Your Order"
            aria-label="Track Your Order"
            data-toggle="modal"
            data-target="#orderStatusModal"
          >
            <img
              alt="Track Your Order Icon"
              className="svg-icon"
              src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/on/demandware.static/Sites-CG4-Site/-/en_US/v1670612058367/images/icons/box.svg?yocs=y_"
            />
            Track Your Order
          </a>
        </li>

        <li className="nav-item-mobile">
          <a
            id="help-icon-mobile"
            className="nav-item"
            href="#"
            title="Help"
            aria-label="Help"
            data-category-id="help"
          >
            <img
              alt="Help Icon"
              className="svg-icon"
              src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/on/demandware.static/Sites-CG4-Site/-/en_US/v1670612058367/images/icons/help.svg?yocs=y_"
            />

            Help
          </a>
        </li>
      </ul>
     
    </div>
  </nav>
  <div id="header-banner">
    <div dangerouslySetInnerHTML={{__html: bannerText}}></div>
  </div>
  <div>reload</div>
</header>

)};
export default Header;