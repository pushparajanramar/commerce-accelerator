import { string, arrayOf, shape, number, bool, oneOfType } from "prop-types"

const stockInterface = {
    stockLevelStatus: string
}
const VariantPrototype = {
    name: string,
    code: string,
    stock: stockInterface,
    url: string,
    value: string,
    selected: bool
}

export const imagesInterface = {
    altText: string,
    isVideoMedia: bool,
    url: string
}

const sizeVariantInterface = VariantPrototype
const colorVariantInterface = {
    ...VariantPrototype,
    media: imagesInterface
}
export const variantType = oneOfType[sizeVariantInterface, colorVariantInterface]


export const priceInterface = {
    currencyIso: string,
    formattedValue: string,
    priceType: string,
    value: string,
}

export const productInterface = {
    productId: string,
    baseProduct: string,
    title: string,
    description: string,
    url: string,
    brand: string,
    badge: string,
    price: [priceInterface],
    stock: stockInterface,
    images: [imagesInterface],
    promotionText: string,
    variants: variantType,
    isGloveProduct: bool,
    isGiftProduct: bool,
    handOptions: [string]
}

const facetsInterface = {
    [string]: arrayOf(shape({
        name: string,
        count: number,
        url: string
    }))
}

export default {
    total: number,
    start: number,
    docs: [productInterface],
    facets: [facetsInterface]
}