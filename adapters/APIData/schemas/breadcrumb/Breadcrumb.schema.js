import { string, arrayOf, bool } from "prop-types"

export default {
    list: arrayOf({
        url: string,
        title: string,
        code: string,
        isActive: bool
    }),
    pageTitle: string
}