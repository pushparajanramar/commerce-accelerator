import FullWidthBanner from "../../components/Sitewide/FullWidthBanner";
import { props } from "../mock/full-width-banner";

export default {
  title: "Components/Sitewide/FullWidthBanner",
  component: FullWidthBanner,
  tags: ["autodocs"],
  argTypes: {
    button_variants: {
      control: "select",
      options: [
        "primary-black",
        "primary-white",
        "primary-outlined",
        "secondary-black",
        "secondary-white",
      ],
    },
    block_background_color: {
      control: "select",
      options: [
        "tm_neutral_900",
        "tm_neutral_800",
        "tm_neutral_700",
        "tm_neutral_600",
        "tm_neutral_500",
        "tm_neutral_400",
        "tm_neutral_300",
        "tm_neutral_200",
        "tm_neutral_100",
        "tm_neutral_0",
        "transparent",
      ],
    },
    variation: {
      control: "select",
      options: ["block-overlay", "block-floating", "block-full-height"],
    },
    position: {
      control: "select",
      options: ["left", "center", "right"],
    },
    text_color: {
      control: "select",
      options: ["black", "white"],
    },
    text_alignment: {
      control: "select",
      options: ["left", "center", "right"],
    },
    transparency: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 80,
      },
    },
    vertical_offset: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 25,
      },
    },
    horizontal_offset: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 13,
      },
    },
    floating_box_height: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 13,
      },
    },
  },
};

const Template = (props) => {
  return <FullWidthBanner {...props}></FullWidthBanner>;
};
export const Default = Template.bind({});
Default.args = props;
