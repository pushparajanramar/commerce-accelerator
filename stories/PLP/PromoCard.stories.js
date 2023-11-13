import { PromoCard } from "@/components/PLP/PromoCard";
import { props } from "../mock/promo-card";

export default {
  title: "Components/PLP/PromoCard",
  component: PromoCard,
  tags: ["autodocs"],
  argTypes: {
    promo_type: {
      control: "select",
      options: [2, 1],
      default: 2,
    },
  },
};

const Template = (props) => {
  return <PromoCard data={props} />;
};
export const Default = Template.bind({});
Default.args = props;
