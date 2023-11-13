import fetchTags from "../../../../constants/fetchTags";
import configuration from '../../../../constants/configuration'
import { makeAutoSuggestResponse, makePLPProductResponse, makeProductCarouselResponse, makeRelatedAllResponse } from "./SchemaMapper";


export default class BloomReach {
    constructor() {
        this.config = this.getConfig()
    }

    getConfig() {
        return {
            autoSuggestApi: process.env.BLOOMREACH_AUTOSUGGEST_URL,
            similarItemsAPi: process.env.BLOOMREACH_SIMILAR_ITEMS_API_URL,
            relatedAllAPi: process.env.BLOOMREACH_RELATED_ALL_API_URL,
            apiEndpoint: process.env.BLOOMREACH_API_URL,
            authKey: process.env.BLOOMREACH_AUTH_KEY,
            accountId: process.env.BLOOMREACH_ACCOUNT_ID,
            domainkey: process.env.BLOOMREACH_DOMAIN_KEY,
        }
    }


    fetchAutoSuggest = async ({ query }) => {
        try {
            const res = await fetch(
                `${this.config.autoSuggestApi}/suggest/?account_id=${this.config.accountId}&auth_key=${this.config.authKey}&domain_key=${this.config.domainkey}&q=${query}&request_id=5676056489854&_br_uid_2=uid%3D5649299605254%3Av%3D15.0%3Ats%3D1690819509122%3Ahc%3D22&url=/search/autocomplete/TMSearchBoxComponent&request_type=suggest&rows=6&start=0`,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    method: 'GET',
                    next: { revalidate: configuration.autoSuggestProductCacheTime, tags: [fetchTags.getAutoSuggestResult] },
                }
            ).then(res => res.json());
            const _response = await makeAutoSuggestResponse(res)
            return {
                status: 200,
                response: _response
            }
        } catch (ex) {
            // console.log(ex)
            return {
                status: 400,
                response: ex.message || 'Error in fetching'
            }
        }

    }


    fetchAutoSuggestProduct = async ({ query, limit, start, filter, sort = null }) => {
        try {
            let url = `${this.config.apiEndpoint}/core/?account_id=${this.config.accountId}&auth_key=${this.config.authKey}&domain_key=${this.config.domainkey}&search_type=keyword&q=${query}&request_id=4386976339262&_br_uid_2=uid%3D5649299605254%3Av%3D15.0%3Ats%3D1690819509122%3Ahc%3D34&url=/search/page/&fl=pid,title,brand,price,product_label,sale_price,employee_price,promotion_attr,large_image,sku_color_group,url,description,other_styles,badge,product_images&request_type=search&rows=${limit}&start=${start}`
            if (filter && filter !== null) {
                url += '&' + filter
            }
            if (sort && sort !== null) {
                url += '&sort=' + sort
            }

            const res = await fetch(url,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    method: 'GET',
                    next: { revalidate: configuration.autoSuggestProductCacheTime, tags: [fetchTags.getProductsBasedOnKeyword] },
                }
            ).then(res => res.json());
            const _response = await makePLPProductResponse(res)
            return {
                status: 200,
                response: _response
            }
        } catch (ex) {
            // console.log(ex)
            return {
                status: 400,
                response: ex.message || 'Error in fetching'
            }
        }

    }


    fetchCategoryBasedProduct = async ({ categoryid, limit, start, filter, sort = null }) => {
        try {
            let url = `${this.config.apiEndpoint}/core/?account_id=${this.config.accountId}&auth_key=${this.config.authKey}&domain_key=${this.config.domainkey}&search_type=category&q=${categoryid}&request_id=4386976339262&&url=/c/${categoryid}&_br_uid_2=uid%3D5649299605254%3Av%3D15.0%3Ats%3D1690819509122%3Ahc%3D34&fl=pid,title,brand,price,product_label,sale_price,employee_price,promotion_attr,large_image,sku_color_group,url,description,other_styles,badge,product_images&request_type=search&rows=${limit}&start=${start}`

            if (filter && filter !== null) {
                url += '&' + filter
            }
            if (sort && sort !== null) {
                url += '&sort=' + sort
            }

            const res = await fetch(url,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    method: 'GET',
                    next: { revalidate: configuration.PLPProductCacheTime, tags: [fetchTags.getProductsBasedOnCategoryId] },
                }
            ).then(res => res.json());
            const _response = await makePLPProductResponse(res)
            return {
                status: res.status_code ? res.status_code : 200,
                response: _response
            }
        } catch (ex) {
            // console.log(ex)
            return {
                status: 400,
                response: ex.message || 'Error in fetching'
            }
        }

    }

    fetchSimilarItems = async ({ items, limit, start }) => {
        try {
            let url = `${this.config.similarItemsAPi}/widgets/item/XgOepW?account_id=${this.config.accountId}&auth_key=${this.config.authKey}w&domain_key=${this.config.domainkey}&fields=pid,title,brand,price,product_label,sale_price,employee_price,promotion_attr,large_image,sku_color_group,url,description,other_styles,badge,product_images&url=www.bloomique.com&_br_uid_2=uid%3D4537826017844%3Av%3D15.0%3Ats%3D1690901592022%3Ahc%3D1&item_ids=${items}&rows=${limit}&start=${start}`

            const res = await fetch(url,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    method: 'GET',
                    next: { revalidate: configuration.similarItemsCacheTime },
                }
            ).then(res => res.json());
            const _response = await makePLPProductResponse(res)
            return {
                status: res.status_code ? res.status_code : 200,
                response: _response
            }
        } catch (ex) {
            // console.log(ex)
            return {
                status: 400,
                response: ex.message || 'Error in fetching'
            }
        }

    }

    fetchRelatedItemsCategoryProducts = async ({ producturl }) => {
        try {
            let url = `${this.config.relatedAllAPi}/fetch_widget?acct_id=${this.config.accountId}&acct_auth=${this.config.authKey}&api_host=bsapi-test.brsrvr.com&ptype=product&url=${producturl}&ref_url&output_format=br_json`

            const res = await fetch(url,
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    method: 'GET',
                    next: { revalidate: configuration.relatedAllItemsCacheTime },
                }
            ).then(res => res.json());
            const _response = await makeRelatedAllResponse(res)
            return {
                status: res.status_code ? res.status_code : 200,
                response: _response
            }
        } catch (ex) {
            //console.log(ex)
            return {
                status: 400,
                response: ex.message || 'Error in fetching'
            }
        }

    }

    fetchProductCarouselDetail = async ({ productIds }) => {
        const result = {
            status: 200,
            response: {
                docs: []
            }
        }

        if (productIds && Array.isArray(productIds)) {
            const products = await Promise.all(productIds.map(async (productid) => {
                const product = await this.fetchAutoSuggestProduct({
                    query: productid,
                    limit: 1,
                    start: 0,
                    filter: {}
                })
                if (product.status && product.status === 200 && product.response && product.response.docs) {
                    return product.response.docs[0]
                }
            }))
            result.status = 200;
            result.response.docs = products;
        }
        return result
    }
}
