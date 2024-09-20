import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomTable } from "./CustomTable";
import { DataMeta } from "../../../models/DataMeta";
import { MOCK_DATA } from "../../../data/characters";
import { mapApiDataToTable } from "../../../utils/mappers";
const tableHeader: DataMeta[] = [
  { key: "image", value: "" },
  { key: "name", value: "Name" },
  { key: "species", value: "Species" },
  { key: "status", value: "Status" },
];

const data = mapApiDataToTable(MOCK_DATA);

const renderCustomTable = (itemsPerPage: number) => {
  render(
    <CustomTable
      header={tableHeader}
      data={data}
      onRowClick={jest.fn()}
      itemsPerPage={itemsPerPage}
    />
  );
};

describe("CustomTable", () => {
  it("should contain the table header", async () => {
    renderCustomTable(3);
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("should render all the table rows", async () => {
    renderCustomTable(data.length);
    const tableRows = await screen.findAllByTestId("table_row");
    expect(tableRows).toHaveLength(data.length);
  });

  it("should NOT render the pagination when there is only one page", async () => {
    renderCustomTable(data.length);
    const pagination = screen.queryByTestId("pagination");
    expect(pagination).toBeNull();
  });

  it("should render the pagination when there are multiple pages", async () => {
    renderCustomTable(3);
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
});
