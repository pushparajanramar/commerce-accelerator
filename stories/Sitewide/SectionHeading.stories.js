import SectionHeading from "../../components/Sitewide/SectionHeading";

export default {
  title: "Components/Sitewide/Section Heading",
  component: SectionHeading,
  tags: ["autodocs"],
  argTypes: {
    alignment: {
      control: "select",
      options: ["Left", "Centered"],
    },
  },
  args: {
    alignment: 1,
    heading: "<h1>Lorem Ipsum</h1>",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur. Enim consectetur odio egestas senectus enim. Eget nam et metus ipsum ut quis ac ut.</p>",
  },
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/6eS2lWFNlyu8xA6Pg0bU1r/TM-Design-Library?node-id=1694%3A37028&mode=dev",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/6eS2lWFNlyu8xA6Pg0bU1r/TM-Design-Library?node-id=1694%3A37028&mode=dev",
      },
    ],
  },
};

export const Default = (args) => <SectionHeading {...args} />;
