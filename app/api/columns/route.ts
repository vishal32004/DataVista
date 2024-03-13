import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    try {

        const { searchParams } = new URL(req.url);
        const selectedPage = searchParams.get("selectedPage");
        const result = await pool.query(`SELECT ColumnName FROM ColumnNames WHERE Pagename = '${selectedPage}'`);
        console.log(`SELECT ColumnName FROM ColumnNames WHERE Pagename = '${selectedPage}'`)
        const data = result.rows;
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
