import React from "react";
import LandingPageComponentLoop from "@/components/Layouts/LandingPageComponentLoop";
import { getLandingPageEntry } from "@/lib/methods";
import { notFound } from "next/navigation";


async function LandingPage({ searchParams, params, pathname = '/' }) {
  const isPreviewMode = searchParams?.live_preview
  try {
    const result = await getLandingPageEntry({ isPreviewMode, pathname, searchParams })
    if (result.response && result.status === 200) {
      return <LandingPageComponentLoop pageEntry={result.response} />;
    }
    return null;
  } catch (ex) {
    return notFound(404);
  }
}

export default LandingPage;
