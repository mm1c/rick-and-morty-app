import { Divider, Stack } from "@mui/material";
import { TableCell } from "../TableCell/TableCell";
import { DataMeta } from "../../../models/DataMeta";

export const TableHeader = ({ data }: { data: DataMeta[] }) => {
  return (
    <>
      <Stack
        spacing={0}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          display: { xs: "none", sm: "flex" },
          fontWeight: 600,
        }}
        data-testid="header"
      >
        {data.map((item) => (
          <TableCell key={item.key}>{item.value}</TableCell>
        ))}
      </Stack>
      <Divider sx={{ marginBottom: "10px" }} />
    </>
  );
};
