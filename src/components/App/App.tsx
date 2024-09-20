import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "80px" }}>
        {pathname === "/" ? <Home /> : <Outlet />}
      </Box>
    </>
  );
}
