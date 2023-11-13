import contentstack from "contentstack";
import Header from "../../components/POC/CallawayHeader";

export default function ProductPage({ posts, panel, productData }) {
  return (
    <div className="product-page-container container">
      <Header
        title="Product page React/Next POC!"
        bannerText={posts.promo_bar}
      />
      <div id="pdp-config" className="pdp-config-section  scrollspy">
        <div className=" product-configurator-container ">
          <div className="product-configurator-wrapper">
            <div
              id="custom-images-container"
              className="product-images-container"
            >
              <div className="product-images-gallery">
                <div
                  id="product-thumbs-19669"
                  className="config-thumb-contain activeGallery"
                  data-gallery-id="19669"
                >
                  <div className="config-image-thumbs thumb-instance-19669 swiper-container-initialized swiper-container-pointer-events swiper-container-free-mode swiper-container-thumbs swiper-container-vertical">
                    <div
                      className="swiper-wrapper"
                      id="swiper-wrapper-1310c06f101e9106c3e"
                      aria-live="polite"
                    >
                      <div
                        className="swiper-slide ajax-replace config-product-image config-thumb swiper-slide-thumb-active swiper-slide-visible swiper-slide-active"
                        data--url="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___1.png?sw=850&amp;sfrm=png"
                        data-img-alt="Fairway 14 Stand Bag - View 1"
                        data-loading-state="unloaded"
                        role="group"
                        aria-label="1 / 5"
                      >
                        <img src="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___1.png?sw=850&amp;sfrm=png" />
                      </div>
                      <div
                        className="swiper-slide ajax-replace config-product-image config-thumb swiper-slide-visible swiper-slide-next"
                        data-img-url="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___2.png?sw=850&amp;sfrm=png"
                        data-img-alt="Fairway 14 Stand Bag - View 2"
                        data-loading-state="unloaded"
                        role="group"
                        aria-label="2 / 5"
                      >
                        <img src="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___2.png?sw=850&amp;sfrm=png" />
                      </div>
                      <div
                        className="swiper-slide ajax-replace config-product-image config-thumb swiper-slide-visible"
                        data-img-url="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___3.png?sw=850&amp;sfrm=png"
                        data-img-alt="Fairway 14 Stand Bag - View 3"
                        role="group"
                        aria-label="3 / 5"
                      >
                        <img src="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___3.png?sw=850&amp;sfrm=png" />
                      </div>
                      <div
                        className="swiper-slide ajax-replace config-product-image config-thumb swiper-slide-visible"
                        data-img-url="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___4.png?sw=850&amp;sfrm=png"
                        data-img-alt="Fairway 14 Stand Bag - View 4"
                        role="group"
                        aria-label="4 / 5"
                      >
                        <img src="https://www.callawaygolf.com/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/sits/bags-2022-fairway-14-stand/bags-2022-fairway-14-stand_19669___4.png?sw=850&amp;sfrm=png" />
                      </div>
                      <div
                        className="product-carousel-video config-thumb swiper-slide swiper-slide-visible"
                        role="group"
                        aria-label="5 / 5"
                      >
                        <img
                          className="play-icon"
                          src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/on/demandware.static/Sites-CG4-Site/-/en_US/v1670868236991/images/video-cursor.svg?yocs=y_"
                          alt="product.playicon"
                        />

                        <img
                          src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/pdp/hands-on-video/accessories/Lowrider-Tech_2000x2000.png?sw=750&amp;q=50&amp;yocs=y_"
                          alt="Fairway 14 Stand Bag - View Video"
                        />
                      </div>
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    ></span>
                  </div>
                </div>

                <div
                  id="product-images-main"
                  className="product-image-sliders adaptive image-container"
                >
                  <div
                    className="config-image-slide config-video modal-open swiper-slide"
                    data-videoid="fbz3fOx57i0"
                  >
                    <div className="product-carousel-video">
                      <img
                        className="play-icon"
                        src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/on/demandware.static/Sites-CG4-Site/-/en_US/v1670868236991/images/video-cursor.svg?yocs=y_"
                        alt="product.playicon"
                      />

                      <img
                        src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/dw/image/v2/AADH_PRD/on/demandware.static/-/Sites-CGI-ItemMaster/en_US/v1670868236991/pdp/hands-on-video/accessories/Lowrider-Tech_2000x2000.png?sw=750&amp;q=50&amp;yocs=y_"
                        alt="Fairway 14 Stand Bag - View Video"
                      />
                    </div>
                  </div>
                </div>
                <div className="button-prev product-swiper-btn-prev">
                  <i className="far fa-chevron-left"></i>
                </div>
                <div className="button-next product-swiper-btn-next">
                  <i className="far fa-chevron-right"></i>
                </div>
              </div>
            </div>

            <div className="button-prev product-swiper-btn-prev">
              <i className="far fa-chevron-left"></i>
            </div>
            <div className="button-next product-swiper-btn-next">
              <i className="far fa-chevron-right"></i>
            </div>

            <div className="product-options-container is-slideout">
              <div className="pdp-info-section desktop">
                <div className="product-title-container">
                  <h1 className="h2">Fairway 14 Stand Bag</h1>
                </div>

                <div id="product-rating">
                  <span
                    className="pRating stars4"
                    itemProp="aggregateRating"
                    itemScope=""
                    itemType="http://schema.org/AggregateRating"
                  >
                    <span className="hidden" itemProp="ratingValue">
                      4.00
                    </span>
                    <span className="hidden" itemProp="reviewCount">
                      22
                    </span>
                  </span>
                  <span className="pRating-number">
                    <span className="value">4.0</span>
                  </span>
                  <span className="pRatingLink">
                    <a href="#product-reviews">Read / Write Reviews</a>
                  </span>
                </div>

                <div id="product-price" className="">
                  <span className="base noDisplay">
                    {productData.basePrice}
                  </span>

                  <span className="price-from">From</span>

                  <span className="was noDisplay">{productData.basePrice}</span>
                  <span className="wasPrice smallText noDisplay">
                    <span className="currency-prefix">$</span>
                    <span className="was-adjusted">
                      {productData.basePrice}
                    </span>
                    <span className="currency-suffix"></span>
                  </span>
                  <span className="currency-prefix">$</span>
                  <span className="adjusted">{productData.basePrice}</span>

                  <span className="currency-suffix"></span>
                </div>

                <ul className="product-promo">
                  <li>Availability: {productData.availability}</li>
                </ul>

                <div className="collapse-description-container">
                  <p
                    id="collapse-description"
                    className="collapse"
                    aria-expanded="false"
                  >
                    Fairway 14 offers the best of both worlds, combining the
                    organization and size of a cart bag with the portability of
                    a stand bag, and now integrates easily with most pushcarts.
                  </p>
                  <button
                    className="btn-read-more collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapse-description"
                    aria-expanded="false"
                    aria-controls="collapse-description"
                  ></button>
                </div>
              </div>

              <div id="product-configurator-ajax-container">
                <div className="no-slideout">
                  <div
                    id="product-configurator-ajax"
                    className=" soft-good-personalize-product-container"
                    data-last-attr="1"
                    data-last-value="19669"
                  >
                    <div
                      className="config-container complete"
                      data-input-complete="1509,44,39,1"
                    >
                      <div
                        id="one-config"
                        data-input-complete="1"
                        className="complete"
                      >
                        <div
                          className="configurator-container complete"
                          data-input-complete="1"
                        >
                          <div className="option-label" htmlFor="ajax-1">
                            Color
                            <span className="selected-value">
                              {" "}
                              - Navy/Red/USA
                            </span>
                          </div>
                        </div>

                        <div className="product-config-top-level-container">
                          <div className="top-level-container">
                            <button
                              id="personalization-btn"
                              className="config-top-level-btn"
                            >
                              <span className="top-level-thumbnail">
                                <img
                                  className="color-wheel"
                                  src="https://cdn-fsly.yottaa.net/58f0c36232f01c6abd17a924/www.callawaygolf.com/v~4b.4e/on/demandware.static/Sites-CG4-Site/-/en_US/v1670868236991/images/cg-color-wheel.svg?yocs=y_"
                                />
                              </span>
                              <div className="name">Customize</div>
                              <div className="selection-container"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product-config-summary">
                    <div id="product-price" className="">
                      <span className="base noDisplay">279.99</span>

                      <span className="price-from">From</span>

                      <span className="was noDisplay">279.99</span>
                      <span className="wasPrice smallText noDisplay">
                        <span className="currency-prefix">null</span>
                        <span className="was-adjusted">279.99</span>
                        <span className="currency-suffix">null</span>
                      </span>
                      <span className="currency-prefix">$</span>
                      <span className="adjusted">279.99</span>

                      <span className="currency-suffix"></span>
                    </div>

                    <div className="club-dates">
                      Availability:{" "}
                      <span id="product-availability">In Stock</span>
                    </div>
                  </div>
                  <form
                    id="product-configurator-ajax-form"
                    method="POST"
                    action="https://www.callawaygolf.com/on/demandware.store/Sites-CG4-Site/en_US/ProductConfigurator-Process"
                  >
                    <input type="hidden" name="format" value="json" />
                    <input type="hidden" name="target" value="" />
                    <input
                      className="pid"
                      type="hidden"
                      name="pid"
                      value="bags-2022-fairway-14-stand"
                    />
                    <input
                      className="vid"
                      type="hidden"
                      name="vid"
                      value="spr5543916"
                    />

                    <input
                      className="cgid"
                      type="hidden"
                      name="cgid"
                      value="stand-bags"
                    />

                    <input className="qty" type="hidden" name="qty" value="1" />

                    <input
                      className="ajax-form-condition"
                      type="hidden"
                      name="condition"
                      value="BNW"
                    />

                    <div className="configurator-action">
                      <button
                        className="configurator-action-btn configurator-add-btn btn btn-large pull-right sku-in"
                        type="submit"
                        name="action"
                        value="ADD_TO_CART"
                        title=""
                        encoding="off"
                        data-original-title="Please complete all selections."
                      >
                        <span
                          className="configurator-add-btn-txt"
                          aria-hidden="false"
                        >
                          Add To Cart
                        </span>
                        <span
                          className="configurator-out-btn-txt"
                          aria-hidden="true"
                        >
                          Sold Out
                        </span>
                      </button>
                    </div>
                  </form>

                  <div className="pdpRewardsCallout text-center">
                    <h4 className="pdpRewardsCalloutHeader">
                      Callaway Rewards
                    </h4>

                    <p className="pdpRewardsJoin">
                      You could earn 280 points with this purchase when you join
                      Callaway Rewards!
                    </p>
                    <p className="pdpRewardsLogin">
                      <a
                        id="account-icon"
                        data-toggle="modal"
                        data-target="#signinmodal"
                        aria-label="Log In or Sign Up"
                        href="#"
                        title="Log In"
                      >
                        Log In
                      </a>{" "}
                      or{" "}
                      <a href="https://www.callawaygolf.com/on/demandware.store/Sites-CG4-Site/en_US/Account-StartRegister">
                        Join Rewards Today
                      </a>
                    </p>
                  </div>
                </div>
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
  const Stack = await contentstack.Stack({
    api_key: process.env.MANTA_API_KEY,
    delivery_token: process.env.MANTA_DELIVERY_TOKEN,
    environment: 'preview',
  });
  let myQuery = await Stack.ContentType("landing_page").Entry(
    "bltf9ccb905a0701406"
  );
  let promo_panel_uid = "blt161f6770df6a2c62";
  let panelQuery = await Stack.ContentType("two_panel_banner").Entry(
    promo_panel_uid
  );

  const res = myQuery.fetch().then(
    function success(entry) {
      promo_panel_uid = entry.toJSON().two_panel_reference[0]?.uid;

      return entry.toJSON();
    },
    function error(err) {
      throw new Error(`Failed to fetch posts, received status ${err.status}`);
    }
  );

  const panelRes = panelQuery.fetch().then(
    function success(entry) {
      return entry.toJSON();
    },
    function error(err) {
      throw new Error(`Failed to fetch posts, received status ${err.status}`);
    }
  );

  const demandWareReq = fetch(
    "https://www.callawaygolf.com/on/demandware.store/Sites-CG4-Site/en_US/ProductConfigurator-FilteredAttributes?format=json&target=&pid=bags-2021-hl-zero-stand-double-strap&vid=spr5469103&cgid=stand-bags&qty=1&condition=BNW"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  //WebDAM request. We setup the form data to obtain the access token from the external endpoint, then use that to create a request for an asset.
  var fd = new URLSearchParams();
  fd.append("client_id", process.env.WEBDAM_ID);
  fd.append("client_secret", process.env.WEBDAM_SECRET);
  fd.append("grant_type", process.env.WEBDAM_GRANT_TYPE);
  fd.append("username", process.env.WEBDAM_USERNAME);
  fd.append("password", process.env.WEBDAM_PASSWORD);

  //WebDAM request options
  const requestOptions = {
    method: "POST",
    body: fd,
  };

  //We make the actual request and use the resulting bearer token to fetch data
  const resWebDam = fetch(
    `https://apiv2.webdamdb.com/oauth2/token?client_id=${process.env.WEBDAM_ID}&client_secret=${process.env.WEBDAM_SECRET}&username=${process.env.WEBDAM_USERNAME}&password=${process.env.WEBDAM_PASSWORD}&grant_type=${process.env.WEBDAM_GRANT_TYPE}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      fetch("https://apiv2.webdamdb.com/folders", {
        method: "post",
        headers: new Headers({
          Authorization: "Bearer " + data.access_token,
          "Content-Type": "application/json",
        }),
      }).then((dta) => {
      });
      //TODO: Fetch folder from WebDam using token.
      return data;
    });

  const posts = await res;
  const panel = await panelRes;
  const productData = await demandWareReq;
  const webDam = await resWebDam;

  // If the request was successful, return the posts
  // and revalidate every 10 seconds.
  return {
    props: {
      posts,
      panel,
      productData,
      webDam,
    },
    revalidate: 10,
  };
}
