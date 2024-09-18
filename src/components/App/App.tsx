import "@fontsource/roboto/300.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import { Box } from "@mui/material";

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
