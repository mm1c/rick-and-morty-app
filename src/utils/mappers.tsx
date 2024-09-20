import { Avatar } from "@mui/material";
import { CharacterResponse } from "../models/CharacterResponse";
import { Character } from "../models/Character";
import { Episode } from "../models/Episode";
import { EpisodeResponse } from "../models/EpisodeResponse";

export const mapApiDataToTable = (
  apiData: CharacterResponse[] | undefined
): Character[] => {
  if (!apiData) return [];

  return apiData.map((item) => ({
    ...item,
    image: <Avatar alt={item["name"]} src={item["image"] as string} />,
    origin: item["origin"].name as keyof Character,
    location: item["location"].name as keyof Character,
  }));
};

export const mapApiEpisodeData = (
  apiData: EpisodeResponse[] | undefined | null
): Episode[] => {
  if (!apiData) return [];

  return apiData.map((item) => {
    const { air_date: _, ...rest } = item;
    return {
      ...rest,
      airDate: item["air_date" as keyof EpisodeResponse] as keyof Episode,
    };
  });
};
