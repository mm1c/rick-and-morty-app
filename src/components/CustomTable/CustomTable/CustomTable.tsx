import { Fragment, useEffect, useMemo, useState } from "react";
import { Container, Divider } from "@mui/material";
import { TableHeader } from "../TableHeader/TableHeader";
import { TableRow } from "../TableRow/TableRow";
import { DataMeta } from "../../../models/DataMeta";
import { Pagination } from "../Pagination/Pagination";

interface CustomTableProps<DataType> {
  header: DataMeta[];
  data: DataType[];
  onRowClick?: (id: number) => void;
  itemsPerPage: number;
}

export const CustomTable = <DataType,>({
  header,
  data,
  onRowClick,
  itemsPerPage,
}: CustomTableProps<DataType>) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleRowClick = (id: number) => onRowClick && onRowClick(id);

  const dataToRender = useMemo(
    () =>
      data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      ),
    [currentPage, data, itemsPerPage]
  );

  const pageCount = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  useEffect(() => setCurrentPage(() => 0), [data]);

  return (
    <>
      <Container maxWidth={false}>
        <TableHeader data={header} />
        {dataToRender.map((item) => {
          return (
            <Fragment key={item["id" as keyof DataType] as string}>
              <TableRow
                data={item}
                header={header}
                onRowClick={handleRowClick}
              />
              <Divider
                key={`table-row-divider-${item["id" as keyof DataType]}`}
                sx={{ marginBottom: "10px" }}
              />
            </Fragment>
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
