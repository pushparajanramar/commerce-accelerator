import { useState } from "react";
import contentstack from "contentstack";
import Header from "/components/POC/CallawayHeader";
import TwoPanelContainer from "/components/POC/TwoPanelContainer";

export default function HomePage({ posts, panel }) {
  return (
    <div className="container">
      <Header
        title="ContentStack React/Next POC"
        bannerText={posts.promo_bar}
      />
      <TwoPanelContainer panelContent={panel} />
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
    environment: "preview",
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

  const posts = await res;
  const panel = await panelRes;

  // If the request was successful, return the posts
  // and revalidate every 10 seconds.
  return {
    props: {
      posts,
      panel,
    },
    revalidate: 10,
  };
}
