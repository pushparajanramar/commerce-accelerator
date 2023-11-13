import Breadcrumb from "../../components/Sitewide/Breadcrumb/Breadcrumb";
import props from '../mock/breadcrumb'


export default {
    title: "Components/PLP/Breadcrumb",
    component: Breadcrumb,
    tags: ["autodocs"],
    parameters: {
        design: [
            {
                type: "figma",
                name: "Mobile",
                url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=321-37864&mode=design&t=i7oBrq5CpcgQEGZr-0",
            },
            {
                type: "figma",
                name: "Desktop",
                url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=321-39183&mode=design&t=i7oBrq5CpcgQEGZr-0",
            },
        ],
    },
};

const Template = (props) => {
    return (
        <section>
            <Breadcrumb {...props} />
            <h1 className="category">{props.pagetitle}</h1>
        </section>
    )
};

export const Default = Template.bind({});
Default.args = props;

