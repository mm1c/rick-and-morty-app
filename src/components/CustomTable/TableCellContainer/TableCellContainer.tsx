import { Stack } from "@mui/material";

export const TableCellContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {children}
    </Stack>
  );
}