import ProductItem from "../../components/PLP/Products/ProductItem";
import productData from "../mock/plp-card";

const props = {
  product: productData,
};

export default {
  title: "Components/PLP/Product Card",
  component: ProductItem,
  tags: ["autodocs"],
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=321-37864&mode=design&t=zOeI3ISgXLDuovOh-0",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=321-39183&mode=design&t=zOeI3ISgXLDuovOh-0",
      },
    ],
  },
};

const Template = (props) => {
  const product = props;
  const colorVariants = product?.variants?.filter(
    (item) => item.name === "color"
  );
  const sizeVariants = product?.variants?.filter(
    (item) => item.name === "size"
  );

  const productData = {
    ...product,
    url: product.url,
    colorVariants,
    defaultSizes: sizeVariants,
  };

  return (
    <div className="product-grid tm-width tm-height">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 lg:gap-8 ">
        <ProductItem product={productData} isStoryBook={true} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = props.product;
