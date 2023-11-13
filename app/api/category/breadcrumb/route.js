import { NextResponse } from "next/server";
import PageDataManager from "../../../../adapters/APIData/PageDataManager";

export async function POST(req) {
    const { pagename, pagedata } = await req.json()
    if (!pagename) {
        return NextResponse.json({ status: 400, response: 'Page name is missing' }, { status: 400 })
    }
    let response = {
        status: 200,
        response: { pagename, pagedata }
    }

    if (pagename === 'plp_page' && pagedata.categoryid) {
        const dataManager = new PageDataManager()
        response = await dataManager.fetchBreadcrumbDetail({ categoryId: pagedata.categoryid })
    }

    return NextResponse.json(response, { status: response.status })
}


