import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    const { searchParams } = new URL(req.url);
    const selectedFilter = searchParams.get("selectedFilter");
    const columns = searchParams.get("columns");
    const tableName = searchParams.get("tableName");
    const where = searchParams.get("where");

    console.log(selectedFilter)
    console.log(columns)
    console.log(tableName)
    console.log(where)

    if (!tableName || !columns || !where) {
        return new NextResponse("Invalid parameters", { status: 400 });
    }

    // Parse the columns string into an array
    const parsedColumns = JSON.parse(columns);

    // Check if the parsed columns is an array
    if (!Array.isArray(parsedColumns)) {
        console.log('failed');
        return;
    }

    // Join the array elements with commas
    const columnNamesString = parsedColumns.join(', ');

    console.log(columnNamesString);
    console.log(`
    SELECT
      ${columnNamesString}
    FROM ${tableName}
    where ${where} = '${selectedFilter}'
  `)
    try {
        const result = await pool.query(`
      SELECT
        ${columnNamesString}
      FROM ${tableName}
      where ${where} = '${selectedFilter}'
    `);
        const data = result.rows;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
