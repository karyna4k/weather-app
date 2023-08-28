export function useGeolocation(callback: Function) {
  !('geolocation' in navigator)
    ? new Error('Geolocation is not available.')
    : navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };

        callback(coords);
      });
}
