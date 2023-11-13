import { NextResponse } from "next/server";
import { getAssociatedCategoryLayouts } from "../../fetch-data";
import { Stack } from "../../contentstack-sdk";

export async function POST(req) {
    const { pageName, pageData } = await req.json()
    if (!pageName) {
        return NextResponse.json({ status: 400, response: 'Page name is missing' }, { status: 400 })
    }
    const response = {
        status: 200,
        response: { pageName, pageData }
    }

    if (pageName === 'plp_page' && pageData.categoryId) {
        try {
            Stack.livePreviewQuery(pageData?.searchParams);
            const response = await getAssociatedCategoryLayouts({
                contentTypeUid: "plp_page",
                lang: 'en-us',
                catCodes: [pageData.categoryId, '01'],
                referenceFieldPath: [
                    "above_grid_content.referenced_section.reference",
                    "below_grid_content.referenced_section.reference"
                ],
                jsonRtePath: undefined,
            })
            return NextResponse.json({ response: response[0] ? response[0] : [], status: 200, }, { status: 200 })
        } catch (ex) {
            return NextResponse.json({ response: {}, status: 400, }, { status: 400 })
        }
    }



    return NextResponse.json(response, { status: response.status })
}


