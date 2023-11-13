import { props } from "../mock/pdp-inventory-level-and-quantity";
import PDPInventoryLevelAndQuantity from "../../components/PDP/PDPProductConfigurationForm/PDPInventoryLevelAndQuantity";

export default {
    title: "Components/PDP/Inventory Level And Quantity",
    component: PDPInventoryLevelAndQuantity,
    tags: ["autodocs"],
    argTypes: {
        stockLevel: {
            control: "select",
            options: [
                "lowstock",
                "instock",
            ],
        },
    },
};

const Template = (props) => {
    return (
        <div className="pdp-product-details">
            <div className="product-config">
                <div className="config-right">
                    <div className="pdp-config-section">
                        <div className="w1">
                            <PDPInventoryLevelAndQuantity {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};
export const Default = Template.bind({});
Default.args = props;