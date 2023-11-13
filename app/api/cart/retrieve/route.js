import CartDataManager from "../../../../adapters/APIData/CartDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const dataManager = new CartDataManager();
    const response = await dataManager.retrieveCart({
      user: data?.user,
      token: data?.bearerToken,
      cartId: data?.cartId,
    });
    return NextResponse.json(response, { status: response.status });
  } catch (ex) {
    return NextResponse.json(
      { status: 400, response: "Data param missing" },
      { status: 400 }
    );
  }

}
