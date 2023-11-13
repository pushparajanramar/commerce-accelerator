import ShortBanner from "../../components/Sitewide/ShortBanner";
import { props } from "../mock/short-banner";

export default {
  title: "Components/Sitewide/ShortBanner",
  component: ShortBanner,
  tags: ["autodocs"],
  argTypes: {
    cta_style: {
      control: "select",
      options: [
        "primary-black",
        "primary-white",
        "primary-outlined",
        "secondary-black",
        "secondary-white",
        "cta-black",
        "cta-white",
        "text-link",
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
      ],
    },

    text_color: {
      control: "select",
      options: ["black", "white"],
      default: "black",
    },
  },
};

const Template = (props) => {
  return <ShortBanner {...props}></ShortBanner>;
};
export const Default = Template.bind({});
Default.args = props;
