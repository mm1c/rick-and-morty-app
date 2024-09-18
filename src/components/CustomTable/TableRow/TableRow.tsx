import { Stack } from "@mui/material";
import { TableCellType } from "../../../enums/TableCellType";
import { TableCellContainer } from "../TableCellContainer/TableCellContainer";
import { TableCell } from "../TableCell/TableCell";
import { Header } from "../../../models/Header";
import { Breakpoints } from "../../../models/Breakpoints";

interface TableRowProps<DataType> {
  header: Header[];
  data: DataType;
  onRowClick: (id: number) => void;
  responsiveConfig: { flexDirection: Breakpoints; display: Breakpoints };
}

export const TableRow = <DataType,>({
  header,
  data,
  onRowClick,
  responsiveConfig
}: TableRowProps<DataType>) => {
  const handleRowClick = () => {
    onRowClick(+data["id" as keyof DataType]);
  };

  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: responsiveConfig.flexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}
      onClick={handleRowClick}
    >
      {header.map((item) => {
        return (
          <TableCellContainer
            key={`${item.property}_${data["id" as keyof DataType]}`}
          >
            <TableCell type={TableCellType.HEADER}>{item.value}</TableCell>
            <TableCell>{data[item.key as keyof DataType] as React.ReactNode}</TableCell>
          </TableCellContainer>
        );
      })}
    </Stack>
  );
};
