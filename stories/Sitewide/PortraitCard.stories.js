import PortraitCard from "../../components/Sitewide/PortraitCard";
import { props } from "../mock/portrait-card";

export default {
  title: "Components/Sitewide/PortaitCard",
  component: PortraitCard,
  tags: ["autodocs"],
  argTypes: {
    card_count_per_row: {
      control: "select",
      options: [3, 4, 5],
    },
    background_color: {
      control: "select",
      options: ["white", "black_100"],
    },
    card_body_font_size: {
      control: "select",
      options: ["small", "medium"],
    },
  },
};

const Template = (props) => {
  return <PortraitCard {...props}></PortraitCard>;
};

export const Default = Template.bind({});
Default.args = props;
