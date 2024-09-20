import { Container, TextField } from "@mui/material";

export default function SearchBar({
  searchTerm,
  handleSearch,
}: {
  searchTerm: string;
  handleSearch: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <Container
      sx={{
        justifyContent: { xs: "center", sm: "flex-start" },
        marginBottom: "50px",
        display: "flex",
      }}
    >
      <TextField
        value={searchTerm}
        label="search names"
        variant="standard"
        onChange={handleSearch}
        slotProps={{
          htmlInput: { "data-testid": "name_search" },
        }}
      />
    </Container>
  );
}
