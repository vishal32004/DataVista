import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const tableName: string | null = searchParams.get("tableName");
  const prefix: string | null = searchParams.get("prefix");
  const columns: string[] = JSON.parse(searchParams.get("columns") ?? "[]");
  // const category = searchParams.get('category')
  const selectedFilter: string | null = searchParams.get("selectedFilter");
  const where: string | null = searchParams.get("where");

  if (!tableName || !prefix || !columns || !Array.isArray(columns) || !selectedFilter) {
    return new NextResponse("Invalid parameters", { status: 400 });
  }


  try {
    const columnAliases = columns.map((column: string) => `${prefix}("${column}") as ${prefix}_${column}`).join(", ");
    const result = await pool.query(`
    SELECT
      ${columnAliases}
    FROM ${tableName}
    WHERE ${where} IN (${JSON.parse(selectedFilter).map((filter: string) => `'${filter}'`).join(", ")})
    GROUP BY ${where}
    ORDER BY ${where};
  `);
    const data = result.rows;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
