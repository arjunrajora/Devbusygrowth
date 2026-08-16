import { NextRequest } from "next/server";
import { POST as contactPOST } from "../contact/route";

export async function POST(req: NextRequest) {
  return contactPOST(req);
}
