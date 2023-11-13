//***** Header *****//
// Description: Site navigation component
// Usage: Sitewide
//****************//
"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import SecondaryNav from "./SecondaryNav/SecondaryNav";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getJWTToken,
  getProfileInformation,
  logoutWithRaaS,
} from "../../../lib/GigyaRaas";
import Cookies from "js-cookie";
import { GigyaContext } from "../../Providers/GigyaContextProvider";
import { setAuthStatus, setUser } from "../../../store/slices/authSlice";
import configuration from "../../../constants/configuration";
import LoginSignUp from "../../Auth/LoginSignUp";
import { getAuthToken } from "../../../lib/methods";
import SearchBox from "./SearchBox/SearchBox";
import { setAllLabels } from "../../../store/slices/labelsSlice";
import UserAccount from "./UserAccount/UserAccount";
import PromoBarTop from "./PromoBarTop/PromoBarTop";
import PromoBarBottom from "./PromoBarBottom/PromoBarBottom";
import route from "../../../constants/route";
import { selectCartCount } from "@/store/slices/cartSlice";

const Header = ({ labels = {}, headerDataResponse, ...props }) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { gigyaInstance } = useContext(GigyaContext);
  const [headerData, setHeaderData] = useState({});
  const itemCount = useSelector(selectCartCount);
  const cartLinkAriaLabel = `${itemCount} ${labels?.screenReader?.cart_link || 'items in cart'}`

  const checkUserSession = () => {
    if (authState.isAuth) {
      return false;
    }
    getProfileInformation((response) => {
      if (response.errorCode !== configuration.unauthorizedCode) {
        //not unauthorized

        getJWTToken(async (res) => {
          if (res.errorCode === 0) {
            const authResponse = await getAuthToken({
              UID: response.UID,
              UIDSignature: response.UIDSignature,
              timeStamp: response.signatureTimestamp,
              idToken: res.id_token,
            });
            if (
              authResponse.status === 200 &&
              authResponse.response &&
              authResponse.response?.access_token
            ) {
              localStorage.setItem(
                configuration.hybrisTokenCookieName,
                authResponse?.response?.access_token
              );
              Cookies.set(
                configuration.userEmailCookie,
                response.profile.email,
                { sameSite: true }
              );
              dispatch(setAuthStatus(true));
              dispatch(
                setUser({
                  ...response,
                  requestParams: undefined,
                })
              );
            }
          }
        });
      } else {
        Cookies.remove(configuration.userEmailCookie);
        localStorage.removeItem(configuration.hybrisTokenCookieName);
      }
    });
  };

  useEffect(() => {
    if (gigyaInstance) {
      checkUserSession();
    }
  }, [gigyaInstance]);

  useEffect(() => {
    setHeaderData(headerDataResponse);
  }, [headerDataResponse]);

  useEffect(() => {
    dispatch(setAllLabels(labels));
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PromoBarTop promoBarTopDetail={headerData?.promo_bar_top} />
      </Suspense>
      <div className="header">
        <nav className="header-nav">
          <div className="header-top">
            <div className="store-locator p-xs">
              <Link href="/" className="store-name location-icon">
                {headerData?.header_nav?.find_your_location}
              </Link>
              <Link href="/" className="all-location">
                {headerData?.header_nav?.view_all_location}
              </Link>
              <p>{headerData?.header_nav?.opening_time}</p>
            </div>

            <Link href="/" className="logo" aria-label="Travis Mathew Homepage">
              {headerData?.header_nav?.brand_logo_icon && (
                <Image
                  className="tm-logo desktop-logo"
                  loader={() => headerData?.header_nav?.brand_logo_icon?.url}
                  unoptimized={true}
                  src={headerData?.header_nav?.brand_logo_icon?.url}
                  alt={headerData?.header_nav?.alt_tag}
                  width="100"
                  height="100"
                  aria-label="tm-logo"
                />
              )}
              {headerData?.header_nav?.brand_logo_icon_mobile && (
                <Image
                  className="tm-logo mobile-logo"
                  loader={() =>
                    headerData?.header_nav?.brand_logo_icon_mobile?.url
                  }
                  unoptimized={true}
                  src={headerData?.header_nav?.brand_logo_icon_mobile?.url}
                  alt={headerData?.header_nav?.alt_tag}
                  width="100"
                  height="100"
                  aria-label="tm-logo"
                />
              )}
            </Link>
            <div className="w2">
              {authState.isAuth ? (
                <div className="user-account">
                  <UserAccount />
                </div>
              ) : (
                gigyaInstance && <LoginSignUp />
              )}
            </div>
          </div>
          <div className="header-navbar">
            {/* <div className="header-w2"></div> */}

            {headerDataResponse ? (
              <SecondaryNav navigation={headerDataResponse}></SecondaryNav>
            ) : null}
            <div className="navbar-right">
              {headerData?.header_nav?.brand_logo_icon_mobile && (
                <Image
                  className="tm-logo mobile-logo"
                  loader={() =>
                    headerData?.header_nav?.brand_logo_icon_mobile?.url
                  }
                  unoptimized={true}
                  src={headerData?.header_nav?.brand_logo_icon_mobile?.url}
                  alt={headerData?.header_nav?.alt_tag}
                  width="100"
                  height="100"
                  aria-label="tm-logo"
                />
              )}
              <SearchBox />
              <div className="links">
                <Link href="/" className="location-icon" aria-label="Store Location"></Link>
                {authState.isAuth ? (
                  <UserAccount />
                ) : (
                  gigyaInstance && (
                    <LoginSignUp hideScreenSet={true} hideDesktopBtn={true} />
                  )
                )}
                <Link
                  href={route.cart}
                  className="cart"
                  aria-label={cartLinkAriaLabel}
                >
                  {itemCount > 0 ? (
                    <span className="cart-count p-xs" aria-hidden>
                      {itemCount}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </div>
          </div>
          <div className="nav-search">
            {" "}
            <SearchBox />
          </div>
        </nav>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PromoBarBottom PromoBarBottomDetail={headerData?.promo_bar_bottom} />
      </Suspense>
    </>
  );
};

Header.propTypes = {
  labels: PropTypes.object,
  headerDataResponse: PropTypes.object,
  /**
   * Is the user logged in?
   */
  //   /**
  //    * What background color to use
  //    */
  //   backgroundColor: PropTypes.string,
  //   /**
  //    * How large should the button be?
  //    */
  //   size: PropTypes.oneOf(["small", "medium", "large"]),
  //   /**
  //    * Button contents
  //    */
  //   label: PropTypes.string.isRequired,
  //   /**
  //    * Optional click handler
  //    */
  //   onClick: PropTypes.func,
};

export default Header;
