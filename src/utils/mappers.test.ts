import "@testing-library/jest-dom";
import { mapApiDataToTable, mapApiEpisodeData } from "./mappers";
import characterData from "../data/characters/1";
import episodeData from "../data/episodes/1";

const characterProperties = [
  "id",
  "name",
  "species",
  "status",
  "image",
  "gender",
  "episode",
  "url",
  "origin",
  "location",
];

const episodeProperties = ["id", "name", "airDate", "episode"];

describe("mappers mapApiEpisodeData", () => {
  it("should return a valid character", () => {
    const result = mapApiDataToTable([characterData])[0];
    characterProperties.forEach((property) => {
      expect(
        Object.prototype.hasOwnProperty.call(result, property)
      ).toBeTruthy();
    });
  });
});

describe("mappers mapApiEpisodeData", () => {
  it("should return a valid episode", () => {
    const result = mapApiEpisodeData([episodeData])[0];
    episodeProperties.forEach((property) => {
      expect(
        Object.prototype.hasOwnProperty.call(result, property)
      ).toBeTruthy();
    });
  });
});
