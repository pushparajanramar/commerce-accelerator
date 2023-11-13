import ProductDataManager from "../../../../adapters/APIData/ProductDataManager";
import { createSerializeFilter } from "../../../../lib/Common";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const filters = body.filter || {};
    if (!body.query) {
        return NextResponse.json({ status: 400, response: 'Query param missing' }, { status: 400 })
    } else if (!body.limit) {
        return NextResponse.json({ status: 400, response: 'Limit param missing' }, { status: 400 })
    }

    const serializeobj = createSerializeFilter(filters)

    const dataManager = new ProductDataManager()
    const response = await dataManager.fetchAutoSuggestProduct({
        query: encodeURIComponent(body.query),
        limit: body.limit,
        start: body.start || 0,
        sort: body.sort ? encodeURIComponent(body.sort) : null,
        filter: Object.keys(filters).length > 0 ? serializeobj : null,
    })

    return NextResponse.json(response, { status: response.status })
}


