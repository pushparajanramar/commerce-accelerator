import ProductDataManager from "../../../../adapters/APIData/ProductDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const productIds = body?.productIds
    if (!productIds) {
        return NextResponse.json({ status: 400, response: 'Product ids is missing' }, { status: 400 })
    }
    const dataManager = new ProductDataManager()
    const response = await dataManager.fetchProductCarouselDetail({ productIds })

    return NextResponse.json(response, { status: response.status })
}


