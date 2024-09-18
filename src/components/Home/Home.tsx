import { MOCK_DATA } from "../../data/characters";
import { Character } from "../../models/Character";
import { CustomTable } from "../CustomTable/CustomTable/CustomTable";
import { Header } from "../../models/Header";
import { useMemo, useState } from "react";
import { mapApiDataToTable } from "../../utils/mappers";
import { Container, TextField } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import { dynamicPaths } from "../../routes";
import { useNavigate } from "react-router-dom";
import { CharacterResponse } from "../../models/CharacterResponse";

const header: Header[] = [
  { key: "image", value: "", property: "image" },
  { key: "name", value: "Name", property: "name" },
  { key: "species", value: "Species", property: "species" },
  { key: "status", value: "Status", property: "status" },
];

const tableData = mapApiDataToTable<CharacterResponse, Character>(MOCK_DATA);

export default function Home() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const delayedSearchTerm = useDebounce(searchTerm, 200);

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSearchTerm(e.target.value);

  const tableToRender = useMemo(
    () => (
      <CustomTable
        header={header}
        data={tableData}
        nameFilter={delayedSearchTerm}
        onRowClick={(id) => navigate(dynamicPaths.profile(id))}
      />
    ),
    [delayedSearchTerm, navigate]
  );

  return (
    <>
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
        />
      </Container>
      {tableToRender}
    </>
  );
}

