import RelatedAll from "../../components/PLP/Related/RelatedAll";
import RelatedCategories from "../../components/PLP/Related/RelatedCategories";
import RelatedItems from "../../components/PLP/Related/RelatedItems";
import RelatedProducts from "../../components/PLP/Related/RelatedProducts";
import { props } from "../mock/relatedall";

export default {
  title: "Components/PLP/RelatedAll",
  component: RelatedAll,
  tags: ["autodocs"],
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=321-37945&mode=design&t=zOeI3ISgXLDuovOh-0",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=321-39943&mode=design&t=zOeI3ISgXLDuovOh-0",
      },
    ],
  },
};

const Template = (props) => {
  return (
    <div className="tm-width">
      <section className="tm-height">
        {props.relatedItems && props.relatedItems.length > 0 && (
          <RelatedItems relatedItems={props.relatedItems} />
        )}
        {props.relatedCategories && props.relatedCategories.length > 0 && (
          <RelatedCategories relatedCategories={props.relatedCategories} />
        )}
        {props.relatedProducts && props.relatedProducts.length > 0 && (
          <RelatedProducts relatedProducts={props.relatedProducts} />
        )}
      </section>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = props;
