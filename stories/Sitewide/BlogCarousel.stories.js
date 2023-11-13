import { props } from "../mock/blog-carousel";
import BlogCarousel from "../../components/Sitewide/BlogCarousel";

export default {
  title: "Components/Sitewide/BlogCarousel",
  component: BlogCarousel,
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (props) => {
  return <BlogCarousel {...props}></BlogCarousel>;
};
export const Default = Template.bind({});
Default.args = props;
