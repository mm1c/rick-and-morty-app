import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchProfilePageData, fetchEpisodeData } from "../../utils/requests";
import character from "../../data/characters/2";
import episode from "../../data/episodes/2";
import Profile from "./Profile";

jest.mock("../../utils/requests.ts");

beforeEach(() => {
  (fetchProfilePageData as jest.Mock).mockReturnValue(character);
  (fetchEpisodeData as jest.Mock).mockReturnValue(episode);

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
        <Profile />
      </BrowserRouter>
    </QueryClientProvider>
  );
});

describe("Home", () => {
  it("should have a profile data section", async () => {
    await waitFor(() => {
      const profileData = screen.queryByTestId("profile");
      expect(profileData).toBeInTheDocument();
    });
  });

  it("should have an episodes data section", async () => {
    await waitFor(() => {
      const episodes = screen.queryByTestId("episodes");
      expect(episodes).toBeInTheDocument();
    });
  });

  it("should have a back button", async () => {
    const button = screen.getByRole("button", { name: /back/i });
    expect(button).toBeInTheDocument();
  });
});
