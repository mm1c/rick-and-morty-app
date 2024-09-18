import { Box } from "@mui/material";
import { TableCellType } from "../../../enums/TableCellType";

export const TableCell = ({
  type = TableCellType.NORMAL,
  children,
}: {
  type?: number;
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        ...(type === TableCellType.HEADER
          ? { display: { sm: "none" } }
          : { display: { sm: "flex" }, justifyContent: "center" }),
        width: { sm: "100%" },
      }}
    >
      {children}
    </Box>
  );
};
