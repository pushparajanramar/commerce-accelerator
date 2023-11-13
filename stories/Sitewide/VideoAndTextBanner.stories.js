import { props } from "../mock/video-and-text-banner";
import VideoAndTextBanner from "../../components/Sitewide/VideoAndTextBanner";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/VideoAndTextBanner",
  component: VideoAndTextBanner,
  tags: ["autodocs"],
  argTypes: {
    button_variants: {
      control: "select",
      options: [
        "primary-black",
        "primary-white",
        "primary-outlined",
        "secondary-black",
        "secondary-white",
      ],
    },
    desktop_position: {
      control: "select",
      options: ["left", "right"],
    },
  },
  args: {
    button: { title: "Shop Now", href: "/" },
    button_variants: "primary-black",
    desktop_position: "right",
    video_mobile: {
      url: "https://assets.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt7f443dd5367a39ab/64df4cbd5ec7a9a05d92e271/video.mp4?branch=develop",
    },
    video_desktop: {
      url: "https://assets.contentstack.io/v3/assets/blt5e74b011b6ec65cd/blt735ec6eb33b61780/64ece7f41cee1771a0db58d2/16-9-vid.mov?branch=develop",
    },
    text_input:
      "<h2>Lorem ipsum dolor sit amet consectetur dui sapien leo</h2>",
  },
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/6eS2lWFNlyu8xA6Pg0bU1r/TM-Design-Library?node-id=2155%3A46713&mode=dev",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/6eS2lWFNlyu8xA6Pg0bU1r/TM-Design-Library?node-id=2155%3A46711&mode=dev",
      },
    ],
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (props) => {
  return <VideoAndTextBanner {...props}></VideoAndTextBanner>;
};
export const Default = Template.bind({});
Default.args = props;
