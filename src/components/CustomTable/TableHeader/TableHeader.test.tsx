import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableHeader } from "./TableHeader";
import { DataMeta } from "../../../models/DataMeta";

const headerData: DataMeta[] = [
  { key: "a", value: "a" },
  { key: "b", value: "b" },
  { key: "c", value: "c" },
];

describe("TableHeader", () => {
  it("should be present in the DOM", async () => {
    render(<TableHeader data={headerData} />);
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("should show all the headers", async () => {
    render(<TableHeader data={headerData} />);
    const header = screen.getByTestId("header");
    const headerCells = await within(header).findAllByTestId("table_cell");
    expect(headerCells).toHaveLength(headerData.length);
  });

  it("should show all the headers with the desired labels", async () => {
    render(<TableHeader data={headerData} />);
    const header = screen.getByTestId("header");
    headerData.forEach((item) => {
      expect(within(header).getByText(item.value)).toBeInTheDocument();
    });
  });
});
