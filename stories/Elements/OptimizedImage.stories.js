import OptimizedImage from "../../components/Elements/OptimizedImage/OptimizedImage";

export default {
  title: "Elements/OptimizedImage",
  component: OptimizedImage,
  tags: ["autodocs"],
  argTypes: {
    maxFetchedWidth: {
      control: { type: "number" },
    },
  },
};

export const ContenstackImage = {
  args: {
    alt: "Japanese mountain range with a pagota and city in the foreground",
    src: "https://images.contentstack.io/v3/assets/bltf4ea7b6ccae44232/blt7abe958c46734890/645bbe2d70b4af0d1f97cd1a/su-san-lee-E_eWwM29wfU-unsplash.jpg",
  },
};

export const NoAPIImage = {
  args: {
    alt: "A mountain and some fields",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
};
