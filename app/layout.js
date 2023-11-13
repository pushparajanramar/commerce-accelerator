import "../styles/tm.scss";
import TagManager from "react-gtm-module";
import StoreProvider from "../components/Providers/StoreProvider";
import GigyaContextProvider from "../components/Providers/GigyaContextProvider";
import GigyaScript from "../components/Sitewide/CustomScript/GigyaScript";
import { getGlobalEntry } from "../lib/methods";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import OneTrustCookie from "../components/Sitewide/CustomScript/OneTrustCookie";
import HeaderAndFooter from "@/components/Layouts/HeaderAndFooter/HeaderAndFooter";
import { setGlobalState } from "@/lib/factories";

export default async function RootLayout({ children }) {
  const getGlobalDataResponse = await getGlobalEntry({ isPreviewMode: false });
  const { labels, footerData, headerDataResponse } = setGlobalState(
    getGlobalDataResponse
  );

  return (
    <html lang="en">
      <head>
        <GigyaScript />
        <OneTrustCookie />
      </head>
      <body>
        <StoreProvider>
          <GigyaContextProvider>
            <HeaderAndFooter
              footerData={footerData}
              labels={labels}
              headerDataResponse={headerDataResponse}
            >
              <ApolloWrapper>{children}</ApolloWrapper>
            </HeaderAndFooter>
          </GigyaContextProvider>
        </StoreProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
