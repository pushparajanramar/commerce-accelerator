import ProductDataManager from "../../../adapters/APIData/ProductDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    if (!body.query) {
        return NextResponse.json({ status: 400, response: 'Query param missing' }, { status: 400 })
    }
    const dataManager = new ProductDataManager()
    const response = await dataManager.fetchAutoSuggest({ query: body.query })

    return NextResponse.json(response, { status: response.status })
}