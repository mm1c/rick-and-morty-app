import axios from "axios";
import { CharacterResponse } from "../models/CharacterResponse";
import { EpisodeResponse } from "../models/EpisodeResponse";
import { config } from "../config";
import { ApiPageResponse } from "../models/ApiPageResponse";

const baseFetch = async (url: string) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchCharacterPageData = async (
  pageCount: number
): Promise<ApiPageResponse | null> =>
  baseFetch(`${config.apiBaseUrl}/character?page=${pageCount}`);

export const fetchProfilePageData = async (
  profileId: number | undefined
): Promise<CharacterResponse | null> =>
  !profileId ? null : baseFetch(`${config.apiBaseUrl}/character/${profileId}`);

export const fetchEpisodeData = async (
  url: string | undefined
): Promise<EpisodeResponse | null> => (!url ? null : baseFetch(url));
