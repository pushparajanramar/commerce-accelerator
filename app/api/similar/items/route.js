import ProductDataManager from "../../../../adapters/APIData/ProductDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    if (!body.items) {
        return NextResponse.json({ status: 400, response: 'Items param missing' }, { status: 400 })
    } else if (!body.limit) {
        return NextResponse.json({ status: 400, response: 'Limit param missing' }, { status: 400 })
    }
    const items = body.items && Array.isArray(body.items) ? Array(body.items).toString() : body.items

    const dataManager = new ProductDataManager()
    const response = await dataManager.fetchSimilarItems({
        items: items,
        limit: body.limit,
        start: body.start || 0,
    })

    return NextResponse.json(response, { status: response.status })
}


