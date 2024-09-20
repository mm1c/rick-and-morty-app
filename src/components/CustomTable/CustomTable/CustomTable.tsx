import React, { useEffect, useMemo, useState } from "react";
import { Container, Divider } from "@mui/material";
import { TableHeader } from "../TableHeader/TableHeader";
import { TableRow } from "../TableRow/TableRow";
import { DataMeta } from "../../../models/DataMeta";
import { Pagination } from "../Pagination/Pagination";

const ITEMS_PER_PAGE = 20;
const MIN_SEARCH_TERM_LENGTH = 3;

interface CustomTableProps<DataType> {
  header: DataMeta[];
  data: DataType[];
  nameFilter?: string;
  onRowClick?: (id: number) => void;
}

export const CustomTable = <DataType,>({
  header,
  data,
  nameFilter,
  onRowClick,
}: CustomTableProps<DataType>) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleRowClick = (id: number) => onRowClick && onRowClick(id);

  const filteredData = useMemo(
    () =>
      data.filter((item) => {
        if (!nameFilter || nameFilter.length < MIN_SEARCH_TERM_LENGTH) return true;

        return (item["name" as keyof DataType] as string)
          .toLowerCase()
          .includes(nameFilter.toLowerCase());
      }),
    [data, nameFilter]
  );

  const dataToRender = useMemo(
    () =>
      filteredData.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      ),
    [currentPage, filteredData]
  );

  const pageCount = useMemo(
    () => Math.ceil(filteredData.length / ITEMS_PER_PAGE),
    [filteredData.length]
  );

  useEffect(() => setCurrentPage(() => 0), [filteredData]);

  return (
    <>
      <Container maxWidth={false}>
        <TableHeader data={header} />
        {dataToRender.map((item) => {
          return (
            <React.Fragment key={item["id" as keyof DataType] as string}>
              <TableRow
                data={item}
                header={header}
                onRowClick={handleRowClick}
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
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};
