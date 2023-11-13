import Breadcrumb from "../../components/Sitewide/Breadcrumb/Breadcrumb";
import { list } from "../mock/pdp-breadcrumb";
export default {
  title: "Components/Sitewide/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    list: list,
  },
};
export const Default = (args) => <Breadcrumb {...args} />;
