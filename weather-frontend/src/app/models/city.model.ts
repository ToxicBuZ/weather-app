export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinate;
}

export interface Coordinate {
  lon: number;
  lat: number;
}
