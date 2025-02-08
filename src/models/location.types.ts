export interface Coordinates {
  lat: number;
  lon: number;
}

export interface City {
  id: string;
  city: string;
  country: string;
  coords: Coordinates;
};

export interface GeocodedCity {
  name: string;
  local_names: {};
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
