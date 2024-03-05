import { pool } from "@/lib/db-config";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const result = await pool.query(`
      SELECT 
        year,
        SUM(covid) as total_covid,
        SUM("Lung Cancer") as total_lung_cancer,
        SUM(Tuberculosis) as total_tuberculosis,
        SUM("HIV/AIDS") as total_hiv_aids,
        SUM("Heart Failure") as total_heart_failure,
        SUM(Stroke) as total_stroke
      FROM Disease
      GROUP BY year
      ORDER BY year;
    `);

    const data = result.rows;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
