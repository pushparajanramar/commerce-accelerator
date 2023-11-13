import CartDataManager from "../../../../adapters/APIData/CartDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
    const dataManager = new CartDataManager()
    const response = await dataManager.createGuestAuthToken()
    return NextResponse.json(response, { status: response.status })
}




