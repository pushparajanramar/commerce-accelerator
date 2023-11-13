"use client";
import Script from "next/script";
import React from "react";
import { useSearchParams } from "next/navigation";

function OneTrustCookie() {
  const cookieConsentSrc = process.env.COOKIE_CONSENT_URL;
  const cookieDataDomainScript = process.env.COOKIE_CONSENT_DATA_DOMAIN_SCRIPT;
  const cookieViceAccountId = process.env.COOKIE_CONSENT_VICEACCOUNTID;
  const cookieViceSiteId = process.env.COOKIE_CONSENT_VICESITEID;
  const searchParams = useSearchParams();
  const isLivePreview = searchParams.get("live_preview");

  return !!isLivePreview ? null : (
    <>
      <Script
        src={cookieConsentSrc}
        strategy="lazyOnload"
        data-domain-script={cookieDataDomainScript}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          vice= {
            config: {
              viceAccountId:'${cookieViceAccountId}',
              viceSiteId: '${cookieViceSiteId}',
              viceZoneId: '',
              viceSectionId: ''
            }
          };
        `,
        }}
      />
      <Script
        src="//vice-prod.sdiapi.com/vice_loader/callawaygolf/travismatheweu"
        strategy="lazyOnload"
      />
    </>
  );
}

export default OneTrustCookie;
