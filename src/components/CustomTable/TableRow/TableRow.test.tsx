import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataMeta } from "../../../models/DataMeta";
import { TableRow } from "./TableRow";

const headerData: DataMeta[] = [
  { key: "a", value: "a" },
  { key: "b", value: "b" },
  { key: "c", value: "c" },
];

const rowData = {
  a: 1,
  b: 2,
  c: 3,
};

const renderTableRow = () => {
  const onRowClickMock = jest.fn();

  render(
    <TableRow header={headerData} data={rowData} onRowClick={onRowClickMock} />
  );

  return onRowClickMock;
};

describe("TableRow", () => {
  // it("should be present in the DOM", async () => {
  //   renderTableRow();
  //   const tableRow = screen.getByTestId("table_row");
  //   expect(tableRow).toBeInTheDocument();
  // });

  // it("should execute onRowClick when clicking on it", () => {
  //   const onRowClickMock = renderTableRow();
  //   const tableRow = screen.getByTestId("table_row");
  //   fireEvent.click(tableRow);
  //   expect(onRowClickMock).toHaveBeenCalledTimes(1);
  // });

  // it("should show all the data", async () => {
  //   renderTableRow();
  //   const tableRow = screen.getByTestId("table_row");
  //   const rowCells = await within(tableRow).findAllByTestId("table_cell");
  //   expect(rowCells).toHaveLength(Object.keys(rowData).length * 2); // responsive headers + data
  // });

  // it("should show all the cells with the desired data", async () => {
  //   renderTableRow();
  //   const tableRow = screen.getByTestId("table_row");
  //   Object.keys(rowData).forEach((key) => {
  //     expect(
  //       within(tableRow).getByText(rowData[key as keyof typeof rowData])
  //     ).toBeInTheDocument();
  //   });
  // });
});
