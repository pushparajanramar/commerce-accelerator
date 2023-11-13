import SizeCharts from "../../components/PDP/PDPSizeCharts/SizeCharts";
import { props, codes } from "../mock/size-charts.js";

export default {
  title: "Components/PDP/PDPSizeCharts",
  component: SizeCharts,
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
    <>
      <div className="pdp-size-chart-storybook">
        <SizeCharts data={props} categoryId={codes} />
      </div>
      <div id="modal-root"></div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = props;
