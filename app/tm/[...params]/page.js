import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import PLPClientPage from "./PLPClientPage";
import PDPClientPage from "./PDPClientPage";

export function getRouteDetail() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const fullUrl = headersList.get("referer") || "";
  return { fullUrl, pathname };
}

async function page({ params: { params: parameters }, searchParams }) {
  const { fullUrl, pathname } = getRouteDetail();
  //checking page type
  const categoryPage = parameters.includes("c");
  const productPage = parameters.includes("p");
  /**
   *  <RelatedAll /> component causes a call to [...params]/page.js
   *  when it renders. Logs on the console don't show issues only on terminal
   *  console.log(parameters) shows an undefined after 'c' / 'p' and before 'related'
   * */
  const noCategoryId = parameters.includes("undefined");
  if (categoryPage && !noCategoryId) {
    ///For Category Page
    return (
      <PLPClientPage
        parameters={parameters}
        searchParams={searchParams}
        routePath={fullUrl}
        pathname={pathname}
      />
    );
  } else if (productPage && !noCategoryId) {
    ///For Product Page
    return (
      <PDPClientPage
        parameters={parameters}
        searchParams={searchParams}
        routePath={fullUrl}
        pathname={pathname}
      />
    );
  } else {
    return notFound(404);
  }
}

export default page;
