import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    try {
        const data = await req.json();
        const { chartKey, json } = data;
        const insertQuery = `
            INSERT INTO Charts (chartKey, chartJson)
            VALUES ($1, $2)
            RETURNING id;`;
        const result = await pool.query(insertQuery, [chartKey, json]);
        if (result.rowCount === 1) {
            return new NextResponse("Chart Saved Success", { status: 200 });
        } else {
            return new NextResponse("Chart not saved", { status: 500 });
        }
    } catch (error) {
        console.error('Error saving the chart:', error);
    }
}
