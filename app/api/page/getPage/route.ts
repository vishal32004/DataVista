import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const result = await pool.query(`SELECT * FROM pages`);
        const data = result.rows;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
