import { useParams } from "react-router-dom";
import { paths } from "../../routes";
import BackBtn from "../BackBtn/BackBtn";
import characterData from "../../data/characters/2";
import { CustomTable } from "../CustomTable/CustomTable/CustomTable";
import { Header } from "../../models/Header";
import { mapApiDataToTable } from "../../utils/mappers";
import { Character } from "../../models/Character";
import { CharacterResponse } from "../../models/CharacterResponse";

const MOCK_DATA = [characterData];

const tableData = mapApiDataToTable<CharacterResponse, Character>(MOCK_DATA);

const header: Header[] = [
  { key: "image", value: "", property: "image" },
  { key: "name", value: "Name", property: "name" },
  { key: "species", value: "Species", property: "species" },
  { key: "status", value: "Status", property: "status" },
  { key: "gender", value: "Gender", property: "gender" },
  { key: "origin", value: "Origin", property: "origin.name" },
  { key: "location", value: "Location", property: "location.name" },
];

export default function Profile() {
  const params = useParams();

  console.log(params?.id, MOCK_DATA);

  return (
    <>
      <CustomTable
        header={header}
        data={tableData}
        responsiveConfig={{
          flexDirection: { xs: "column", sm: "column", md: "row" },
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      />
      <BackBtn path={paths.home} />
    </>
  );
}
