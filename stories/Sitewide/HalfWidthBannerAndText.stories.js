import HalfWidthBannerAndText from "/components/Sitewide/HalfWidthBannerAndText";
import { props } from "../mock/half-width-banner";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/Half Width Banner And Text",
  component: HalfWidthBannerAndText,
  tags: ["autodocs"],
  argTypes: {
    button_type: {
      control: "select",
      options: [
        "primary-black",
        "primary-white",
        "primary-outlined",
        "secondary-black",
        "secondary-white",
      ],
    },
    alignment: {
      control: "select",
      options: ["left", "right"],
    },
  },
}

const Template = (props) => {
  return <HalfWidthBannerAndText {...props}></HalfWidthBannerAndText>;
};
export const Default = Template.bind({});
Default.args = props;