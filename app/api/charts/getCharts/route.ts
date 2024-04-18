import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    const { searchParams } = new URL(req.url);
    const chartKey = searchParams.get("chartKey");
    const pageName = searchParams.get("pagename");

    if (!chartKey || !pageName) {
        return new NextResponse("Invalid parameters", { status: 400 });
    }

    try {
        const result = await pool.query(`
            SELECT
            chartJson, pagename, prefix, groupby, colors, columnname, charttype
            FROM
                charts
            WHERE
                chartkey = $1
                AND pagename = $2;
        `, [chartKey, pageName]);

        const data = result.rows;

        if (data.length === 0) {
            return new NextResponse("No data found for the specified chart key and pagename", { status: 404 });
        }

        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}