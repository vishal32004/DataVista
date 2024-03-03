// import { UserButton } from "@clerk/nextjs";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Grid from "@/components/Grid";
// import { pool } from "@/lib/db-config";
// import 'bootstrap/dist/css/bootstrap.min.css'
// const Home = async () => {
//   let html;
//   try {
//     const result = await pool.query(
//       'SELECT "GRID_HTML", "TILE_COUNT" FROM public."GRIDS";'
//     );
//     html = result.rows[0].GRID_HTML
//     console.log(result.rows);
//   } catch (error) {
//     console.log(error);
//     console.error("Error executing query:");
//   }

import Grid from "@/components/grids/Grid";
const Home = () => {
  return (
    <div>
      <Grid />
    </div>
  );
};

export default Home;
