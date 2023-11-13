import { props } from "../mock/header";
import Header from "../../components/Sitewide/Header/Header";

export default {
  title: "Components/Sitewide/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
};
const Template = (props) => {
  return <Header {...props} />;
};
export const Default = Template.bind({});
Default.args = props;
