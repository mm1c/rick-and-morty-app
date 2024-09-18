import { Stack } from "@mui/material";
import { TableCell } from "../TableCell/TableCell";
import { Header } from "../../../models/Header";
import { Breakpoints } from "../../../models/Breakpoints";

export const TableHeader = ({
  data,
  responsiveConfig,
}: {
  data: Header[];
  responsiveConfig?: { flexDirection: Breakpoints; display: Breakpoints };
}) => {
  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: responsiveConfig?.flexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        display: responsiveConfig?.display, // { xs: "none", sm: "flex" },
      }}
    >
      {data.map((item) => (
        <TableCell key={item.property}>{item.value}</TableCell>
      ))}
    </Stack>
  );
};
