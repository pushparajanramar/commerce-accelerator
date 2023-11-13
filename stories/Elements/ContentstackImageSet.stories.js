import ContentstackImageSet from "../../components/Elements/ContentstackImageSet/ContentstackImageSet";

export default {
  title: "Elements/ContentstackImageSet",
  component: ContentstackImageSet,
  tags: ["autodocs"],
  argTypes: {
    maxFetchedWidth: {
      control: { type: "number" },
    },
  },
};

export const ContenstackImageSet = {
  args: {
    imageMobile: {
      alt: "Japanese mountain range with a pagota and city in the foreground",
      src: "https://images.contentstack.io/v3/assets/bltf4ea7b6ccae44232/blt7abe958c46734890/645bbe2d70b4af0d1f97cd1a/su-san-lee-E_eWwM29wfU-unsplash.jpg",
    },
    imageTablet: {
      alt: "Seattle Space Needle",
      src: "https://images.contentstack.io/v3/assets/bltf4ea7b6ccae44232/blt955634c8906543c0/645e79df01974d6d88d67c79/thom-milkovic-skUTVJi8-jc-unsplash.jpg",
    },
    imageDesktop: {
      alt: "Some Mountains",
      src: "https://images.contentstack.io/v3/assets/bltf4ea7b6ccae44232/bltd9baaf2bac36cd36/645e7cda3929fd2b3140279c/neil-rosenstech-6xvUPyAuFiQ-unsplash.jpg",
    },
  },
};
