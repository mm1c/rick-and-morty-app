import "@testing-library/jest-dom";
import Home from "./Home";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchCharacterPageData } from "../../utils/requests";
import pageData from "../../data/pages/page1";
import userEvent from "@testing-library/user-event";

jest.mock("../../utils/requests.ts");

beforeEach(() => {
  (fetchCharacterPageData as jest.Mock).mockReturnValue({
    info: pageData.info,
    results: pageData.results,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        staleTime: Infinity,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </QueryClientProvider>
  );
});

describe("Home", () => {
  it("should display a loading spinner when the data is loading", async () => {
    expect(screen.getByTestId("loading_spinner")).toBeInTheDocument();
  });

  it("should display 3 table rows after searching for 'morty' in the test data", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("name_search")).toBeInTheDocument();
    });

    await userEvent.type(screen.getByTestId("name_search"), "morty");

    await waitFor(() => {
      const tableRows = screen.queryAllByTestId("table_row");
      expect(tableRows).toHaveLength(3);
    });
  });

  it("should reset the table to the inital data set after the search input length has been reduced to less than 3 characters", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("name_search")).toBeInTheDocument();
    });

    await userEvent.type(screen.getByTestId("name_search"), "morty");

    await waitFor(() => {
      const tableRows = screen.queryAllByTestId("table_row");
      expect(tableRows).toHaveLength(3);
    });

    await userEvent.clear(screen.getByTestId("name_search"));

    await waitFor(() => {
      const tableRows = screen.queryAllByTestId("table_row");
      expect(tableRows).toHaveLength(20);
    });
  });
});
