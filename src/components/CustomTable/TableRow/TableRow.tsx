import { Stack } from "@mui/material";
import { TableCellType } from "../../../enums/TableCellType";
import { TableCellContainer } from "../TableCellContainer/TableCellContainer";
import { TableCell } from "../TableCell/TableCell";
import { DataMeta } from "../../../models/DataMeta";

interface TableRowProps<DataType> {
  header: DataMeta[];
  data: DataType;
  onRowClick: (id: number) => void;
}

export const TableRow = <DataType,>({
  header,
  data,
  onRowClick,
}: TableRowProps<DataType>) => {
  const handleRowClick = () => onRowClick(+data["id" as keyof DataType]);

  return (
    <Stack
      spacing={0}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        cursor: "pointer",
      }}
      onClick={handleRowClick}
      data-testid="table_row"
    >
      {header.map((item) => {
        return (
          <TableCellContainer
            key={`${item.key}_${data["id" as keyof DataType]}`}
          >
            <TableCell type={TableCellType.HEADER}>{item.value}</TableCell>
            <TableCell>
              {data[item.key as keyof DataType] as React.ReactNode}
            </TableCell>
          </TableCellContainer>
        );
      })}
    </Stack>
  );
};
