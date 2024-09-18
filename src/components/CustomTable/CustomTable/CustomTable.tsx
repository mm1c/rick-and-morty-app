import { Container, Divider } from "@mui/material";
import { TableHeader } from "../TableHeader/TableHeader";
import { TableRow } from "../TableRow/TableRow";
import React, { useMemo, useState } from "react";
import { Header } from "../../../models/Header";
import { Breakpoints } from "../../../models/Breakpoints";
import { Pagination } from "../Pagination/Pagination";

const itemsPerPage = 5;
const minSearchTermLength = 3;

interface CustomTableProps<DataType> {
  header: Header[];
  data: DataType[];
  nameFilter?: string;
  onRowClick?: (id: number) => void;
  responsiveConfig?: { flexDirection: Breakpoints; display: Breakpoints };
}

export const CustomTable = <DataType,>({
  header,
  data,
  nameFilter,
  onRowClick,
  responsiveConfig = {
    flexDirection: { xs: "column", sm: "row" },
    display: { xs: "none", sm: "flex" },
  },
}: CustomTableProps<DataType>) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length]
  );

  const handleRowClick = (id: number) => onRowClick && onRowClick(id);

  const dataToRender = useMemo(
    () =>
      data
        .filter((item) => {
          if (!nameFilter) return true;

          return nameFilter.length < minSearchTermLength
            ? true
            : (item["name" as keyof DataType] as string)
                .toLowerCase()
                .includes(nameFilter.toLowerCase());
        })
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [currentPage, data, nameFilter]
  );

  return (
    <>
      <Container maxWidth={false}>
        <TableHeader data={header} responsiveConfig={responsiveConfig} />
        {dataToRender.map((item) => {
          return (
            <React.Fragment key={item["id" as keyof DataType] as string}>
              <TableRow
                data={item}
                header={header}
                onRowClick={handleRowClick}
                responsiveConfig={responsiveConfig}
              />
              <Divider
                key={`table-row-divider-${item["id" as keyof DataType]}`}
                sx={{ marginBottom: "10px" }}
              />
            </React.Fragment>
          );
        })}
      </Container>
      {pageCount > 1 && (
        <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};
