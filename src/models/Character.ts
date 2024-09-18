export interface CharacterBase {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
  gender: string;
  episode: string[];
  url: string;
}

export interface Character extends CharacterBase {
  origin: string;
  location: string;
}
