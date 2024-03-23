
import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get("tableName");
  const prefix = searchParams.get("prefix");
  const columns = JSON.parse(searchParams.get("columns") ?? "[]");
  // const category = searchParams.get('category')
  const selectedFilter = searchParams.get("selectedFilter");
  const where = searchParams.get("where");

  if (!tableName || !prefix || !columns || !Array.isArray(columns)) {
    return new NextResponse("Invalid parameters", { status: 400 });
  }

  try {
    const columnAliases = columns.map(column => `${prefix}("${column}") as ${prefix}_${column}`).join(", ");
    const result = await pool.query(`
      SELECT
        ${columnAliases}
      FROM ${tableName} where ${where} = '${selectedFilter}'
      GROUP BY ${where}
      ORDER BY ${where};
    `);

    const data = result.rows;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
