import { uid } from 'uid';
import type { DataLocation, CityLocation } from '@/models';

export function useConvertData(data: DataLocation): CityLocation {
  const location: CityLocation = {
    id: uid(),
    country: data.country,
    city: data.name,
    coords: {
      lat: data.lat,
      lon: data.lon
    }
  };

  return location;
}
