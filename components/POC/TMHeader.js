import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectAuthUser,
  setAuthState,
  setAuthUser,
  setToken,
  selectAuthState,
} from "../store/slices/authSlice";
import {
  selectCartCount,
  selectCartItems,
  setCartCount,
  setCartItems,
} from "../store/slices/cartSlice";
import { popupCenter } from "../lib/utils";

const TMHeader = ({ itemsInCart }) => {
  const { data: session, status: status } = useSession();
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUser);
  const userAuthState = useSelector(selectAuthState);
  const userToken = useSelector(selectToken);
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);

  const reloadPage = () => {
    location.reload();
    console.log("reloading page");
  };

  //Retrieve CDC auth state from next-auth and pass to Redux store
  useEffect(() => {
    session
      ? dispatch(setToken(session?.session?.access_token?.access_token))
      : null;
    session ? dispatch(setAuthUser(session?.session?.user)) : null;
    session ? setupShoppingCart() : null;
    status === "authenticated"
      ? dispatch(setAuthState(true))
      : dispatch(setAuthState(false));
  }, []);

  const signOutUser = () => {
    dispatch(setAuthState(false));
    signOut();
  };

  const setupShoppingCart = () => {
    if (userToken && userData) {
      let user = userData?.profile?.email;
      const instance = axios.create({
        baseURL: process.env.SERVER_BASE_URL,
        headers: { Authorization: "Bearer " + userToken },
      });

      //If cart doesn't exist, create one.
      instance.get(`/restv2/v2/b2c-us/users/${user}/carts`).then((response) => {
        if (!response.data.carts.length) {
          instance
            .post(`/restv2/v2/b2c-us/users/${user}/carts?fields=DEFAULT`)
            .then((response) => {
              if (response.data) {
                console.log("created cart", response.data);
              }
            });
        }
        //At this point the user has an active cart, add the product:
        else {
          const cartItems = response.data.carts[0].entries[0];
          dispatch(setCartItems(cartItems));
        }
      });
    }
  };

  const UserInfo = () => {
    if (userAuthState === true && userToken) {
      window.close();
      return (
        <div>
          Hi {userData?.profile?.firstName}
          <button className="btn--secondary" onClick={() => signOutUser()}>
            Sign out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="btn--secondary"
            onClick={() =>
              popupCenter(
                "/api/auth/signin",
                "Sign In Popup",
                window.location.origin
              )
            }
          >
            Sign In
          </button>
        </div>
      );
    }
  };

  const CartInfo = () => {
    //if (cartItems && cartCount) {
    return (
      <>
        <div className="block b--mobile">
          <Link
            tabIndex="-1"
            aria-label="Cart"
            href="/cart"
            className="mini-cart-link js-mini-cart-link"
            data-mini-cart-url="/cart/rollover/MiniCart"
            data-mini-cart-refresh-url="/cart/miniCart/SUBTOTAL"
            data-mini-cart-name="Cart"
            data-mini-cart-empty-name="Empty Cart"
            data-mini-cart-items-text="Items"
            data-mini-cart-popup-url="/cart/mini-cart"
            data-page="homepage"
          ></Link>
          <Link
            href="/cart"
            className="cartBtnMobile b--navbar--mobile__primary__cart cart-btn-in-mobile"
            title="cart"
          >
            <span className="nav-items-total b--cart__mini--products hidden"></span>

            <img
              className="cartIcon"
              srcSet="https://www.travismathew.com/_ui/responsive/theme-tm/images/icon-cart-M.svg?im=Resize,width=500 500w, 
											https://www.travismathew.com/_ui/responsive/theme-tm/images/icon-cart-M.svg?im=Resize,width=700 700w, 
											https://www.travismathew.com/_ui/responsive/theme-tm/images/icon-cart-M.svg?im=Resize,width=1380 1380w"
              sizes="(max-width:1023px) 100vw, 33vw"
              alt="Cart"
              width="21"
              height="32"
            />
          </Link>
        </div>
        <div className="block b--desktop">
          <Link
            href="/cart"
            className="cartBtn no-cursor btn btn--secondary cart-button-z TravisMathewMlogo "
            title="cart"
          >
            <span className="nav-items-total b--cart__mini--products">
              {itemsInCart}
            </span>
            <img
              className="cartIcon"
              srcSet="https://www.travismathew.com/_ui/responsive/theme-tm/images/icon-cart.svg?im=Resize,width=500 500w, 
											https://www.travismathew.com/_ui/responsive/theme-tm/images/icon-cart.svg?im=Resize,width=700 700w, 
											https://www.travismathew.com/_ui/responsive/theme-tm/images/icon-cart.svg?im=Resize,width=1380 1380w"
              sizes="(max-width:1023px) 100vw, 33vw"
              alt="Cart"
              width="19"
              height="28"
            />
          </Link>
        </div>
      </>
    );
    //}
  };

  return (
    <>
      <nav className="block b--navbar main-nav" id="js-active">
        <div id="floating-nav">
          <div className="block b--navbar__third" role="header">
            <div className="b--desktop">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-8 col-sm-6 p-l-0">
                    <ul className="b--navbar__third__info--companies">
                      <li className="active">
                        <Link className="sbc-a" href="/" title="TravisMathew">
                          <img
                            className="tm-logo-sbc"
                            alt="TravisMathew"
                            src="https://www.travismathew.com/medias/sys_master/images/images/h95/h91/8818225250334/TravisMathewLogo.svg"
                            width="140"
                            height="17"
                          />
                        </Link>
                      </li>
                      <li className="">
                        <Link href="/cuater" title="Cuater">
                          <img
                            className="cuater"
                            alt="Cuater"
                            src="https://www.travismathew.com/medias/sys_master/images/images/h1a/hef/8796249325598/CuaterLogo.svg"
                            width="70"
                            height="15"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="col-xs-4 col-sm-6 b--navbar__third__user--status nopadding "
                    id="userNav"
                  >
                    <ul>
                      <li className="f-shadow">
                        <UserInfo></UserInfo>
                      </li>
                      <li>
                        <div className="nav-cart">
                          <Link
                            tabIndex="-1"
                            aria-label="Cart"
                            href="/cart"
                            className="mini-cart-link js-mini-cart-link"
                            data-mini-cart-url="/cart/rollover/MiniCart"
                            data-mini-cart-refresh-url="/cart/miniCart/SUBTOTAL"
                            data-mini-cart-name="Cart"
                            data-mini-cart-empty-name="Empty Cart"
                            data-mini-cart-items-text="Items"
                            data-mini-cart-popup-url="/cart/mini-cart"
                            data-page="homepage"
                          ></Link>

                          <CartInfo></CartInfo>

                          <div
                            className="b--navbar__modal--cart"
                            aria-live="polite"
                          ></div>
                          <div
                            className="b--navbar__modal--minicart"
                            aria-live="polite"
                          ></div>
                          <div className="overlay"></div>
                        </div>
                        <div className="mini-cart-container js-mini-cart-container"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="b--mobile">
              <div className="container">
                <div className="row">
                  <div>
                    <ul className="b--navbar__third__info--companies  b--navbar--mobile__third__logos">
                      <li className="active">
                        <Link className="sbc-a" href="/" title="TravisMathew">
                          <img
                            className="tm-logo-sbc"
                            alt="TravisMathew"
                            src="https://www.travismathew.com/medias/sys_master/images/images/h95/h91/8818225250334/TravisMathewLogo.svg"
                            width="140"
                            height="17"
                          />
                        </Link>
                      </li>
                      <li className="">
                        <Link href="/cuater" title="Cuater">
                          <img
                            className="cuater"
                            alt="Cuater"
                            src="https://www.travismathew.com/medias/sys_master/images/images/h1a/hef/8796249325598/CuaterLogo.svg"
                            width="70"
                            height="15"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block b--navbar__primary nopadding">
            <div className="block b--desktop">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-4 col-sm-offset-4 tm_Logo">
                    <Link
                      href="/"
                      className="center-block main-site-logo"
                      title="TravisMathew"
                    >
                      <img
                        className="main-logo-header"
                        alt="TravisMathew"
                        src="https://www.travismathew.com/medias/sys_master/images/images/h95/h91/8818225250334/TravisMathewLogo.svg"
                        width="100"
                        height="46"
                      />
                    </Link>
                  </div>
                  <div
                    className="float-right searchcontainer"
                    id="search_overly"
                  >
                    <div className="searchoverlay_d"></div>
                    <div
                      className="form-group form-group-search form-group-search--active"
                      id="navSearch"
                    >
                      <div className="yCmsComponent">
                        <label htmlFor="searchText" className="sr-only">
                          Search
                        </label>
                      </div>
                      <div className="search-result-overlay">
                        <div
                          className="searchResults"
                          id="resultsDiv"
                          aria-live="polite"
                          role="status"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block b--mobile">
                <div className="b--navbar--mobile__primary">
                  <div className="b--navbar--mobile__primary__b--wrapper">
                    <div className="m_searchoverlay"></div>
                    <div
                      className="b--navbar--mobile__primary__menu-wrapper"
                      id="mobilePrimaryNavWrapper"
                    >
                      <Link
                        aria-expanded="false"
                        href="/"
                        role="button"
                        className="b--navbar--mobile__primary__trigger"
                        aria-label="burger menu"
                      ></Link>
                      <div className="b--navbar--mobile__primary__b--wrapper__joinRewards b--highlights registerBtn"></div>

                      <div className="b--navbar--mobile__primary__b--wrapper__minnav">
                        <Link
                          href="/"
                          className="btn btn-secondary b--navbar--mobile__primary__b--wrapper__minnav__prev"
                          id="b--navbar__third__prev"
                          aria-label="navigation back"
                        >
                          {" "}
                          <i className="s s-chevron-left s-4x">
                            <span></span>
                          </i>
                        </Link>{" "}
                        <Link
                          href="/"
                          className="btn btn-secondary b--navbar--mobile__primary__b--wrapper__minnav__close b--navbar__third__close"
                          id="b--navbar__third__close"
                          aria-label="navigation close"
                        >
                          {" "}
                          <i className="s s-close s-4x">
                            <span></span>
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="yCmsComponent">
                <section
                  id="cptTMNavigationBarComponent"
                  data-cpt-name="tm-navigation-bar-component"
                >
                  <div className="block b--navbar__secondary" role="navigation">
                    <div className="b--desktop">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12">
                            <ul className="b--navbar__secondary__nav">
                              <li>
                                <div id="b--section-primaryGiftGuideNavNode">
                                  <Link
                                    href="/c/0120"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8798452384832"
                                    aria-expanded="false"
                                  >
                                    GIFT GUIDE
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryFeaturedNavNode">
                                  <Link
                                    href="/c/011"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796096922688"
                                    aria-expanded="false"
                                  >
                                    FEATURED
                                  </Link>
                                </div>
                              </li>
                              <li></li>
                              <li>
                                <div id="b--section-primaryBottomsNavNode">
                                  <Link
                                    href="/c/014"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796097741888"
                                    aria-expanded="false"
                                  >
                                    BOTTOMS
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryFootwearNavNode">
                                  <Link
                                    href="/c/026"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796097905728"
                                    aria-expanded="false"
                                  >
                                    SHOES
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryHatsNavNode">
                                  <Link
                                    href="/c/015"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796098036800"
                                    aria-expanded="false"
                                  >
                                    HATS
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryAccessoriesNavNode">
                                  <Link
                                    href="/c/016"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796098266176"
                                    aria-expanded="false"
                                  >
                                    ACCESSORIES
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryGolfNavNode">
                                  <Link
                                    href="/c/0501"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8797502145600"
                                    aria-expanded="false"
                                  >
                                    GOLF
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryCollectionsNavNode">
                                  <Link
                                    href="/c/012"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796096529472"
                                    aria-expanded="false"
                                  >
                                    COLLECTIONS
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryWomenNavNode">
                                  <Link
                                    href="/c/044"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8797633414208"
                                    aria-expanded="false"
                                  >
                                    Women
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div id="b--section-primaryDiscoverNavNode">
                                  <Link
                                    href="/discover"
                                    data-trigger="overlap-menu"
                                    trigger-target="subnav--8796098495552"
                                    aria-expanded="false"
                                  >
                                    DISCOVER
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="b--mobile">
                      <div className="container-fluid nopadding">
                        <div className="row">
                          <div className="col-md-12">
                            <ul
                              role="list"
                              className="b--navbar--mobile__nav-primary my-account-mobile-menu moboMenu"
                            >
                              <div className="scroll"></div>
                            </ul>

                            <ul
                              role="list"
                              className="b--navbar--mobile__nav-primary"
                            >
                              <div className="scroll">
                                <li role="listitem">
                                  <div id="b--section-primaryGiftGuideNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8798452384832"
                                      href="/"
                                    >
                                      GIFT GUIDE
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8798452384832"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8798452384832"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            GIFT GUIDE
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryShopAllGiftGuide"
                                            >
                                              <Link href="/c/0120">
                                                Shop All Gifts
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGGUnder200NavNode"
                                            >
                                              <Link href="/c/0196">
                                                Gifts Under $200
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGGUnder100NavNode"
                                            >
                                              <Link href="/c/0195">
                                                Gifts Under $100
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGGUnder50NavNode"
                                            >
                                              <Link href="/c/0194">
                                                Gifts Under $50
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGGGolferNavNode"
                                            >
                                              <Link href="/c/0197">
                                                The Golfer
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGGLoungerNavNode"
                                            >
                                              <Link href="/c/0198">
                                                The Lounger
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGiftsAthleteNavNode"
                                            >
                                              <Link href="/c/01914">
                                                The Athlete
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGGNightOwlNavNode"
                                            >
                                              <Link href="/c/0199">
                                                The Night Owl
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryWomenGiftGuideNode"
                                            >
                                              <Link href="/c/0453">
                                                Gifts For Her
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryForYouthNav"
                                            >
                                              <Link href="/c/01919">
                                                Gifts For Youth
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row">
                                              <div className="b--overlay-menu__card">
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/c/01234">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/h46/h32/9141622571038/W1422-FH22-Holidazed-Mega-Nav-Thumbnail-02.jpg"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      Get into the holiday
                                                      spirit with limited
                                                      edition styles.
                                                    </span>
                                                    <span className="card_content">
                                                      Shop Collection&gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryFeaturedNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796096922688"
                                      href="/"
                                    >
                                      FEATURED
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796096922688"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796096922688"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            FEATURED
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryNewArrivalsNavNode"
                                            >
                                              <Link href="/c/0111">
                                                NEW ARRIVALS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryBestSellersNavNode"
                                            >
                                              <Link href="/c/0112">
                                                BEST SELLERS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryPerfectSeriesNav"
                                            >
                                              <Link href="/c/01238">
                                                THE PERFECT SERIES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryCloudCollection2Nav"
                                            >
                                              <Link href="/c/0124 ">
                                                Cloud Collection
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryTopsNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796097545280"
                                      href="/"
                                    >
                                      TOPS
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796097545280"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796097545280"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            TOPS
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryPolosNavNode"
                                            >
                                              <Link href="/c/0131">POLOS</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryTshirtsNavNode"
                                            >
                                              <Link href="/c/0132">TEES</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryButtonUpsNavNode"
                                            >
                                              <Link href="/c/0133">
                                                BUTTON-UPS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryOuterWearNavNode"
                                            >
                                              <Link href="/c/0134">
                                                OUTERWEAR
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryYouthTops"
                                            >
                                              <Link href="/c/0136">
                                                Youth Tops
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryShopAllTopsNavNode"
                                            >
                                              <Link href="/c/0135">
                                                SHOP ALL
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row">
                                              <div className="b--overlay-menu__card">
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/c/0134">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/hfd/hfc/9139623165982/QuarterZipThumbail.jpg"
                                                      srcSet="/medias/sys_master/images/images/hfd/hfc/9139623165982/QuarterZipThumbail.jpg?im=Resize,width=200 200w,
                                                                                                /medias/sys_master/images/images/hfd/hfc/9139623165982/QuarterZipThumbail.jpg?im=Resize,width=300 300w,
                                                                                                /medias/sys_master/images/images/hfd/hfc/9139623165982/QuarterZipThumbail.jpg?im=Resize,width=400 400w,
                                                                                                /medias/sys_master/images/images/hfd/hfc/9139623165982/QuarterZipThumbail.jpg?im=Resize,width=500 500w"
                                                      sizes="(max-width:1200px) 100vw, 200px"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      Get Winter Weather Ready
                                                    </span>
                                                    <span className="card_content">
                                                      Shop New Outerwear &gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/c/0131">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/h8f/h7e/9139621298206/D5PoloThumbnail.jpg"
                                                      srcSet="/medias/sys_master/images/images/h8f/h7e/9139621298206/D5PoloThumbnail.jpg?im=Resize,width=200 200w,
                                                                                                /medias/sys_master/images/images/h8f/h7e/9139621298206/D5PoloThumbnail.jpg?im=Resize,width=300 300w,
                                                                                                /medias/sys_master/images/images/h8f/h7e/9139621298206/D5PoloThumbnail.jpg?im=Resize,width=400 400w,
                                                                                                /medias/sys_master/images/images/h8f/h7e/9139621298206/D5PoloThumbnail.jpg?im=Resize,width=500 500w"
                                                      sizes="(max-width:1200px) 100vw, 200px"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      Transition your look for
                                                      fall{" "}
                                                    </span>
                                                    <span className="card_content">
                                                      Shop New Polos &gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryBottomsNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796097741888"
                                      href="/"
                                    >
                                      BOTTOMS
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796097741888"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796097741888"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            BOTTOMS
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryShortsNavNode"
                                            >
                                              <Link href="/c/0141">SHORTS</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryBoardShortsNavNode"
                                            >
                                              <Link href="/c/0144">
                                                BOARDSHORTS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryPantsNavNode"
                                            >
                                              <Link href="/c/0142">PANTS</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryLegacyDenimNavNode"
                                            >
                                              <Link href="/c/0129">JEANS</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primarynavnode_000003UW"
                                            >
                                              <Link href="/c/0145">
                                                Youth Bottoms
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryShopAllBottomsNavNode"
                                            >
                                              <Link href="/c/0143">
                                                SHOP ALL
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryFootwearNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796097905728"
                                      href="/"
                                    >
                                      SHOES
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796097905728"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796097905728"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            SHOES
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGolfShoes2NavNode"
                                            >
                                              <Link href="/c/022">
                                                GOLF SHOES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryCasualShoesNavNode"
                                            >
                                              <Link href="/c/0264">
                                                CASUAL SHOES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primarySandalsNavNode"
                                            >
                                              <Link href="/c/0263">
                                                SANDALS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryHatsNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796098036800"
                                      href="/"
                                    >
                                      HATS
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796098036800"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796098036800"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            HATS
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primarySnapBackHatsNavNode"
                                            >
                                              <Link href="/c/0151">
                                                SNAPBACK HATS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryFittedHatsNavNode"
                                            >
                                              <Link href="/c/0152">
                                                FITTED HATS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryDestinationHatsNavNode"
                                            >
                                              <Link href="/c/0153">
                                                DESTINATION HATS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryBeaniesNavNode"
                                            >
                                              <Link href="/c/0155">
                                                BEANIES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryYouthHats"
                                            >
                                              <Link href="/c/0157">
                                                Youth Hats
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryShopAllHatsNavNode"
                                            >
                                              <Link href="/c/0156">
                                                SHOP ALL
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryAccessoriesNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796098266176"
                                      href="/"
                                    >
                                      ACCESSORIES
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796098266176"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796098266176"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            ACCESSORIES
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryBeltsTMNavNode"
                                            >
                                              <Link href="/c/0241">Belts</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGolfGloves2NavNode"
                                            >
                                              <Link href="/c/0244">
                                                GOLF GLOVES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primarySocksTMNavNode"
                                            >
                                              <Link href="/c/0242">Socks</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryLuggageNavNode"
                                            >
                                              <Link href="/c/0161">
                                                LUGGAGE &amp; BACKPACKS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryTMXCorkcicleDrinkwareNavNode"
                                            >
                                              <Link href="/c/0165">
                                                TM X CORKCICLE
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGiftcards2"
                                            >
                                              <Link href="/p/GiftCard">
                                                Gift Cards
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryShopAllAccessoriesNavNode"
                                            >
                                              <Link href="/c/0164">
                                                SHOP ALL
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryGolfNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8797502145600"
                                      href="/"
                                    >
                                      GOLF
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8797502145600"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8797502145600"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            GOLF
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryHeaterSeriesNavNode"
                                            >
                                              <Link href="/c/0126">
                                                HEATER GOLF
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryGolfShoesNavNode"
                                            >
                                              <Link href="/c/0223">
                                                GOLF SHOES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryTMGolfGlovesNavNode"
                                            >
                                              <Link href="/c/0244">
                                                Golf Gloves
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryCuaterAccessoriesNavNode"
                                            >
                                              <Link href="/c/024">
                                                Accessories
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryCollectionsNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796096529472"
                                      href="/"
                                    >
                                      COLLECTIONS
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796096529472"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796096529472"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            COLLECTIONS
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryHolidazedConfusedNavNode"
                                            >
                                              <Link href="/c/01234">
                                                Holidazed &amp; Confused
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primarySTANDREWSCOLLECTIONNAV"
                                            >
                                              <Link href="/c/0755">
                                                TM X ST ANDREWS LINKS COLLECTION
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryCloudCollectionNav"
                                            >
                                              <Link href="/c/0124 ">
                                                CLOUD COLLECTION
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryHeaterActiveNavNode"
                                            >
                                              <Link href="/c/01235">
                                                Heater Active
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryHeaterGolfNavNode"
                                            >
                                              <Link href="/c/0126">
                                                Heater Golf
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryYouthCollectionNavNode"
                                            >
                                              <Link href="/c/0128">
                                                YOUTH COLLECTION
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryDestinationsNavNode"
                                            >
                                              <Link href="/destinations">
                                                DESTINATIONS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row">
                                              <div className="b--overlay-menu__card">
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/c/0124">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/hf8/hc6/9139622412318/CloudDenimThumbnail.jpg"
                                                      srcSet="/medias/sys_master/images/images/hf8/hc6/9139622412318/CloudDenimThumbnail.jpg?im=Resize,width=200 200w,
                                                                                                /medias/sys_master/images/images/hf8/hc6/9139622412318/CloudDenimThumbnail.jpg?im=Resize,width=300 300w,
                                                                                                /medias/sys_master/images/images/hf8/hc6/9139622412318/CloudDenimThumbnail.jpg?im=Resize,width=400 400w,
                                                                                                /medias/sys_master/images/images/hf8/hc6/9139622412318/CloudDenimThumbnail.jpg?im=Resize,width=500 500w"
                                                      sizes="(max-width:1200px) 100vw, 200px"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      Softer-Than-Ever Denim
                                                      Styles
                                                    </span>
                                                    <span className="card_content">
                                                      Shop Collection&gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryWomenNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8797633414208"
                                      href="/"
                                    >
                                      Women
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8797633414208"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8797633414208"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            Women
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryWomenNewArrivalsNavNode"
                                            >
                                              <Link href="/c/0412">
                                                New Arrivals
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryWomenTopNavNode"
                                            >
                                              <Link href="/c/0441">TOPS</Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryWomenBottomNavNode"
                                            >
                                              <Link href="/c/0442">
                                                BOTTOMS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryWomenCloudCollectionNavNode"
                                            >
                                              <Link href="/c/0414">
                                                The Cloud Collection
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryWomenShopAllNavNode"
                                            >
                                              <Link href="/c/0444">
                                                SHOP ALL
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row">
                                              <div className="b--overlay-menu__card">
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/p/1LB003_4SKY_">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/hb4/h59/9133287342110/W1412-FH22-WOMENS-D1-MEGANAV-SKYWAYBLUE-WIDE.jpg"
                                                      srcSet="/medias/sys_master/images/images/hb4/h59/9133287342110/W1412-FH22-WOMENS-D1-MEGANAV-SKYWAYBLUE-WIDE.jpg?im=Resize,width=200 200w,
                                                                                                /medias/sys_master/images/images/hb4/h59/9133287342110/W1412-FH22-WOMENS-D1-MEGANAV-SKYWAYBLUE-WIDE.jpg?im=Resize,width=300 300w,
                                                                                                /medias/sys_master/images/images/hb4/h59/9133287342110/W1412-FH22-WOMENS-D1-MEGANAV-SKYWAYBLUE-WIDE.jpg?im=Resize,width=400 400w,
                                                                                                /medias/sys_master/images/images/hb4/h59/9133287342110/W1412-FH22-WOMENS-D1-MEGANAV-SKYWAYBLUE-WIDE.jpg?im=Resize,width=500 500w"
                                                      sizes="(max-width:1200px) 100vw, 200px"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      {" "}
                                                      OUR FAMOUSLY SOFT FLEECE
                                                    </span>
                                                    <span className="card_content">
                                                      Shop Cloud Hoodie &gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li role="listitem">
                                  <div id="b--section-primaryDiscoverNavNode">
                                    <Link
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796098495552"
                                      href="/"
                                    >
                                      DISCOVER
                                    </Link>
                                  </div>{" "}
                                  <i className="s s-chevron-right s-1x">
                                    <Link
                                      className="arrowClick"
                                      href="/"
                                      data-trigger="overlap-menu"
                                      trigger-target="subnav--8796098495552"
                                      aria-label="sub navigation"
                                    ></Link>
                                  </i>
                                  <div
                                    className="b--overlay-menu"
                                    id="subnav--8796098495552"
                                  >
                                    <div className="container nopadding">
                                      <div className="row b--overlay-menu__wrapper">
                                        <div className="col-lg-3 nopadding">
                                          <div className="mobile-sub-category">
                                            DISCOVER
                                          </div>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <ul
                                            role="list"
                                            className="borderLeft"
                                          >
                                            <li
                                              role="listitem"
                                              id="b--section-primaryRetailsNavNode"
                                            >
                                              <Link href="/stores">
                                                STORE LOCATOR
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryTMRewardsNavNode"
                                            >
                                              <Link href="/tm-rewards">
                                                TM REWARDS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryStoriesNavNode"
                                            >
                                              <Link href="/discover/stories">
                                                STORIES
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryLifeOnTourNavNode"
                                            >
                                              <Link href="/discover/stories/?storyCategory=life-on-tour">
                                                Life On Tour
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryFabricandTechNavNode"
                                            >
                                              <Link href="/discover/fabric-tech">
                                                Fabric &amp; Tech
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryAmbassadorsNavNode"
                                            >
                                              <Link href="/ambassador">
                                                AMBASSADORS
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                            <li
                                              role="listitem"
                                              id="b--section-primaryAboutUsNavNode"
                                            >
                                              <Link href="/discover/about-us">
                                                About Us
                                              </Link>
                                              <i className="s s-chevron-right s-1x"></i>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-3 nopadding">
                                          <div className="container nopadding b--overlay-menu_ipad">
                                            <div className="row">
                                              <div className="b--overlay-menu__card">
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/discover/stories/introducing-tm-rewards-loyalty-program">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/hf0/h23/8820929167390/TM-Rewards.jpg"
                                                      srcSet="/medias/sys_master/images/images/hf0/h23/8820929167390/TM-Rewards.jpg?im=Resize,width=200 200w,
                                                                                                /medias/sys_master/images/images/hf0/h23/8820929167390/TM-Rewards.jpg?im=Resize,width=300 300w,
                                                                                                /medias/sys_master/images/images/hf0/h23/8820929167390/TM-Rewards.jpg?im=Resize,width=400 400w,
                                                                                                /medias/sys_master/images/images/hf0/h23/8820929167390/TM-Rewards.jpg?im=Resize,width=500 500w"
                                                      sizes="(max-width:1200px) 100vw, 200px"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      TM REWARDS IS HERE!
                                                    </span>
                                                    <span className="card_content">
                                                      Learn More &gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                                <div className="b--overlay-menu__card_ipad">
                                                  <Link href="/stores">
                                                    <img
                                                      loading="lazy"
                                                      src="/medias/sys_master/images/images/h51/hc7/8853074903070/SS20-D4-Mega-Nav-Photos-655x430-Storeexterior.jpg"
                                                      srcSet="/medias/sys_master/images/images/h51/hc7/8853074903070/SS20-D4-Mega-Nav-Photos-655x430-Storeexterior.jpg?im=Resize,width=200 200w,
                                                                                                /medias/sys_master/images/images/h51/hc7/8853074903070/SS20-D4-Mega-Nav-Photos-655x430-Storeexterior.jpg?im=Resize,width=300 300w,
                                                                                                /medias/sys_master/images/images/h51/hc7/8853074903070/SS20-D4-Mega-Nav-Photos-655x430-Storeexterior.jpg?im=Resize,width=400 400w,
                                                                                                /medias/sys_master/images/images/h51/hc7/8853074903070/SS20-D4-Mega-Nav-Photos-655x430-Storeexterior.jpg?im=Resize,width=500 500w"
                                                      sizes="(max-width:1200px) 100vw, 200px"
                                                      alt=""
                                                      width="191"
                                                      height="125"
                                                    />
                                                    <span className="card_title">
                                                      Shop at your local TM
                                                      retail store
                                                    </span>
                                                    <span className="card_content">
                                                      Store Locator &gt;
                                                    </span>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="reload"><a onClick={reloadPage}>Reload</a></div> */}
    </>
  );
};
export default TMHeader;
