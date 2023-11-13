import { Button } from "/components/Elements/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Elements/Button",
  component: Button,
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimaryBlack = {
  args: {
    label: "Shop Now",
    type: "primary-black",
    url: "/",
  },
};

export const PrimaryWhite = {
  args: {
    label: "Shop Now",
    type: "primary-white",
    url: "/",
  },
};

export const PrimaryOutlined = {
  args: {
    label: "Shop Now",
    type: "primary-outlined",
    url: "/",
  },
};

export const SecondaryBlack = {
  args: {
    label: "Shop Now",
    type: "secondary-black",
    url: "/",
  },
};

export const SecondaryWhite = {
  args: {
    label: "Shop Now",
    type: "secondary-white",
    url: "/",
  },
};

export const CTABlack = {
  args: {
    label: "Shop Now",
    type: "cta-black",
    url: "/",
  },
};

export const CTAWhite = {
  args: {
    label: "Shop Now",
    type: "cta-white",
    url: "/",
  },
};

export const TextLink = {
  args: {
    label: "Shop Now",
    type: "text-link",
    url: "/",
  },
};
