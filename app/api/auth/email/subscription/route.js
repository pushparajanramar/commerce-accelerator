import AuthDataManager from "../../../../../adapters/APIData/AuthDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    if (!data) {
        return NextResponse.json({ status: 400, response: 'Data param missing' }, { status: 400 })
    }
    const dataManager = new AuthDataManager()
    const response = await dataManager.emailSubscription({
        email: data?.email,
        token: data?.token
    })
    return NextResponse.json(response, { status: response.status })
}




