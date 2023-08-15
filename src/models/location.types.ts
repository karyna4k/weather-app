export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CityLocation {
  id: string;
  city: string;
  country: string;
  coords: Coordinates;
}

export interface DataLocation {
  name: string;
  local_names: {};
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
