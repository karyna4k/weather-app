export type GeoCoordinates = { lat: number; lon: number };

export function useGeolocation(callback: (coords: GeoCoordinates) => void): Error | null {
  if (!('geolocation' in navigator)) return new Error('Geolocation is not available.');

  navigator.geolocation.getCurrentPosition((position) => {
    const coords: GeoCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    callback(coords);
  });

  return null;
}
