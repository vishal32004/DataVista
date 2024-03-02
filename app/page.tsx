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

import Grid from "@/components/Grid";

//   return (
//     <Tabs defaultValue="account" className="w-full">
//       <TabsList className="w-full">
//         <TabsTrigger value="account">Account</TabsTrigger>
//         <TabsTrigger value="password">Password</TabsTrigger>
//       </TabsList>
//       <TabsContent value="account" className="p-2">
//         <Grid html={html} />
//       </TabsContent>
//       <TabsContent value="password">Change your password here.</TabsContent>
//     </Tabs>
//   );
// };

// export default Home;

const Home = () => {
  return (
    <div>
      <Grid />
    </div>
  );
};

export default Home;
