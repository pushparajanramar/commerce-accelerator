import { NextResponse } from "next/server";
import { fetchData } from "../../fetch-data";

export async function POST(req) {

  const response = {
    status: 200,
    response: {},
  };

  await fetchData("pdp_page", "blt9f797054f274e3de").then(
    function success(entry) {
      // return entry;
      response.response = entry;
    },
    function error(err) {
      response.status = err.status;
      response.response = err;
    }
  );

  return NextResponse.json(response, { status: response.status });
}
