import FilterNav from "../../components/PLP/Products/Filters/FilterNav";
import { props } from "../mock/plp-filter";

export default {
    title: "Components/PLP/Filter",
    component: FilterNav,
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
        <div className="py-8">
            <FilterNav {...props} />
        </div>
    )
};

export const Default = Template.bind({});
Default.args = props;