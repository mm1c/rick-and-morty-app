import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function BackBtn({ path }: { path: string }) {
  const navigate = useNavigate();
  const handleBack = () => navigate(path);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "30px",
      }}
    >
      <Button variant="contained" startIcon={<HomeIcon />} onClick={handleBack}>
        back
      </Button>
    </Container>
  );
}
