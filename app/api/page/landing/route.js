import { NextResponse } from "next/server";
import { getPageRes } from "../../fetch-data";
import errorMsg from "@/constants/errorMsg";
import { Stack } from "../../contentstack-sdk";
import { extractReferencedModularBlocks, preFetchProductCarouselEntries } from "@/lib/factories";

export async function POST(req) {
    const data = await req.json()
    if (!data.pathname) {
        return NextResponse.json({ status: 400, response: errorMsg.pageUrlMissing }, { status: 400 })
    }
    try {
        Stack.livePreviewQuery(data?.searchParams);
        let response = await getPageRes("page", data.pathname, "en-us")
        //For Product carousel context
        response = extractReferencedModularBlocks(response);
        response = await preFetchProductCarouselEntries(response);
        //End Product carousel
        return NextResponse.json({ response, status: 200, }, { status: 200 })
    } catch (ex) {
        return NextResponse.json({ response: {}, status: 400, }, { status: 400 })
    }

}