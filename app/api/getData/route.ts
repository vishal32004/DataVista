import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get("tableName");
  const prefix = searchParams.get("prefix");
  const columns = JSON.parse(searchParams.get("columns") ?? "[]");

  if (!tableName || !prefix || !columns || !Array.isArray(columns)) {
    return new NextResponse("Invalid parameters", { status: 400 });
  }

  try {
    const columnAliases = columns.map((_, index) => `${prefix}($${index + 1}) as ${prefix}_col${index + 1}`).join(", ");
    const queryParams = [tableName, ...columns];
    const query = `
            SELECT 
                year,
                ${columnAliases}
            FROM $1
            GROUP BY year
            ORDER BY year;
        `;

    const result = await pool.query(query, queryParams);
    const data = result.rows;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
