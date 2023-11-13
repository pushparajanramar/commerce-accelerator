import PortraitCard from "../Sitewide/PortraitCard";
import FullWidthBanner from "../Sitewide/FullWidthBanner";
import SubscriptionBanner from "../Sitewide/SubscriptionBanner";
import RelatedAll from "../PLP/Related/RelatedAll";

const PLPComponentLoop = ({ componentData }) => {
  const sections = componentData ? componentData.modular_blocks : [];

  return (
    <>
      {sections?.length > 0 &&
        sections.map((el, i) => {
          if (el?.portrait_card) {
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
          } else if (el?.related_products && !el?.related_products?.hide) {
            return <RelatedAll key={"RelatedAll" + i} />;
          }
        })}
    </>
  );
};

export default PLPComponentLoop;
