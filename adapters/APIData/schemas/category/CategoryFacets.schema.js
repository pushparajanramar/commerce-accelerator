import { string } from "prop-types"

const categoryInterface = {
    id: string,
    name: string,
    url: string
}

export default {
    response: Array(categoryInterface)
}