import { string, arrayOf, shape, number, bool, oneOfType } from "prop-types"

export const relatedItem = {
    title: string,
    url: string,
}
export const relatedCategory = {
    title: string,
    url: string,
}
export const relatedProduct = {
    title: string,
    url: string,
    description: string,
    shortDescription: string,
    media: {
        altText: string,
        isVideoMedia: bool,
        url: string
    }
}

export default {
    relatedItems: [relatedItem],
    relatedCategories: [relatedCategory],
    relatedProducts: [relatedProduct],
}