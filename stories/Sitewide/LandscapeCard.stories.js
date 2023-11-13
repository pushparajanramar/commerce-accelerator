import { props } from "../mock/landscape-card";
import LandscapeCard from "../../components/Sitewide/LandscapeCard";

export default {
  title: "Components/Sitewide/LandscapeCard",
  component: LandscapeCard,
  tags: ["autodocs"],
  argTypes: {
    wraps: { type: "boolean", default: false },
    columns: {
      control: "select",
      options: [2, 3, 4],
    },
    image_heights: { type: "string", default: "" },
  },
};

const Template = (props) => {
  return <LandscapeCard {...props}></LandscapeCard>;
};
export const Default = Template.bind({});
Default.args = props;
