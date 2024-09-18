import { CharacterBase } from "./Character";

export interface BaseObjectResponse {
  name: string;
  url: string;
}

export interface CharacterResponse extends CharacterBase {
  origin: BaseObjectResponse;
  location: BaseObjectResponse;
}
