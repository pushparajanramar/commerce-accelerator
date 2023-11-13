import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAuthState,
  setAuthUser,
  setToken,
} from "../../store/slices/authSlice";

export default function ProductPage({ posts, panel, productData }) {
  const { data: session } = useSession();

  const [cartIndicator, setCartIndicator] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const dispatch = useDispatch();

  // const productToAdd = {
  //   baseProduct: "1MT058_0HGP_",
  //   code: "1MT058_0HGP_M",
  //   name: "RESPITE",
  //   price: {
  //     currencyIso: "USD",
  //     value: 89.95,
  //   },
  //   product: {
  //     code: "1MT058_0HGP_M",
  //   },
  //   promotionPrice: {
  //     currencyIso: "USD",
  //     value: 0,
  //   },
  //   purchasable: true,
  //   stock: {},
  //   url: "/TM/NEW/New-Arrivals/RESPITE/p/1MT058_0HGP_M",
  // };

  useEffect(() => {
    if (cartData) {
      console.log("pre cartdata", cartData);
      //console.log('setting session data for cartData', JSON.stringify(JSON.parse(cartData)));
      //localStorage.setItem("cart", JSON.stringify(JSON.parse(cartData)));
    } else {
      updateToken();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart && storedCart !== "undefined") {
        //console.log('cart in session storage: ', storedCart);
        setCartData(storedCart.entry);
        setCartIndicator(storedCart.entry.quantity);
      }
    }
  }, []);

  useEffect(() => {
    setSessionData(session);
  }, []);

  useEffect(() => {
    updateItem(0);
  }, []);

  const updateToken = () => {
    //if (typeof window !== 'undefined') {
    let token = sessionData?.session?.access_token?.access_token;
    if (!token) {
      const sesssionInfo = JSON.parse(localStorage.getItem("session"));
      token = sesssionInfo?.session?.access_token?.access_token;
    }
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData && cartData !== "undefined") {
      setCartIndicator(cartData.entry.quantity);
    } else {
      setCartIndicator(0);
    }

    console.info("Hybris bearer token:", token);
    //}
  };

  const refreshIndicator = () => {
    //We need to sync up the data between hybris and the app, we add "0" products to the cart just to get it to refresh the count from the API
    dispatch(setAuthState(true));
    updateItem(0);
  };

  const handleChange = ({ target }) => {
    const val = target.value - cartIndicator;
    updateItem(val);
  };

  const updateItem = (delta) => {
    let token = sessionData?.session?.access_token?.access_token;
    let user = sessionData?.session?.user?.profile?.email;

    //First we make a request for all carts for the logged in user
    //If there is(are) a cart associated with the user, use thet cart and add the product from the PDP page
    //if the cart doesn't exist, create one and add the product

    if (!token) {
      updateToken();
    }

    if (token && user) {
      dispatch(setToken(token));
      let userCarts;
      const instance = axios.create({
        baseURL: process.env.SERVER_BASE_URL,
        headers: { Authorization: "Bearer " + token },
      });

      instance.get(`/restv2/v2/b2c-us/users/${user}/carts`).then((response) => {
        //If cart doesn't exist, create one.
        if (response.data.carts.length) {
          userCarts = response.data;
        } else {
          instance
            .post(`/restv2/v2/b2c-us/users/${user}/carts?fields=DEFAULT`)
            .then((response) => {
              if (response.data) {
                userCarts = response.data;
                //console.log("userCarts", userCarts.carts[0].code);
              }
            });
        }

        const newValue =
          userCarts.carts[0].entries[0].quantity + parseInt(delta);

        //At this point the user has an active cart, add the product:
        instance
          .patch(
            `/restv2/v2/b2c-us/users/${user}/carts/${userCarts.carts[0].code}/entries/0?fields=DEFAULT&qty=${newValue}`
          )
          .then((response) => {
            if (response.data) {
              localStorage.setItem("cart", JSON.stringify(response.data));
              setCartData(response.data.entry);
              setCartIndicator(response.data.entry.quantity);
            }
          });
        return response.data;
      });
    }
  };

  // const removeFromCart = () => {
  //   let token = sessionData?.session?.access_token?.access_token;
  //   let user = sessionData?.session?.user?.profile?.email;

  //   //First we make a request for all carts for the logged in user
  //   //If there is(are) a cart associated with the user, use thet cart and add the product from the PDP page
  //   //if the cart doesn't exist, create one and add the product

  //   // if (!token) {
  //   //   updateToken();
  //   // }

  //   if (token && user) {
  //     let userCarts;
  //     const instance = axios.create({
  //       baseURL: "https://hydev2.travismathew.com/",
  //       headers: { Authorization: "Bearer " + token },
  //     });

  //     instance
  //       .get(
  //         `/restv2/v2/b2c-us/users/${user}/carts`
  //       )
  //       .then((response) => {
  //         //If cart doesn't exist, create one.
  //         console.log("RESPONSE", response);
  //         if (response.data.carts.length) {
  //           userCarts = response.data;
  //         } else {
  //           instance
  //             .post(
  //               `/restv2/v2/b2c-us/users/${user}/carts?fields=DEFAULT`
  //             )
  //             .then((response) => {
  //               if (response.data) {
  //                 userCarts = response.data;
  //                 //console.log("userCarts", userCarts.carts[0].code);
  //             }});
  //         }

  //         //At this point the user has an active cart, add the product:
  //         instance
  //           .post(
  //             `/restv2/v2/b2c-us/users/${user}/carts/${userCarts.carts[0].code}/entries?fields=DEFAULT&code=${productToAdd.code}`
  //           )
  //           .then((response) => {
  //             if (response.data) {
  //               //console.log("PRODUCT ADDED TO CART: ", response.data);
  //               localStorage.setItem("cart", JSON.stringify(response.data));
  //               setCartData(response.data.entry);
  //               setCartIndicator(response.data.entry.quantity);
  //             }
  //           });
  //         return response.data;
  //       });
  //   }
  // };

  return (
    <div className="product-page-container container">
      <div className="row">
        <div className="col-md-8" id="cartContents">
          <div className="row">
            <div className="col-md-8">
              <div className="b--hd__title text-left hidden-sm hidden-xs">
                Your Cart (0)
              </div>
              <div className="b--hd__title text-left hidden-lg hidden-md">
                YOUR CART (0)
              </div>
            </div>
            <div className="col-md-4 text-align-r">
              <Link href="/" aria-labelledby="Continue Shopping">
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          <div className="yCmsComponent yComponentWrapper">
            <section id="cptRewardsComponent" data-cpt-name="rewards-component">
              <div className="reward-block">
                <div className="re-title">
                  <img
                    src="https://www.travismathew.com/_ui/responsive/theme-tm/images/tm-rewards-black.svg"
                    alt="TravisMathew Rewards"
                  />
                </div>
                <div className="re-text">
                  <ul>
                    <li className="">
                      <span className="f-bold t-uppercase">
                        FREE SHIPPING AND RETURNS FOR MEMBERS
                      </span>
                    </li>
                    <li className="f-m">
                      Join TM Rewards to earn points on every purchase.&nbsp;{" "}
                    </li>
                  </ul>
                  <ul>
                    <li className="">
                      <span className="f-bold">Free Shipping for Members</span>
                    </li>
                    <li className="f-m">
                      Become a TM Rewards member for fast and free shipping.{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="yCmsComponent yComponentWrapper">
            <div className="item-block">
              <div className="item-title">
                <h2 className="f-m f-bold">Your Items</h2>
              </div>
            </div>
            <div className="item-block">
              <ul className="cart-item-border-bottom">
                <li className="giftCardCheckout">
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_code"
                    value="1MT058_0HGP_M"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_name"
                    value="RESPITE"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_brand"
                    value="TM"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_category"
                    value="New Arrivals"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_color"
                    value="Heather Grey Pinstripe"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_size"
                    value="M"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_price"
                    value="89.95"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_image"
                    value="/medias/sys_master/images/images/hf6/hb8/8896981467166/1MT058-0HGP.jpg"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_url"
                    value="/TM/NEW/New-Arrivals/RESPITE/p/1MT058_0HGP_M"
                  />
                  <input
                    readOnly
                    type="hidden"
                    className="gtm_product_original_price"
                    value="89.95"
                  />
                  <div className="row row-flex">
                    <div className="cart-img col-md-3 col-sm-4 col-xs-4 cart-left-flex">
                      <Link href="/TM/NEW/New-Arrivals/RESPITE/p/1MT058_0HGP_M">
                        {" "}
                        <img
                          className="minicart-product-img gc_OrderReceipt cursor-hand"
                          src=""
                          srcSet="https://www.travismathew.com/medias/sys_master/images/images/hd9/he8/8896981794846/1MT058-0HGP.jpg?im=Resize,width=500 500w,
                                                https://www.travismathew.com/medias/sys_master/images/images/hd9/he8/8896981794846/1MT058-0HGP.jpg?im=Resize,width=700 700w,
                                                https://www.travismathew.com/medias/sys_master/images/images/h21/h57/8896981663774/1MT058-0HGP.jpg?im=Resize,width=1380 1380w"
                          sizes="(max-width:1023px) 100vw, 33vw"
                          alt=""
                          title="RESPITE"
                          width="61"
                          height="77"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8 cart-right-flex">
                      <div className="row  mobile--padding cartView">
                        <div className="col-md-5">
                          <Link href="/TM/NEW/New-Arrivals/RESPITE/p/1MT058_0HGP_M">
                            <h3 className="p-name f-m f-bold">RESPITE</h3>
                          </Link>{" "}
                          <p className="p-color f-m">
                            Color:&nbsp;
                            <span className="f-bold text-uppercase">
                              Heather Grey Pinstripe
                            </span>
                          </p>
                          <p className="p-color f-m">
                            Size:&nbsp;
                            <span className="f-bold text-uppercase">M</span>
                          </p>
                        </div>
                        <div className="col-md-4 col-sm-12 qty--main">
                          <div className="quantity qty--in">
                            <div
                              className="quantity-button quantity-down cart-qty-down js-update-quantity-buttons "
                              onClick={() => updateItem(-1)}
                            >
                              −
                            </div>
                            <input
                              onChange={handleChange}
                              id="quantity_0"
                              name="quantity"
                              className="form-control js-update-entry-quantity-input"
                              type="number"
                              aria-label="quantity"
                              value={cartData?.quantity || 0}
                              size="1"
                            />
                            <div
                              className="quantity-button quantity-up js-update-quantity-buttons cart-qty-up "
                              onClick={() => updateItem(1)}
                            >
                              +
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                          <div className="price f-bold f-m">
                            ${cartData?.product?.price?.value}
                          </div>
                          <ul className="btn-selectors text-right">
                            <li>
                              <form
                                id="cartEntryActionForm"
                                data-action-entry-numbers="0"
                                data-entry-action-url="/cart/entry/execute/REMOVE"
                                data-entry-initial-quantity="4"
                                data-entry-action="REMOVE"
                                className="js-execute-entry-action-button"
                                data-entry-product-code="1MT058_0HGP_M"
                                action="/cart/entry/execute/REMOVE"
                                method="post"
                              >
                                <input
                                  readOnly
                                  type="hidden"
                                  name="entryNumbers"
                                  value="0"
                                />
                                <input
                                  readOnly
                                  type="hidden"
                                  name="isMiniCartRemove"
                                  value="false"
                                />
                                <input
                                  readOnly
                                  type="hidden"
                                  name="reDirection"
                                  value="false"
                                />
                                <button
                                  type="submit"
                                  className="btn_anchor"
                                  id="removeEntryDY"
                                >
                                  Remove
                                </button>
                                <div></div>
                              </form>
                            </li>
                            <li>
                              <form
                                id="entryWishlistForm"
                                action="/cart/add2Wishlist"
                                method="post"
                              >
                                <input
                                  readOnly
                                  type="hidden"
                                  name="entryToAdd"
                                  id="entryToAdd"
                                  value="0"
                                />
                              </form>
                            </li>
                          </ul>
                        </div>

                        <div
                          id="lineLevelEAD0"
                          className="shipng-estimate-text"
                        ></div>
                        <input type="hidden" readOnly value="false" />
                      </div>
                      <div className="clearfix"></div>

                      <div className="row hidden-lg hidden-md"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {cartData?.quantity < 1 ? (
            <div className="empty-cart__wrapper">
              <h4 className="f-bold">There are no items in your cart </h4>
            </div>
          ) : null}
        </div>

        <div className="yCmsComponent yComponentWrapper col-md-4">
          <div className="cartTotals">
            <div className="cartTotals"></div>
            <div className="col-md-12">
              <div className="order-summary add--block">
                <h2 className="b--hd__title display-block">Order Summary</h2>
                <input type="hidden" id="geopoint" readOnly value="" />
                <ul className="summury-list">
                  <div className="summary-table">
                    <table className="table table-borderd">
                      <tbody>
                        <tr>
                          <td className="p-b-0">
                            <span className="f-bold f-m sub-title">
                              Subtotal
                            </span>
                          </td>
                          <td className="p-b-0">
                            <span className="f-bold f-m sub-title text-right price-num">
                              ${cartData?.totalPrice?.value?.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <div id="estimatedDate" className="">
                              <div className="floating-label hide--block-in hide__block zipCodeUpdateDiv">
                                <form autoComplete="off">
                                  <div className="form-group row">
                                    <div className="col-xs-12 f-label__wrapper">
                                      <label className="control-label">
                                        <sup>* </sup>
                                        <span>zip code</span>
                                      </label>
                                      <input
                                        className="form-control c__input"
                                        type="text"
                                        name="zipcode"
                                        id="enter_pincode"
                                      />
                                    </div>
                                    <div className="col-xs-12 f-label__wrapper">
                                      <button className="btn btn--primary btn--primary-light text-uppercase zipCodeChange">
                                        Change
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <li className="li2 sticky-checkout">
                    <h3 className="total f-bold f-m">
                      Total: ${cartData?.totalPrice?.value?.toFixed(2)}
                    </h3>
                    <div className="checkout-buttons">
                      <Link
                        href="https://hydev2.travismathew.com/checkout"
                        className="btn-common btn--secondary f-m hidden-sm hidden-xs TravisMathewMlogo"
                      >
                        Checkout
                      </Link>
                      <form
                        id="guestForm"
                        action="https://hydev2.travismathew.com/login/checkout/guest"
                        method="post"
                      >
                        <button
                          type="submit"
                          className="btn-common btn--outline-primary transparent-bg f-m hidden-md hidden-lg checkout-show-option-button TravisMathewMlogo"
                        >
                          Check out as guest
                        </button>
                        <div>
                          <input
                            readOnly
                            type="hidden"
                            name="CSRFToken"
                            value="c30f05ac-3b78-4c4e-88d5-ce0b4cbff451"
                          />
                        </div>
                      </form>{" "}
                    </div>
                  </li>

                  <li className="text-center">
                    <div className="need-help">
                      <p className="m-b-15">Need Help?</p>
                      <p>1-877-969-1952</p>
                      <a onClick={() => refreshIndicator()}>Refresh</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // If this request throws an uncaught error, Next.js will
  // not invalidate the currently shown page and
  // retry getStaticProps on the next request.

  // If the request was successful, return the posts
  // and revalidate every 10 seconds.
  return {
    props: {},
    revalidate: 10,
  };
}
