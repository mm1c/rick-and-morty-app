import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "./Pagination";

const renderPagination = (pageCount: number, currentPage: number) => {
  const setCurrentPageMock: React.Dispatch<React.SetStateAction<number>> =
    jest.fn();
  render(
    <Pagination
      pageCount={pageCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPageMock}
    />
  );
};

describe("Pagination", () => {
  it("should NOT show pagination at all when page count is 1", async () => {
    renderPagination(1, 0);
    const paginatePrev = screen.queryByTestId("paginate_prev");
    const paginateNext = screen.queryByTestId("paginate_next");
    expect(paginatePrev).toBeNull();
    expect(paginateNext).toBeNull();
  });

  it("should show both PREV and NEXT buttons when having 3 pages and pagination is at position 2", async () => {
    renderPagination(3, 1);
    const paginatePrev = screen.getByTestId("paginate_prev");
    const paginateNext = screen.getByTestId("paginate_next");
    expect(paginatePrev).toBeInTheDocument();
    expect(paginateNext).toBeInTheDocument();
  });

  it("should NOT show PREV when pagination is on the first page", async () => {
    renderPagination(3, 0);
    const paginatePrev = screen.queryByTestId("paginate_prev");
    expect(paginatePrev).toBeNull();
  });

  it("should NOT show NEXT when pagination is on the last page", async () => {
    renderPagination(3, 2);
    const paginateNext = screen.queryByTestId("paginate_next");
    expect(paginateNext).toBeNull();
  });
});
