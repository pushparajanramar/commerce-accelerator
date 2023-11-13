import PDPProductTechnologyDetails from "../../components/PDP/PDPProductTechnologyDetails/PDPProductTechnologyDetails";
import { product } from "../mock/pdp-product-technology-details";

export default {
  title: "Components/PDP/PDPProductTechnologyDetails",
  component: PDPProductTechnologyDetails,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    description: product.description,
    descriptionIcons: product?.descriptionIcons,
    Fit: "Fit",
    sizeAndFitDescription: product?.sizeAndFitDescription,
    FabricCare: "Fabric & Care",
    fabricCareDescription: product?.fabricCareDescription,
  },
};
export const Default = (args) => <PDPProductTechnologyDetails {...args} />;
