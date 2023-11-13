import FAQAccordion from "../../components/Sitewide/FAQAccordion";
import { props } from "../mock/faq-accordion";

export default {
  title: "Components/Sitewide/FAQ Accordion",
  component: FAQAccordion,
  tags: ["autodocs"],
  args: {},
};

const Template = (props) => {
  return <FAQAccordion {...props} />;
};
export const Default = Template.bind({});
Default.args = props;
