import ProductDataManager from "../../../../adapters/APIData/ProductDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    if (!body.categoryid) {
        return NextResponse.json({ status: 400, response: 'Category param missing' }, { status: 400 })
    }

    const dataManager = new ProductDataManager()
    const response = await dataManager.fetchCategoryFacets({
        categoryid: body.categoryid,
    })

    return NextResponse.json(response, { status: response.status })
}



