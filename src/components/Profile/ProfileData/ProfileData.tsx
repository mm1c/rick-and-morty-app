import { Stack, Box } from "@mui/material";
import { Character } from "../../../models/Character";
import { DataMeta } from "../../../models/DataMeta";

enum DataCellType {
  DATA,
  META,
}

const DataCell = ({
  type = DataCellType.DATA,
  children,
}: {
  type?: DataCellType;
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        marginTop: "1px",
        marginBottom: "1px",
        padding: "5px 10px",
        ...(type === DataCellType.META
          ? { backgroundColor: "#1976d263" }
          : { backgroundColor: "#1976d23b" }),
      }}
    >
      {children}
    </Box>
  );
};

const DataRow = ({
  field,
  value,
}: {
  field: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {field && <DataCell type={DataCellType.META}>{field}</DataCell>}
      {value && <DataCell>{value}</DataCell>}
    </Stack>
  );
};

const Avatar = ({ profileData }: { profileData: Character[] }) => {
  return <Box sx={{ marginBottom: "5px" }}>{profileData[0]["image"]}</Box>;
};

export default function ProfileData({
  profileMeta,
  profileData,
}: {
  profileMeta: DataMeta[];
  profileData: Character[];
}) {
  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "100%", sm: "552px" },
        flexWrap: "wrap",
      }}
    >
      <Avatar profileData={profileData} />

      {profileMeta.map((item) => (
        <DataRow
          key={item.key}
          field={item.value}
          value={profileData[0][item.key as keyof Character]}
        />
      ))}
    </Stack>
  );
}
