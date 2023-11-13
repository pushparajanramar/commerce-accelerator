import SubscriptionBanner from "../../components/Sitewide/SubscriptionBanner";
import { props } from "../mock/subscription-banner";

export default {
  title: "Components/Sitewide/SubscriptionBanner",
  component: SubscriptionBanner,
  tags: ["autodocs"],
  argTypes: {
    cta_style: {
      control: "select",
      options: [
        "primary-black",
        "primary-white",
        "primary-outlined",
        "secondary-black",
        "cta-black",
        "text-link",
      ],
    },
  },
};

const Template = (props) => {
  return <SubscriptionBanner {...props}></SubscriptionBanner>;
};
export const Default = Template.bind({});
Default.args = props;
