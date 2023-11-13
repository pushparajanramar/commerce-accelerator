import { NextResponse } from "next/server";
import { getEntry } from "../../fetch-data";
import configuration from "../../../../constants/configuration";

export async function POST(req) {
    const locale = 'en-us';

    const referenceFieldPaths = [
        configuration.headerNavigationTag,
        configuration.PLPLabelTag,
        configuration.PDPLabelTag,
        configuration.formValidationTag,
        configuration.responseCodeTag,
        configuration.screenReaderTag,
        configuration.sizeChartTag,
        configuration.footerTag,
        configuration.userAuthModal,
    ]

    try {
        const response = await getEntry({
            contentTypeUid: configuration.globalContentTypeUID,
            referenceFieldPath: referenceFieldPaths,
            jsonRtePath: undefined,
            lang: locale
        })
        return NextResponse.json({ response: response[0][0], status: 200, }, { status: 200 })
    } catch (ex) {
        return NextResponse.json({ response: {}, status: 400, }, { status: 400 })
    }

}