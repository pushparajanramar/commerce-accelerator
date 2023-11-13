const { productInterface } = require("./PLPProducts.schema");
import { string, arrayOf, shape, number, bool, oneOfType } from "prop-types";
import breadCrumbSchema from '../breadcrumb/Breadcrumb.schema'

const PDPProductInterface = {
  ...productInterface,
  fabricType: string,
  fabricCareDescription: string,
  sizeAndFitDescription: string,
  descriptionIcons: arrayOf({ url: string, title: string }),
  breadcrumbs: breadCrumbSchema,
  videoAndText: arrayOf({ url: string, description: string, title: string, fallBackMediaUrl: string, isVideoMedia: bool }),
  imageAndText: arrayOf({ url: string, description: string, title: string, fallBackMediaUrl: string, isVideoMedia: bool }),
  isGloveProduct: string,
  isGiftProduct: string,
  handOptions: [string],
};
return PDPProductInterface;
