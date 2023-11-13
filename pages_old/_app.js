import "../styles/tm.scss";

import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider, createStore } from "react-redux";
import { wrapper } from "../store/store";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TagManager from "react-gtm-module";
import {
  selectToken,
  selectAuthUser,
  setAuthState,
  setAuthUser,
  setToken,
  selectAuthState,
} from "../store/slices/authSlice";
import { lang } from "../store/slices/langSlice";
import { setLocale } from "../store/slices/langSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import withViewportDetection from "../lib/withViewportDetection";

import ContentstackLivePreview from "@contentstack/live-preview-utils";
import Header from "/components/Sitewide/Header/Header";
import Footer from "/components/Sitewide/Footer/Footer";

const AppWrapper = ({ Component, pageProps: { ...pageProps } }) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-NP6Z5525" });
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider>
        <App Component={Component} pageProps={pageProps} />
      </SessionProvider>
    </Provider>
  );
};

function App({ Component, pageProps: { ...pageProps } }) {
  const [cartIndicator, setCartIndicator] = useState(0);
  const dispatch = useDispatch();
  const { data: session, status: status } = useSession();

  const router = useRouter();
  const { locale } = router;

  //Retrieve CDC auth state from next-auth and pass to Redux store
  useEffect(() => {
    session
      ? dispatch(setToken(session?.session?.access_token?.access_token))
      : null;
    session ? dispatch(setAuthUser(session?.session?.user)) : null;
    status === "authenticated"
      ? dispatch(setAuthState(true))
      : dispatch(setAuthState(false));
  }, []);

  // const locale = useSelector((state) => state);
  // console.log('locale', locale);

  //const dispatch = useDispatch();

  useEffect(() => {
    console.log("current locale: ", locale);
    dispatch(setLocale(locale));
  }, []);

  // useEffect(() => {
  //     ContentstackLivePreview.init({enable: true,ssr: true, debug: true, stackDetails: {
  //       apiKey: process.env.CONTENTSTACK_API_KEY
  //     }});
  // }, [])

  return (
    <>
      <Header itemsInCart={cartIndicator}></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  );
}

export default AppWrapper;
