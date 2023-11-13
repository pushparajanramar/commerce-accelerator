import { string } from "prop-types"

const suggestionInterFace = {
    keyword: string,
}
const priceInterFace = {
    currencyIso: string,
    formattedValue: string,
    priceType: string,
    value: string,
}

const productInterFace = {
    title: string,
    productId: string,
    url: string,
    thumbImage: string,
    price: [priceInterFace]
}

export default {
    query: string,
    suggestions: [suggestionInterFace],
    products: [productInterFace],
}