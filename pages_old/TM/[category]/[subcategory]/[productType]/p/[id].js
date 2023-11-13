import productData from "/components/Sitewide/Header/products.json";
import PDPProductDetails from "/components/PDP/PDPProductDetails";
import PDPProductImages from "/components/PDP/PDPProductImages";
import { useRouter } from "next/router";

export default function PLPPage({
  product,
  productQuery,
  hybrisData,
  bloomreachData,
  webDam,
}) {
  const router = useRouter();
  const { category, subcategory, productType, id } = router.query;

  return (
    <>
      <div className="flex flex-col w-full md:w-2/3 gap-5 lg:flex-row plp-wrapper">
        <PDPProductImages
          thumbImage={bloomreachData?.response?.docs[0]?.thumb_image}
          images={hybrisData?.images}
          title={bloomreachData?.response?.docs[0]?.title}
        ></PDPProductImages>

        <div className="w-full lg:w-1/3 lg:pl-2.5 md:w-full">
          <PDPProductDetails
            productSizing={bloomreachData?.facet_counts?.facet_fields?.Sizes}
            title={bloomreachData?.response?.docs[0]?.title}
            price={bloomreachData?.response?.docs[0]?.price}
            description={bloomreachData?.response?.docs[0]?.description}
          ></PDPProductDetails>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = productData.response.docs;
  // console.log("products in static paths =================", products);
  const paths = products.map((product) => ({
    params: {
      id: product.url,
      category: "temp",
      subcategory: "temp",
      productType: "temp",
    },
  }));

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const product = params.id;
  const hybrisQuery = await fetch(
    `https://hydev2.travismathew.com/restv2/v2/b2c-us/products/${params.id}?fields=FULL`
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log('hybris data', data);
      return data;
    });

  const bloomReachQuery = fetch(
    `https://core.dxpapi.com/api/v1/core/api/v1/core/?account_id=${process.env.BLOOMREACH_ACCOUNT_ID}&auth_key=${process.env.BLOOMREACH_AUTH_KEY}&domain_key=${process.env.BLOOMREACH_DOMAIN_KEY}&url=${process.env.BLOOMREACH_URL}&request_type=search&search_type=keyword&q=${params.id}&rows=1&start=0&fl=pid,title,price,description,url,thumb_image,large_image,reviews,sale_price,swatch_image,fab_tech&fq&efq&sort`
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

  const resWebDam = fetch(
    `https://apiv2.webdamdb.com/oauth2/token?client_id=${process.env.WEBDAM_ID}&client_secret=${process.env.WEBDAM_SECRET}&username=${process.env.WEBDAM_USERNAME}&password=${process.env.WEBDAM_PASSWORD}&grant_type=${process.env.WEBDAM_GRANT_TYPE}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log('WEBDAM PRODUCT ===================================', params.id);
      return fetch(
        `https://apiv2.webdamdb.com/search?sortdir=asc&sortby=filename&&offset=0&query=${params.id}&types=image`,
        {
          method: "get",
          headers: new Headers({
            Authorization: "Bearer " + data.access_token,
            "Content-Type": "application/json",
          }),
        }
      )
        .then((dta) => dta.json())
        .then((dt) => {
          //console.log('WEBDAM DATA ===================================', dt.items);
          const images = dt.items.map((img) => {
            return img.hiResURLRaw;
          });
          //images = images.slice(0, 4);
          //console.log('images ===================================', images);
          return images;
        });
    });

  const webDam = await resWebDam;
  const bloomreachData = await bloomReachQuery;
  const hybrisData = await hybrisQuery;

  return { props: { product, bloomreachData, hybrisData }, revalidate: 10 };
}
