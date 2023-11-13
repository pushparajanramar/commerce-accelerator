"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../Sitewide/Footer/Footer";
import Header from "../../Sitewide/Header/Header";
import { useSearchParams } from "next/navigation";
import { onEntryChange } from "@/app/api/contentstack-sdk";
import { getGlobalEntry } from "../../../lib/methods";
import { setGlobalState } from "@/lib/factories";
import configuration from "../../../constants/configuration";
import { handleRetrieveCartDetail } from "@/lib/Common";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount } from "@/store/slices/cartSlice";
import { selectUserEmail } from "@/store/slices/authSlice";

const isGlobalContentEntry = (contentType) => {
  switch (contentType) {
    case "footer":
      return true;
    case "globals":
      return true;
    case "header":
      return true;
    default:
      return false;
  }
};

const HeaderAndFooter = ({
  footerData,
  labels,
  headerDataResponse,
  children,
}) => {
  const [footerState, setFooterState] = useState(footerData);
  const [headerState, setHeaderState] = useState(headerDataResponse);
  const [labelState, setLabelState] = useState(labels);
  const search = useSearchParams();
  const contentType = search.get("content_type_uid");
  const isPreviewMode = search.get("live_preview");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    onEntryChange(async () => {
      if (!isGlobalContentEntry(contentType)) return;
      const getGlobalDataResponse = await getGlobalEntry({ isPreviewMode });
      if (
        getGlobalDataResponse.status === 200 &&
        getGlobalDataResponse.response
      ) {
        const { labels, footerData, headerDataResponse } = setGlobalState(
          getGlobalDataResponse
        );
        setFooterState(() => footerData);
        setHeaderState(() => headerDataResponse);
        setLabelState(() => labels);
      }
    });
  }, []);

  const userEmail = useSelector(selectUserEmail);

  const callRetrieveCart = async (user) => {
    try {
      let res = await handleRetrieveCartDetail({ user });
      if (res?.status == 200) {
        dispatch(setCartCount(res?.response?.totalItems));
      }
    } catch {}
  };

  useEffect(() => {
    const user = userEmail ? userEmail : configuration.guestUserName;
    callRetrieveCart(user);
  }, [authState.isAuth]);

  return (
    <>
      <Header
        itemsInCart={0}
        labels={labelState}
        headerDataResponse={headerState}
      />
      {children}
      <Footer {...footerState} />
    </>
  );
};

export default HeaderAndFooter;
