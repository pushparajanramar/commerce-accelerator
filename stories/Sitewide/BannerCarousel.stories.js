import { props } from "../mock/banner-carousel";
import BannerCarousel from "../../components/Sitewide/BannerCarousel";

export default {
  title: "Components/Sitewide/BannerCarousel",
  component: BannerCarousel,
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (props) => {
  return <BannerCarousel {...props}></BannerCarousel>;
};
export const Default = Template.bind({});
Default.args = props;
