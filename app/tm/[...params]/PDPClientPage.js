import PDPProductConfigurationForm from "../../../components/PDP/PDPProductConfigurationForm/PDPProductConfigurationForm";
// import PDPProductImageGallery from "../../../components/PDP/PDPProductImageGallery/PDPProductImageGallery";
import PDPProductTechnologyDetails from "../../../components/PDP/PDPProductTechnologyDetails/PDPProductTechnologyDetails";
// import Breadcrumb from "../../../components/PLP/Breadcrumb/Breadcrumb";
import {
  getProductsBasedOnKeyword,
  getChartInformation,
} from "../../../lib/methods";
import React, { Suspense } from "react";
import { getClient } from "../../../lib/apollo-client";
import { AUTO_SUGGEST_PRODUCT, PRODUCT_DETAILS } from "./queries";
import { notFound } from "next/navigation";
import Breadcrumb from "../../../components/Sitewide/Breadcrumb/Breadcrumb";
import ImageAndText from "../../../components/PDP/ImageAndText/ImageAndText";
import VideoAndTextBanner from "../../../components/Sitewide/VideoAndTextBanner";
// import PDPProductImageGallery from "../../../components/PDP/PDPProductImageGallery/PDPProductImageGallery";

export async function getContentStackSizeChartData() {
  return await getChartInformation();
}

export async function parseVariantsIntoObject(variants) {
  return variants.reduce(
    (acc, variant) => {
      if (variant.name === "size") {
        acc.productSizing.push(variant);
        if (variant.selected) {
          acc.selectedSize = variant.value;
        }
      }
      if (variant.name === "color") {
        acc.productColors.push(variant);
        if (variant.selected) {
          acc.selectedProductColor = variant.value;
        }
      }
      return acc;
    },
    {
      productSizing: [],
      productColors: [],
      selectedSize: "",
      selectedProductColor: "",
    }
  );
}

async function PDPClientPage({ parameters, searchParams, routePath }) {
  const {
    data: { productDetails },
  } = await getClient().query({
    query: PRODUCT_DETAILS,
    variables: {
      pid: parameters[parameters.length - 1],
    },
  });
  const {
    data: { autoSuggestProduct },
  } = await getClient().query({
    query: AUTO_SUGGEST_PRODUCT,
    variables: {
      suggestionParams: {
        productId: parameters[parameters.length - 1],
        limit: 1,
        start: 0,
        sort: "",
      },
    },
  });
  const currentIndex = parameters.indexOf("p");
  const beforeParams = parameters.slice(0, currentIndex);
  const productId = parameters[parameters.length - 1]?.toUpperCase();
  if (productDetails.status !== 200) {
    return notFound(404);
  }
  const productDetailsResponse = !productDetails.errorMsg ? productDetails.response : null;

  // const sizeChartData = await getContentStackSizeChartData();
  // const sizeChartRes = sizeChartData.response;
  const stockLevel = productDetailsResponse?.stock?.stockLevelStatus;
  const description = productDetailsResponse?.description;
  const variants = await parseVariantsIntoObject(
    !productDetails.errorMsg ? productDetails.response.variants : []
  );
  const selectedProductColor = variants?.productColors?.filter(
    (item) => item.selected === true
  )?.[0]?.value;

  const codes = productDetails?.response?.categories?.map(item => item.code);

  return (
    <section className="pdp-product-details">
      <div className="breadcrumb">
        <Breadcrumb
          list={
            !productDetails.errorMsg
              ? productDetails.response.breadcrumbs.list
              : []
          }
        />
      </div>
      <div className="product-config tm-width tm-height">
        <div className="config-left">
          <div className="productImages">
            <Suspense>
              {/* <PDPProductImageGallery images={!productDetails.errorMsg ? productDetails.response.images : []} /> */}
            </Suspense>
          </div>
          <div className="pdp-technology-details">
            <PDPProductTechnologyDetails
              Fit={"Fit"}
              product={productDetailsResponse}
              description={description}
              FabricCare={"Fabric & Care"}
              descriptionIcons={
                !productDetails.errorMsg
                  ? productDetails.response.descriptionIcons
                  : []
              }
              sizeAndFitDescription={
                !productDetails.errorMsg
                  ? productDetails.response.sizeAndFitDescription
                  : ""
              }
              fabricCareDescription={
                !productDetails.errorMsg
                  ? productDetails.response.fabricCareDescription
                  : ""
              }
              accordion={true}
            />
          </div>
        </div>
        <div className="config-right">
          <PDPProductConfigurationForm
            productId={!productDetails.errorMsg ? productDetails.response.productId : ""}
            title={!productDetails.errorMsg ? productDetails.response.title : ""}
            price={!productDetails.errorMsg ? productDetails.response.price : []}
            sizeVariant={variants.productSizing}
            colorVariant={variants.productColors}
            selectedSize={variants.selectedSize}
            selectedColor={variants.selectedProductColor}
            stockLevel={stockLevel}
            Size={"Size"}
            Color={"Color"}
            codes={codes}
          />
        </div>
      </div>
      <div>
        {!productDetails.errorMsg
          ? productDetails.response?.videoAndText?.map((el) => (
            <VideoAndTextBanner
              title={el.title}
              video_mobile={el}
              video_desktop={el}
              text_input={el?.description}
              desktopLayout={el?.desktopLayout}
              fallBackMediaUrl={el?.fallBackMediaUrl}
            />
          ))
          : null}
      </div>
      <div>
        {!productDetails.errorMsg ? (
          <ImageAndText imageAndText={productDetails.response?.imageAndText} />
        ) : null}
      </div>
    </section>
  );
}

export default PDPClientPage;
