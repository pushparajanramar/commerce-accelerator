/** @type {import('next').NextConfig} */

const contentstackConfig = {
  CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
  CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH,
  CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
  CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
  CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST,
  CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST,
  CONTENTSTACK_LIVE_EDIT_TAGS: process.env.CONTENTSTACK_LIVE_EDIT_TAGS,
  NEXT_PUBLIC_CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
  SITE_URL: process.env.SITE_URL,
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
};

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    MANTA_API_KEY: "blt812469868df58c51",
    MANTA_DELIVERY_TOKEN: "cs6f67ab248f6d48f2ecee254e",
    API_KEY: "bltebcc7f215d2eb40e",
    DELIVERY_TOKEN: "csaf23ea68c03b4603008fa7ca",
    NEXTAUTH_URL: "https://localhost:3000",
    ...contentstackConfig,
    //Bloomreach
    BLOOMREACH_AUTH_KEY: process.env.BLOOMREACH_AUTH_KEY,
    BLOOMREACH_DOMAIN_KEY: "travismathew_eu",
    BLOOMREACH_ACCOUNT_ID: process.env.BLOOMREACH_ACCOUNT_ID,
    BLOOMREACH_URL: "https://www.travismathew.com",
    BLOOMREACH_AUTOSUGGEST_URL: "https://staging-suggest.dxpapi.com/api/v1",
    BLOOMREACH_API_URL: "https://staging-core.dxpapi.com/api/v1",
    BLOOMREACH_SIMILAR_ITEMS_API_URL:
      "https://pathways-staging.dxpapi.com/api/v2",
    BLOOMREACH_RELATED_ALL_API_URL: "https://bsapi-test.brsrvr.com/v3",
    BLOOMREACH_SUGGEST_REQUEST_ID: "5676056489854",
    // BLOOMREACH_CORE_REQUEST_ID: "4386976339262",
    BLOOMREACH_CORE_REQUEST_ID: "3709708226676",
    // BLOOMREACH_CORE_SUGGEST_BR_UID_2:
    //   "uid%3D5649299605254%3Av%3D15.0%3Ats%3D1690819509122%3Ahc%3D22",
    BLOOMREACH_CORE_SUGGEST_BR_UID_2:
      "uid%3D5649299605254%3Av%3D15.0%3Ats%3D1690819509122%3Ahc%3D24",
    BLOOMREACH_PATHWAYS_BR_UID_2:
      "uid%3D4537826017844%3Av%3D15.0%3Ats%3D1690901592022%3Ahc%3D1",
    BLOOMREACH_RELATED_API_HOST: "bsapi-test.brsrvr.com",
    //Hybris
    HYBRIS_API_URL: "https://hydev3.travismathew.com",
    HYBRIS_CLIENT_ID: "trusted_client",
    HYBRIS_CLIENT_SECRET: "secret",
    HYBRIS_BASE_SITE_IDENTIFIER: "b2c-us",
    //Data layer
    ENABLE_BLOOMREACH: "true",
    ENABLE_OCC_API: "true",
    ENABLE_MOCK: "false",
    NEXT_PUBLIC_APP_ENABLE_MOCK: "false",

    // ENABLE_BLOOMREACH: 'false',
    // ENABLE_OCC_API: 'false',
    // ENABLE_MOCK: 'true',
    // NEXT_PUBLIC_APP_ENABLE_MOCK: 'true'
    NEXT_PUBLIC_APP_TRAVISMATHEW_URL: "https://www.travismathew.com",
    NEXT_PUBLIC_APP_GIGYA_API: "4_esRQfGrGIXwo_gV-fHLH2Q",
    COOKIE_CONSENT_URL:
      "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
    COOKIE_CONSENT_DATA_DOMAIN_SCRIPT:
      "7dd896ff-23c5-425e-abfe-55ee6af3734c-test",
    COOKIE_CONSENT_VICEACCOUNTID: "callawaygolf",
    COOKIE_CONSENT_VICESITEID: "5e603aea-6b9d-42a9-ac2d-a9af5e1c6602-test",
  },
  images: {
    formats: ["image/webp", "image/avif"],
    domains: ["images.contentstack.io"],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travismathew.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.contentstack.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn2.webdamdb.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "hypp.travismathew.com",
      },
      {
        protocol: "https",
        hostname: "hyqa.travismathew.com",
      },
      {
        protocol: "https",
        hostname: "hydev3.travismathew.com",
      },
      {
        protocol: "https",
        hostname: "www.travismathew.com",
      },
      {
        protocol: "https",
        hostname: "hyqa2.travismathew.com",
      },
      {
        protocol: "https",
        hostname: "hyqa.travismathew.co.uk",
      },
    ],
  },
  i18n: {
    // These are all the locales we want to support in the application
    //locales: ['en-US', 'fr-CA', 'en-CA' ],
    locales: ["en-US", "fr-CA"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      {
        domain: "travismathew.vercel.app",
        defaultLocale: "en-US",
      },
      {
        domain: "travismathew-ca.vercel.app",
        defaultLocale: "fr-CA",
        http: true,
      },
    ],
  },
  publicRuntimeConfig: contentstackConfig,
  async rewrites() {
    return [
      {
        source: "/cart",
        destination: "https://hydev3.travismathew.com/cart",
      },
      {
        source: "/_ui/:slug*",
        destination: "https://hydev3.travismathew.com/_ui/:slug*",
      },
      {
        source: "/wro/:slug*",
        destination: "https://hydev3.travismathew.com/wro/:slug*",
      },
      {
        source: "/medias/:slug*",
        destination: "https://hydev3.travismathew.com/medias/:slug*",
      },
    ];
  },
};
module.exports = nextConfig;
