import SectionHeading from "../Sitewide/SectionHeading";
import LandscapeCard from "../Sitewide/LandscapeCard";
import PortraitCard from "../Sitewide/PortraitCard";
import FullWidthBanner from "../Sitewide/FullWidthBanner";
import VideoAndTextBanner from "../Sitewide/VideoAndTextBanner";
import HalfWidthBannerAndText from "../Sitewide/HalfWidthBannerAndText";
import FAQAccordion from "../Sitewide/FAQAccordion";
import BlogCarousel from "../Sitewide/BlogCarousel";
import SubscriptionBanner from "../Sitewide/SubscriptionBanner";
import ShortBanner from "../Sitewide/ShortBanner";
import BannerCarousel from "../Sitewide/BannerCarousel";
import ProductCarousel from "../Sitewide/ProductCarousel";

const LandingPageComponentLoop = ({ pageEntry }) => {
  const sections = pageEntry ? pageEntry.modular_blocks : [];

  return (
    <>
      {sections?.length > 0 &&
        sections.map((el, i) => {
          if (el?.section_heading) {
            return (
              <SectionHeading
                key={"SectionHeading" + i}
                heading={el?.section_heading.heading}
                content={el?.section_heading.content}
                alignment={el?.section_heading.alignment}
              />
            );
          } else if (el?.landscape_card) {
            return (
              <LandscapeCard
                key={"LandscapeCard" + i}
                card={el?.landscape_card?.card}
                wraps={el?.landscape_card?.wraps}
                columns={el?.landscape_card?.columns}
                image_heights={el?.landscape_card?.image_heights}
              />
            );
          } else if (el?.portrait_card) {
            return (
              <PortraitCard
                key={"PortraitCard" + i}
                cardDetails={el?.portrait_card}
                cards={el?.portrait_card?.cards}
                wrap_cards={el?.portrait_card?.wrap_cards}
                card_count_per_row={el?.portrait_card?.card_count_per_row}
                image_heights={el?.portrait_card?.image_heights}
                card_box_shadow={el?.portrait_card?.card_box_shadow}
                background_color={el?.portrait_card?.background_color}
                card_body_font_size={el?.portrait_card?.card_body_font_size}
              />
            );
          } else if (el?.video_and_text_banner) {
            return (
              <VideoAndTextBanner
                key={"VideoAndTextBanner" + i}
                button={el?.video_and_text_banner?.button}
                button_variants={el?.video_and_text_banner?.button_variants}
                desktop_position={el?.video_and_text_banner?.desktop_position}
                video_poster_desktop={
                  el?.video_and_text_banner?.video_poster_desktop
                }
                video_desktop={el?.video_and_text_banner?.video_desktop}
                video_poster_mobile={
                  el?.video_and_text_banner?.video_poster_mobile
                }
                video_mobile={el?.video_and_text_banner?.video_mobile}
                text_input={el?.video_and_text_banner?.text_input}
              />
            );
          } else if (el?.half_width_banner) {
            const desktopImageUrl = el?.half_width_banner?.desktop_image ? el?.half_width_banner?.desktop_image.url : null
            const tabletImageUrl = el?.half_width_banner?.tablet_image ? el?.half_width_banner?.tablet_image.url : null
            const mobileImageUrl = el?.half_width_banner?.mobile_image ? el?.half_width_banner?.mobile_image.url : null
            return (
              <HalfWidthBannerAndText
                key={"HalfWidthBannerAndText" + i}
                headline={el?.half_width_banner?.headline}
                alignment={el?.half_width_banner?.alignment}
                desktop_image={desktopImageUrl}
                tablet_image={tabletImageUrl}
                mobile_image={mobileImageUrl}
                component_height={el?.half_width_banner?.component_height}
                banner_detail={el?.half_width_banner?.banner_detail}
                button_type={el?.half_width_banner?.button_type}
                button={el?.half_width_banner?.button}
              />
            );
          } else if (el?.accordion) {
            return (
              <FAQAccordion
                key={"FAQAccordion" + i}
                accordionTitle={el?.accordion.title}
                accordionData={el?.accordion.accordion}
              />
            );
          } else if (el?.blog_carousel) {
            return (
              <BlogCarousel
                key={"BlogCarousel" + i}
                wrap={el?.blog_carousel?.wrap}
                image_heights={el?.blog_carousel?.image_heights}
                card_box_shadow={el?.blog_carousel?.card_box_shadow}
                blog_carousel_cards={el?.blog_carousel?.blog_carousel_cards}
              />
            );
          } else if (el?.full_width_banner) {
            return (
              <FullWidthBanner
                key={"FullWidthBanner" + i}
                variation={el?.full_width_banner?.variation}
                position={el?.full_width_banner?.position}
                text_color={el?.full_width_banner?.text_color}
                vertical_offset={el?.full_width_banner?.padding_top}
                horizontal_offset={el?.full_width_banner?.padding_left}
                floating_box_height={el?.full_width_banner?.floating_box_height}
                transparency={el?.full_width_banner.transparency}
                heading={el?.full_width_banner?.heading}
                paragraph={el?.full_width_banner?.inner_text}
                text_alignment={el?.full_width_banner?.text_alignment}
                banner_tablet_image={el?.full_width_banner?.banner_tablet_image}
                banner_desktop_image={
                  el?.full_width_banner?.banner_desktop_image
                }
                banner_smartphone_image={
                  el?.full_width_banner?.banner_smartphone_image
                }
                button={el?.full_width_banner?.button}
                block_background_color={
                  el?.full_width_banner?.block_background_color
                }
                button_variants={el?.full_width_banner?.button_variants}
              />
            );
          } else if (el?.subscription_banner) {
            return (
              <SubscriptionBanner
                key={"SubscriptionBanner" + i}
                heading={el?.subscription_banner?.heading}
                main_content={el?.subscription_banner?.main_content}
                email_field_label={el?.subscription_banner?.email_field_label}
                button={el?.subscription_banner?.button}
                disclaimer={el?.subscription_banner?.disclaimer}
                submission_success_message={
                  el?.subscription_banner?.submission_success_message
                }
                submission_failure_message={
                  el?.subscription_banner?.submission_failure_message
                }
              />
            );
          } else if (el?.short_banner) {
            return (
              <ShortBanner
                key={"ShortBanner" + i}
                min_height={el?.short_banner?.min_height}
                block_background_color={
                  el?.short_banner?.block_background_color
                }
                promo_icon={el?.short_banner?.promo_icon}
                text_color={el?.short_banner?.text_color}
                banner_title={el?.short_banner?.banner_title}
                banner_description={el?.short_banner?.banner_description}
                cta={el?.short_banner?.cta}
                cta_style={el?.short_banner?.cta_style}
                alt_tag={el?.short_banner?.alt_tag}
              />
            );
          } else if (el?.banner_carousel) {
            return (
              <BannerCarousel
                key={"BannerCarousel" + i}
                slide={el?.banner_carousel?.slide}
              />
            );
          } else if (el?.product_carousel) {
            return (
              <ProductCarousel
                key={"ProductCarousel" + i}
                heading={el?.product_carousel.heading}
                description={el?.product_carousel.description}
                cta={el?.product_carousel.cta}
                productCards={el?.product_carousel.product_picker_sample}
                defaultProducts={el?.product_carousel.default_products || []}
              />
            );
          }
        })}
    </>
  );
};

export default LandingPageComponentLoop;
