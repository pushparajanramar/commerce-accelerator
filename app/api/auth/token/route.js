import AuthDataManager from "../../../../adapters/APIData/AuthDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    if (!data) {
        return NextResponse.json({ status: 400, response: 'Data param missing' }, { status: 400 })
    }
    const dataManager = new AuthDataManager()
    const response = await dataManager.createAuthToken({
        UID: data?.UID,
        UIDSignature: data?.UIDSignature,
        timeStamp: data?.timeStamp,
        idToken: data?.idToken
    })

    return NextResponse.json(response, { status: response.status })
}



