import ProductDataManager from "../../../../adapters/APIData/ProductDataManager";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    const pid = context.params.pid
    if (!pid) {
        return NextResponse.json({ status: 400, response: 'Product id is missing' }, { status: 400 })
    }
    const dataManager = new ProductDataManager()
    const response = await dataManager.fetchProductDetail({ pid })

    return NextResponse.json(response, { status: response.status })
}


