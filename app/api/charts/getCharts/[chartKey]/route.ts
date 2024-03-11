import { NextResponse } from "next/server";

export async function GET(
    req: Request
) {
    try {
        const { searchParams } = new URL(req.url);
        const chartKey = searchParams.get("chartKey");
        if (!chartKey) {
            return new NextResponse("ChartKey is missing", { status: 400 });
        }


        // return NextResponse.json(server);
    } catch (error) {
        console.log("ChartKey Retrive", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}