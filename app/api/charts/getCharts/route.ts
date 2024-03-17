import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    const { searchParams } = new URL(req.url);
    const chartKey = searchParams.get("chartKey");

    if (!chartKey) {
        return new NextResponse("Invalid parameters", { status: 400 });
    }

    try {
        const result = await pool.query(`
            SELECT 
                chartjson
            FROM 
                charts
            WHERE 
                chartkey = $1;
        `, [chartKey]);

        const data = result.rows;
        // if (data.length === 0) {
        //     return NextResponse.json("No data found for the specified chart key", { status: 404 });
        // }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
