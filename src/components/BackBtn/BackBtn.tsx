import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function BackBtn() {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "30px",
      }}
    >
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => navigate(-1)}
      >
        back
      </Button>
    </Stack>
  );
}
