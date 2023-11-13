import { props } from "../mock/product-carousel";
import ProductCarousel from "../../components/Sitewide/ProductCarousel";

export default {
    title: "Components/Sitewide/ProductCarousel",
    component: ProductCarousel,
    tags: ["autodocs"],
    argTypes: {},
};
const Template = (props) => {
    return <ProductCarousel {...props} />;
};
export const Default = Template.bind({});
Default.args = props;