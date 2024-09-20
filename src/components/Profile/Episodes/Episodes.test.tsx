import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import episode1 from "../../../data/episodes/1";
import episode2 from "../../../data/episodes/2";
import episode3 from "../../../data/episodes/3";
import Episodes from "./Episodes";

const episodesData = [episode1, episode2, episode3];

describe("Episodes", () => {
  it("should have a title saying 'Episodes", async () => {
    render(<Episodes episodeData={[]} />);
    const title = screen.getByRole("heading", { name: /episodes/i });
    expect(title).toBeInTheDocument();
  });

  it("should show all the data", async () => {
    render(<Episodes episodeData={episodesData} />);
    const episodes = screen.getAllByTestId("episode");
    expect(episodes).toHaveLength(Object.keys(episodesData).length);
  });
});
