import { pdpImageWithTextProps } from "../mock/pdp-image-and-text";
import ImageAndText from "../../components/PDP/ImageAndText/ImageAndText";

export default {
  title: "Components/PDP/ImageAndText",
  component: ImageAndText,
  tags: ["autodocs"],
  argTypes: {},
};

const Template = (props) => {
  return <ImageAndText {...props}></ImageAndText>;
};
export const Default = Template.bind({});
Default.args = pdpImageWithTextProps;