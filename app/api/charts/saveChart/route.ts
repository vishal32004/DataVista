import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    try {
        const data = await req.json();
        const { chartKey, json, selectedPage, columns, prefix, groupBy, colors, chartType } = data; // Extracting pagename from the request data

        console.log(data, "data here")
        const insertQuery = `
            INSERT INTO Charts (chartKey, chartJson, pagename, prefix, groupby, colors, columnname, charttype)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`;

        const result = await pool.query(insertQuery, [chartKey, json, selectedPage, groupBy, prefix, colors, JSON.stringify(columns), chartType]);

        if (result.rowCount === 1) {
            return new NextResponse("Chart Saved Success", { status: 200 });
        } else {
            return new NextResponse("Chart not saved", { status: 500 });
        }
    } catch (error) {
        console.error('Error saving the chart:', error);
        return new NextResponse("Internal Server Error", { status: 500 }); // Returning a generic error response
    }
}
