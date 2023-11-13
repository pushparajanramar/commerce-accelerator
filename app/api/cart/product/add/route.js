import CartDataManager from "../../../../../adapters/APIData/CartDataManager";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json(
      { status: 400, response: "Data param missing" },
      { status: 400 }
    );
  }
  const dataManager = new CartDataManager();
  const response = await dataManager.addProductToCart({
    user: data?.user,
    token: data?.bearerToken,
    guId: data?.guid,
    product: data?.productCode,
    qty: data?.qty,
  });
  return NextResponse.json(response, { status: response.status });
}
