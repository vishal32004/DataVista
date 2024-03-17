import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const { searchParams } = new URL(req.url);
        const selectedPage = searchParams.get("selectedPage");

        if (!selectedPage) {
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        const result = await pool.query(
            `SELECT ColumnName FROM ColumnNames WHERE Pagename = $1`,
            [selectedPage]
        );

        const data = result.rows;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
