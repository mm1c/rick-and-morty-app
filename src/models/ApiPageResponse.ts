import { CharacterResponse } from "./CharacterResponse";

export interface ApiPageResponse {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: CharacterResponse[];
}
